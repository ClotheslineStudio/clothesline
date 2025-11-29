import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  target: 'es2020',
  outDir: 'dist',
  bundle: false,
  splitting: false,
  sourcemap: true,
  clean: true
});
