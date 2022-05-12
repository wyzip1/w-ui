import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,   // https请求则使用true
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/')
      }
    }
  }
})
