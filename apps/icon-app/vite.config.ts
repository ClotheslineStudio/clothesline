// vite.config.ts
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

// ✅ NEW: import resolve helper
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],

	// ✅ NEW: make monorepo packages easy to import
	resolve: {
		alias: {
			'@clothesline/ui': resolve(__dirname, '../../packages/ui/src'),
			'@clothesline/icons': resolve(__dirname, '../..', 'packages', 'icons'),
			'@clothesline/themes': resolve(__dirname, '../../packages/themes/src'),
			'@clothesline/tokens': resolve(__dirname, '../../packages/tokens/src')
		}
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
