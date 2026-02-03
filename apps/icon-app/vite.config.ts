// vite.config.ts
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],

  resolve: {
    // ✅ critical for monorepos: one Svelte instance across app + workspace packages
    dedupe: ['svelte'],

    alias: {
      // UI: source import for active dev
      '@clothesline/ui': resolve(__dirname, '../../packages/ui/src'),

      // Icons: you’re pointing at package root; that’s fine if it has a package.json/exports
      // If you want source-dev instead, switch to ../../packages/icons/src
      '@clothesline/icons': resolve(__dirname, '../..', 'packages', 'icons'),

      '@clothesline/tokens': resolve(__dirname, '../../packages/tokens/src')
    }
  },

  optimizeDeps: {
    // ✅ do NOT prebundle local workspace packages; let Vite/SvelteKit handle them
    exclude: ['@clothesline/ui', '@clothesline/icons', '@clothesline/themes', 'svelte']
  },

  ssr: {
    // ✅ ensure local packages are compiled in the app’s SSR pipeline (same Svelte runtime)
    noExternal: ['@clothesline/ui', '@clothesline/icons', '@clothesline/themes']
  },

  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'client',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium', headless: true }]
          },
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**']
        }
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }
    ]
  }
});

