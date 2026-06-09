import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Automatically register and update the service worker
      registerType: 'autoUpdate',

      // Disable vite-plugin-pwa's built-in manifest injection so it doesn't
      // duplicate the <link rel="manifest"> that index.html already has.
      // The plugin will still generate/serve the manifest file from the
      // manifest object below, but won't inject a second <link> tag.
      injectManifest: false,
      manifest: false,   // Don't auto-inject manifest link (index.html has it)

      // Instead, use the static public/manifest.json and tell the plugin to
      // include the PNG icons in the precache.
      includeAssets: ['favicon.svg', 'icons.svg', 'icon-192.png', 'icon-512.png'],

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
      },
    }),
  ],
});