import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    dedupe: ['svelte'],
    alias: {
      '@clothesline/ui': resolve(__dirname, '../../packages/ui/src'),
      '@clothesline/icons': resolve(__dirname, '../../packages/icons'),
      '@clothesline/tokens': resolve(__dirname, '../../packages/tokens/src')
    }
  },
  optimizeDeps: {
    exclude: ['@clothesline/ui', '@clothesline/icons', '@clothesline/themes', 'svelte']
  },
  ssr: {
    noExternal: ['@clothesline/ui', '@clothesline/icons', '@clothesline/themes']
  }
});
