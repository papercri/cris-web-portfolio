import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Raise the warning threshold to avoid noise
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate chunks so the browser
        // can cache them independently and only re-download what changed.
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'motion': ['motion'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
})
