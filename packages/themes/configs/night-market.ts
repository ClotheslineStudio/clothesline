// packages/themes/configs/night-market.ts
import type { ThemeConfig } from '../src/types.ts';

const roles = {
  primary:   { hue:  30, chroma: 0.14 }, // lantern orange
  secondary: { hue: 270, chroma: 0.14 }, // neon purple
  tertiary:  { hue: 120, chroma: 0.12 }, // market stall green
  success:   { hue: 135, chroma: 0.10 },
  warning:   { hue:  45, chroma: 0.12 },
  error:     { hue:  10, chroma: 0.12 },
  info:      { hue: 210, chroma: 0.10 },
  accent:    { hue:  20, chroma: 0.18 }, // chili red
  neutral:   { hue: 270, chroma: 0.03 }, // stone night
  surface:   { hue: 240, chroma: 0.01 }  // foggy midnight
} as const;

/**
 * Night Market — vibrant, high-contrast festival palette.
 * Combines warm lantern light, neon purple signage, and pops of green and red.
 */
export const nightMarketTheme: ThemeConfig = {
  name: 'night-market',
  roles,

  modes: {
    defaults: {
      mode: 'light',
      vision: 'none',
      contrast: 'normal',
      typescale: 1.0,
      focus: true,
      ui: [],
      motor: []
    },

    presets: {
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal' }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(85% 0.24 30)' } } // orange-ish focus ring
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Stronger outline handled in modes.css' }
      }
    }
  }
};

