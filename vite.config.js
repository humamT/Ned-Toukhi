import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const apiProxy = {
  '/api': {
    target: 'https://dev.nedtoukhi.com',
    changeOrigin: true,
    secure: true,
  },
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: apiProxy,
  },
  preview: {
    port: 5173,
    proxy: apiProxy,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    css: true,
  },
})
