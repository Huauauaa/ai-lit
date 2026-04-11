import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AiLitUI',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'index.js';
        if (format === 'cjs') return 'index.cjs';
        return `index.${format}.js`;
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: ['lit', 'lit/decorators.js'],
      output: {
        globals: {
          lit: 'lit',
          'lit/decorators.js': 'litDecorators',
        },
      },
    },
  },
});
