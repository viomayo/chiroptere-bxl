import type { PrecacheEntry, SerwistGlobalConfig, RuntimeCaching } from 'serwist'
import { Serwist, NetworkFirst, ExpirationPlugin } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const RSC_CACHE = 'pages-rsc'
const NAV_CACHE = 'pages-navigate'

const navigateCache: RuntimeCaching = {
  matcher: ({ request, sameOrigin }) => {
    if (!sameOrigin) return false
    return request.mode === 'navigate'
  },
  handler: new NetworkFirst({
    cacheName: NAV_CACHE,
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }),
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
    plugins: [
      new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 }),
      {
        cacheDidUpdate: (param) => {
          const request = param.request as Request
          const promise = (async () => {
            try {
              const htmlReq = new Request(request.url, {
                headers: {},
                credentials: 'same-origin',
              })
              const htmlRes = await fetch(htmlReq)
              if (htmlRes.ok && !htmlRes.redirected) {
                const cache = await caches.open(NAV_CACHE)
                await cache.put(request.url, htmlRes)
              }
            } catch {
              /* offline / error, silently skip */
            }
          })()
          param.event.waitUntil(promise)
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
