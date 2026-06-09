import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Automatically register and update the service worker
      registerType: 'autoUpdate',

      // Assets to precache as part of the application shell
      // apple-touch-icon.png removed — file does not exist in public/
      includeAssets: ['favicon.svg', 'icons.svg'],

      // Workbox strategy: precache the compiled JS/CSS/HTML shell
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
      },

      // Web app manifest
      manifest: {
        name: 'CellWego Store',
        short_name: 'CellWego',
        description: 'Premium phones and gadgets at your fingertips.',
        theme_color: '#1d1d1f',
        background_color: '#f5f5f7',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            // favicon.svg scales to any size — satisfies the installability icon requirement
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            // icons.svg used as the maskable variant for adaptive icon support
            src: 'icons.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})