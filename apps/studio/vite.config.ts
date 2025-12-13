// apps/studio/vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// ESM-safe __dirname
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit()
  ],

  resolve: {
    alias: {
      // consume source in dev so we don't re-process dist
      '@clothesline/ui': resolve(__dirname, '../../packages/ui/src'),
      '@clothesline/icons': resolve(__dirname, '../../packages/icons/src'),
      // keep pointing at the package root so CSS imports from /dist still work
      '@clothesline/themes': resolve(__dirname, '../../packages/themes'),
      '@clothesline/tokens': resolve(__dirname, '../../packages/tokens/src')
    }
  }
});

