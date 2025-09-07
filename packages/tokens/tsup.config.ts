import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  target: 'esnext',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true
});
