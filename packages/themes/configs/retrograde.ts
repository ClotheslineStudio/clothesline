// packages/themes/configs/retrograde.ts
import type { ThemeConfig } from '../src/types.ts';

const roles = {
  primary:   { hue: 310, chroma: 0.20 }, // magenta glow
  secondary: { hue: 190, chroma: 0.18 }, // neon cyan
  tertiary:  { hue: 270, chroma: 0.16 }, // violet haze
  success:   { hue: 140, chroma: 0.14 },
  warning:   { hue:  50, chroma: 0.18 },
  error:     { hue:  15, chroma: 0.18 },
  info:      { hue: 220, chroma: 0.16 },
  accent:    { hue:  40, chroma: 0.22 }, // amber flare
  neutral:   { hue: 270, chroma: 0.04 },
  surface:   { hue: 290, chroma: 0.01 }
} as const;

/**
 * Retrograde — bold synthwave-inspired palette.
 * High-chroma magenta, cyan, and amber with dark violet grounding.
 */
export const retrogradeTheme: ThemeConfig = {
  name: 'retrograde',
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
        high: { vars: { '--focus-ring': 'oklch(88% 0.25 310)' } } // bright magenta focus ring
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Outline style handled in modes.css' }
      }
    }
  }
};


