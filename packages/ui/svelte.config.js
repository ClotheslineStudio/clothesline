import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig} */
const config = {
  preprocess: vitePreprocess(),

  compilerOptions: {
    css: 'injected', // or false if you prefer external CSS
  },
};

export default config;





