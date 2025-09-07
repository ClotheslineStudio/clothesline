// packages/themes/configs/milkyway.ts
import type { ThemeConfig } from '../src/types.js';

const roles = {
  primary:   { hue: 290, chroma: 0.16 }, // electric violet
  secondary: { hue: 210, chroma: 0.14 }, // moonlight blue
  tertiary:  { hue: 320, chroma: 0.14 }, // aurora pink
  success:   { hue: 160, chroma: 0.11 },
  warning:   { hue:  60, chroma: 0.09 },
  error:     { hue:  10, chroma: 0.10 },
  info:      { hue: 220, chroma: 0.14 },
  accent:    { hue: 190, chroma: 0.16 }, // glowing teal
  neutral:   { hue: 270, chroma: 0.04 },
  surface:   { hue: 260, chroma: 0.01 }  // starfield
} as const;

/**
 * Milky Way — vibrant, cosmic palette.
 * High-chroma violet, teal, and pink with cool neutrals.
 */
export const milkywayTheme: ThemeConfig = {
  name: 'milkyway',
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
        high: { vars: { '--focus-ring': 'oklch(85% 0.25 290)' } } // bright violet focus ring
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Outline style handled in modes.css' }
      }
    }
  }
};

