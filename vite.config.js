import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/solidatus': {
        target: 'https://trial.solidatus.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/solidatus/, '')
      }
    }
  },
  base: '/privacy-hub-demo/'
})
