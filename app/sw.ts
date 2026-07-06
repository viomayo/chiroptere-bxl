import type { PrecacheEntry, SerwistGlobalConfig, RuntimeCaching } from 'serwist'
import { Serwist, NetworkFirst, ExpirationPlugin } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const navigateCache: RuntimeCaching = {
  matcher: ({ request, sameOrigin }) => {
    if (!sameOrigin) return false
    return request.mode === 'navigate'
  },
  handler: new NetworkFirst({
    cacheName: 'pages-navigate',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }),
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: [navigateCache, ...defaultCache],
})

serwist.setCatchHandler(async ({ request }) => {
  if (request.mode === 'navigate') {
    const { origin } = new URL(request.url)
    const cached = await caches.match(`${origin}/`)
    if (cached) return cached
  }
  return Response.error()
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
