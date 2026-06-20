import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({ 
      registerType: 'autoUpdate',
      // This tells Vite to register the service worker automatically in your index.html
      injectRegister: 'script', 
      // Force development logging so you can see it working locally
      devOptions: {
        enabled: true 
      },
      manifest: {
        name: 'MyLuna Progressive Web App',
        short_name: 'MyLuna',
        description: 'MyLuna company platform built with React and Tailwind v4',
        theme_color: '#0f172a', // Tailwind slate-900
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
