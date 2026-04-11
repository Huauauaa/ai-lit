import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/config.ts'),
      name: 'AiLitUIConfig',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'config.js' : 'config.cjs'),
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
