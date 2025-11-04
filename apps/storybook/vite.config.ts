import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      // ✅ absolute paths to your monorepo packages
      '@clothesline/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@clothesline/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@clothesline/themes': path.resolve(__dirname, '../../packages/themes/dist'),
    },
  },
  // allow Vite to read files outside of this app folder (packages for monorepo)
  server: {
    fs: {
      // allow package source folders so Vite can resolve CSS/other files outside root
      allow: [
        path.resolve(__dirname, '../../packages/ui'),
        path.resolve(__dirname, '../../packages/tokens'),
        path.resolve(__dirname, '../../packages/themes'),
      ],
    },
  },
});



