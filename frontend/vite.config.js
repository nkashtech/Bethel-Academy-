import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'react-hot-toast'] } },
    },
  },
  server: {
    port: 3020,
    host: true,
    proxy: { '/api': { target: 'http://localhost:3021', changeOrigin: true } },
  },
})
