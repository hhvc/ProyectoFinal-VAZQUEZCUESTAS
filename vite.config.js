import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Configura manualmente cómo quieres agrupar tus módulos
          lodash: ['lodash'],
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Establece el límite de advertencia de tamaño del chunk
  },
});



