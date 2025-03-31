import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/brasileirao',
  server: {
    proxy: {
      '/v4': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v4/, ''),
      },
    },
  },
})
