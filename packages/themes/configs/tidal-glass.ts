// packages/themes/configs/tidal-glass.ts
import type { ThemeConfig } from '../src/types.ts';

const roles = {
  primary:   { hue: 200, chroma: 0.13 }, // deep ocean blue
  secondary: { hue: 180, chroma: 0.11 }, // sea green
  tertiary:  { hue: 160, chroma: 0.09 }, // kelp green
  success:   { hue: 145, chroma: 0.10 },
  warning:   { hue:  50, chroma: 0.09 },
  error:     { hue:  10, chroma: 0.09 },
  info:      { hue: 190, chroma: 0.11 },
  accent:    { hue: 260, chroma: 0.12 }, // twilight violet
  neutral:   { hue: 210, chroma: 0.03 }, // misty neutral
  surface:   { hue: 190, chroma: 0.01 }  // sandy seafloor
} as const;

/**
 * Tidal Glass — serene aquatic palette.
 * Blues and teals inspired by clear shallows, with kelp green and violet accents.
 */
export const tidalGlassTheme: ThemeConfig = {
  name: 'tidal-glass',
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
        high: { vars: { '--focus-ring': 'oklch(85% 0.20 200)' } } // brightened ocean blue ring
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Outline style handled in modes.css' }
      }
    }
  }
};

