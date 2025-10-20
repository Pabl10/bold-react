import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bold-react/', // Configuración para GitHub Pages
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@/features': resolve('./src/features'),
      '@/shared': resolve('./src/features/shared'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/features/shared/styles/_variables.scss";`
      }
    }
  }
})
