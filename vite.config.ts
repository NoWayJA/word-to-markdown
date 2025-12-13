import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const isStandalone = process.env.BUILD_STANDALONE === 'true';

export default defineConfig({
  plugins: [
    react(),
    ...(isStandalone ? [viteSingleFile()] : []),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'es2020',
    ...(isStandalone && {
      outDir: 'standalone',
      assetsInlineLimit: 100000000,
      cssCodeSplit: false,
    }),
  },
});
