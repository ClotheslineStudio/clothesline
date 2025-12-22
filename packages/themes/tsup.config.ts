import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  dts: { entry: { index: 'src/index.ts' }, resolve: true },
  format: ['esm'],
  outDir: 'dist',
  target: 'es2022',
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
