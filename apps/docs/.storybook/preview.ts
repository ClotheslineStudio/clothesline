import type { Preview } from '@storybook/sveltekit';
// Import from the TypeScript file
import { setTheme } from '../../../packages/themes/src/index.ts';

// Import theme CSS files with relative paths
import '../../../packages/themes/dist/clothesline-light-default-normal.css';
import '../../../packages/themes/dist/clothesline-dark-default-normal.css';
import '../../../packages/themes/dist/bigsky-light-default-normal.css';
import '../../../packages/themes/dist/bigsky-dark-default-normal.css';
import '../../../packages/themes/dist/evergreen-light-default-normal.css';
import '../../../packages/themes/dist/evergreen-dark-default-normal.css';
import '../../../packages/themes/dist/halloween-light-default-normal.css';
import '../../../packages/themes/dist/halloween-dark-default-normal.css';
import '../../../packages/themes/dist/milkyway-light-default-normal.css';
import '../../../packages/themes/dist/milkyway-dark-default-normal.css';
import '../../../packages/themes/dist/neon-dusk-light-default-normal.css';
import '../../../packages/themes/dist/neon-dusk-dark-default-normal.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      // Apply default theme when stories load
      if (typeof window !== 'undefined') {
        setTheme('clothesline', 'light', 'default', 'normal');
      }
      return story();
    },
  ],
};

export default preview;