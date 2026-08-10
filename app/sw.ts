import type { PrecacheEntry, SerwistGlobalConfig, RuntimeCaching } from 'serwist'
import { Serwist, NetworkFirst, StaleWhileRevalidate, ExpirationPlugin } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const RSC_CACHE = 'pages-rsc'
const NAV_CACHE = 'pages-navigate'

function pathname(url: string): string {
  const u = new URL(url)
  return u.origin + u.pathname
}

const navigateCache: RuntimeCaching = {
  matcher: ({ request, sameOrigin }) => {
    if (!sameOrigin) return false
    return request.mode === 'navigate'
  },
  handler: new StaleWhileRevalidate({
    cacheName: NAV_CACHE,
    matchOptions: { ignoreSearch: true },
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }),
      {
        cacheDidUpdate: (param) => {
          const pn = pathname(param.request.url)
          if (pn !== param.request.url) {
            const promise = (async () => {
              const cache = await caches.open(NAV_CACHE)
              if (!(await cache.match(pn))) {
                await cache.put(pn, param.newResponse.clone())
              }
            })()
            param.event.waitUntil(promise)
          }
        },
      },
      {
        // La stratégie cherche déjà le pathname dans pages-navigate
        // (ignoreSearch) ; il ne reste que le repli vers l'accueil en cache.
        handlerDidError: async () => {
          const homeCached = await caches.match(pathname('/'), { cacheName: NAV_CACHE })
          if (homeCached) return homeCached
          return Response.error()
        },
      },
    ],
  }),
}

const rscCache: RuntimeCaching = {
  matcher: ({ request, sameOrigin, url }) => {
    if (!sameOrigin || url.pathname.startsWith('/api/')) return false
    return (
      request.headers.get('RSC') === '1' &&
      request.headers.get('Next-Router-Prefetch') !== '1'
    )
  },
  handler: new NetworkFirst({
    cacheName: RSC_CACHE,
    networkTimeoutSeconds: 3,
    // Le payload RSC de /compteur et /points ne dépend pas des paramètres de
    // recherche : pointId/sessionId sont lus côté client (useSearchParams).
    // Ignorer la query au match permet de naviguer entre points hors ligne
    // sans avoir visité chaque URL à l'avance.
    matchOptions: { ignoreSearch: true },
    plugins: [
      new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 12 * 60 * 60 }),
      {
        // Les écritures sont indexées par pathname : une seule entrée par
        // route (pas une par point), toujours la plus récente. Les lectures
        // continuent via matchOptions.ignoreSearch ci-dessus.
        cacheKeyWillBeUsed: async ({ request, mode }) => {
          if (mode !== 'write') return request
          const pn = pathname(request.url)
          return pn !== request.url ? pn : request
        },
      },
      {
        cacheDidUpdate: (param) => {
          const promise = (async () => {
            try {
              const htmlReq = new Request(param.request.url, {
                headers: {},
                credentials: 'same-origin',
              })
              const htmlRes = await fetch(htmlReq)
              if (htmlRes.ok && !htmlRes.redirected) {
                const cache = await caches.open(NAV_CACHE)
                await cache.put(param.request.url, htmlRes.clone())
                const pn = pathname(param.request.url)
                if (pn !== param.request.url && !(await cache.match(pn))) {
                  await cache.put(pn, htmlRes)
                }
              }
            } catch {
              /* offline / error, silently skip */
            }
          })()
          param.event.waitUntil(promise)
        },
      },
      {
        // Ne jamais renvoyer de HTML pour une requête RSC : Next.js attend un
        // payload Flight et lèverait une erreur de parse (écran bloqué). La
        // stratégie a déjà cherché le pathname dans pages-rsc, il ne reste que
        // le repli vers l'accueil.
        handlerDidError: async () => {
          const homeCached = await caches.match(pathname('/'), { cacheName: RSC_CACHE })
          if (homeCached) return homeCached
          return Response.error()
        },
      },
    ],
  }),
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: [navigateCache, rscCache, ...defaultCache],
})

const sw = self as unknown as {
  addEventListener(event: string, cb: (...args: unknown[]) => void): void
}
sw.addEventListener('install', (event) => {
  console.log('[SW] install event', event)
})
sw.addEventListener('activate', (event) => {
  console.log('[SW] activate event', event)
})
sw.addEventListener('message', (event) => {
  const data = (event as { data?: unknown }).data as
    | { type: string; [k: string]: unknown }
    | undefined
  if (data?.type === 'SW_PING') {
    const source = (event as { source?: { postMessage: (msg: unknown) => void } }).source
    source?.postMessage({ type: 'SW_PONG', active: true })
  }
})

serwist.addEventListeners()
