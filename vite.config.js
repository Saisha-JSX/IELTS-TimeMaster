import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // <-- React plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),       // <-- add React plugin here
    tailwindcss(),
  ],
  server: {
    // Optional: HMR config is on by default in Vite, but you can customize it here
    hmr: {
      // You can specify host or port if needed, e.g.
      // host: 'localhost',
      // port: 3000,
    }
  }
})
