import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chiroptère BXL',
    short_name: 'Chiro BXL',
    description: 'Suivi nocturne des chauves-souris à Bruxelles',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0d0b',
    theme_color: '#0f0d0b',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
