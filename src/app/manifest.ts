import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fractional CFO',
    short_name: 'Fractional CFO',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}