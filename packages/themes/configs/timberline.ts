// packages/themes/configs/timberline.ts
import type { ThemeConfig } from '../src/types.ts';

const roles = {
  primary:   { hue: 145, chroma: 0.13 }, // canopy green
  secondary: { hue: 120, chroma: 0.12 }, // pine
  tertiary:  { hue:  90, chroma: 0.08 }, // lichen
  success:   { hue: 135, chroma: 0.14 },
  warning:   { hue:  55, chroma: 0.08 },
  error:     { hue:  15, chroma: 0.08 },
  info:      { hue: 200, chroma: 0.07 },
  accent:    { hue: 300, chroma: 0.10 }, // foxglove
  neutral:   { hue:  90, chroma: 0.02 }, // mossy neutral
  surface:   { hue:  60, chroma: 0.01 }  // warm bark-leaning surface
} as const;

/**
 * Timberline — nature-forward greens with warm surfaces.
 * One config; modes are runtime via data-* attributes.
 */
export const timberlineTheme: ThemeConfig = {
  name: 'timberline',
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

    // Optional one-click presets for the Theme Builder
    presets: {
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal' }
    },

    // Tiny, theme-specific tweaks (keep minimal)
    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(82% 0.24 145)' } } // greenish ring that still pops
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Stronger outline handled in modes.css' }
      }
      // Add vision-specific tweaks later if desired (e.g., mono neutral widening)
    }
  }
};

