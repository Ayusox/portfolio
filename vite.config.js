import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/portfolio/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '::',
    port: 3000,
  },
  preview: {
    host: '::',
    port: 3000,
  },
  build: {
    // Optimizaciones para rendimiento y SEO
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes en chunks independientes
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    // Comprimir assets
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.logs en producción
        drop_debugger: true,
      },
    },
    // Optimizar CSS
    cssCodeSplit: true,
    // Generar source maps para debugging
    sourcemap: false, // Deshabilitado para producción
    // Optimizar assets
    assetsInlineLimit: 4096, // Inline assets menores a 4kb
  },
  // Optimizaciones adicionales
  esbuild: {
    // Remover comentarios en producción
    legalComments: 'none',
  },
}));