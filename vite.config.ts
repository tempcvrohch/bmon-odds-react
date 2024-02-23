import { defineConfig } from 'vite';
import reactSupport from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: true,
    watch: {
      usePolling: true,
      interval: 1000,
      binaryInterval: 510000,
    },
  },
  plugins: [
    reactSupport({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    }),
    visualizer(),
  ],
});
