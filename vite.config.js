import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 16_000,
          groups: [
            { name: 'react-vendor', test: /node_modules[\\/]react(?:-dom)?[\\/]/, priority: 3 },
            { name: 'motion-vendor', test: /node_modules[\\/](?:framer-motion|motion-dom|motion-utils|gsap)[\\/]/, priority: 2 },
            { name: 'icons-vendor', test: /node_modules[\\/]simple-icons[\\/]/, priority: 2 },
          ],
        },
      },
    },
  },
})
