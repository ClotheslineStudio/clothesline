// packages/themes/configs/copper-sun.ts
import type { ThemeConfig } from '../src/types.ts';

const roles = {
  primary:   { hue:  30, chroma: 0.16 }, // copper orange
  secondary: { hue:   0, chroma: 0.14 }, // red flare
  tertiary:  { hue:  50, chroma: 0.14 }, // golden yellow
  success:   { hue: 100, chroma: 0.10 },
  warning:   { hue:  45, chroma: 0.11 },
  error:     { hue:   5, chroma: 0.12 },
  info:      { hue: 200, chroma: 0.10 },
  accent:    { hue: 330, chroma: 0.16 }, // magenta burst
  neutral:   { hue:  30, chroma: 0.03 }, // warm neutral
  surface:   { hue:  40, chroma: 0.01 }  // sunlit parchment
} as const;

/**
 * Copper Sun — warm, energetic palette.
 * Orange and red anchors with golden yellow and magenta accents.
 */
export const copperSunTheme: ThemeConfig = {
  name: 'copper-sun',
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
        high: { vars: { '--focus-ring': 'oklch(85% 0.24 30)' } } // bright coppery focus ring
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Outline style handled in modes.css' }
      }
    }
  }
};


