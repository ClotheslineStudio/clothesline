/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './src/**/*.{html,js,svelte,ts}',
  '../../packages/ui/**/*.{svelte,ts}',
  '../../packages/themes/**/*.{ts,css}', // include theme tokens if used in strings
],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    {
      pattern: /btn-(solid|outline|ghost|link)/,
    },
  ]
};

