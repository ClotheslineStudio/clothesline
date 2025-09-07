import type { StorybookConfig } from '@storybook/sveltekit';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|ts|svelte)',
    '../src/**/*.mdx'
  ],
  addons: [
    {
      name: '@storybook/addon-svelte-csf',
      options: {
        legacyTemplate: true, // Enable legacy support
      },
    },
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/sveltekit',
  
  // Your existing viteFinal config...
async viteFinal(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      // Point to the main index file
      '@clothesline/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@clothesline/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@clothesline/themes': path.resolve(__dirname, '../../packages/themes/src'),
    }
  };

  config.optimizeDeps = {
    ...config.optimizeDeps,
    exclude: ['react', 'react-dom', 'react/jsx-runtime']
  };

  return config;
},

  typescript: {
    check: false,
  },
};

export default config;
