/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwind(), sveltekit()],
  resolve: {
    // 🔑 one Svelte instance across app + packages
    dedupe: ['svelte'],
    // dev against source (ok); you can remove this to consume dist instead
    alias: {
      '@clothesline/ui': path.resolve(dirname, '../../packages/ui/src')
    }
  },
  optimizeDeps: {
    // 🔑 do NOT prebundle the local package
    exclude: ['@clothesline/ui', '@clothesline/themes', 'svelte']
  },
  ssr: {
    // 🔑 ensure the package is compiled with the app (same runtime)
    noExternal: ['@clothesline/ui', '@clothesline/themes']
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});

