import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/features/shared'),
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
