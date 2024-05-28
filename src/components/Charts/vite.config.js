import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./index.js', import.meta.url)),
      name: 'zekoder-web-components-charts',
    },
    rollupOptions: {
      external: ['vue','vitest','vite'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    }
  },
});
