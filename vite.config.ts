import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import * as path from "path";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['file.svg'],
      devOptions:{
        enabled: false
      },
      manifest: {
        name: 'Image Size Reducer',
        short_name: 'Image Size Reducer',
        description: 'Reducing image file size without reducing quality with open source.',
        theme_color: '#ffffff',
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
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
