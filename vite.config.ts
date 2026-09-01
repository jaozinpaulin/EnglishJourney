import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    // Remove apenas console.log na build de produção (preserva console.error/warn)
    pure: ['console.log'],
    drop: ['debugger'],
  },
})