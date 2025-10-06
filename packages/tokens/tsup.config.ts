import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'colors/index': 'colors/index.ts',
  },
  // ⬇️ Explicitly tell tsup to emit dts for both entries
  dts: {
    entry: {
      index: 'src/index.ts',
      'colors/index': 'colors/index.ts',
    },
    resolve: true,
  },
  format: ['esm'],
  outDir: 'dist',
  target: 'es2022',
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
});



