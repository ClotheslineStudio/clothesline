import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'colors/index': 'colors/index.ts',
  },
  format: ['esm'],
  outDir: 'dist',
  target: 'es2022',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: true,
});


