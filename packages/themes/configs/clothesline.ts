// packages/themes/configs/clothesline.ts
import type { ThemeConfig } from '../src/types.js';

const roles = {
  primary:   { hue: 270, chroma: 0.09 }, // violet brand
  secondary: { hue: 220, chroma: 0.09 }, // blue support
  tertiary:  { hue: 180, chroma: 0.09 }, // teal support
  success:   { hue: 145, chroma: 0.09 },
  warning:   { hue:  75, chroma: 0.09 },
  error:     { hue:  25, chroma: 0.09 },
  info:      { hue: 200, chroma: 0.09 },
  accent:    { hue: 310, chroma: 0.09 }, // magenta accent
  neutral:   { hue: 270, chroma: 0.03 },
  surface:   { hue:   0, chroma: 0.01 }
} as const;

/**
 * Clothesline — base palette + stackable modes
 * - Only one theme config; modes are applied at runtime via data-* attributes.
 * - Presets are one-click states for the Theme Builder.
 * - Deltas are tiny per-theme tweaks (keep minimal).
 */
export const clotheslineTheme: ThemeConfig = {
  name: 'clothesline',
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
      // A11y-forward baseline
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      // Reading comfort
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      // Dark demo
      night:      { mode: 'dark', contrast: 'normal' }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(82% 0.25 230)' } }
        // custom contrast reads --contrast-factor from setTheme(); no static vars needed
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Stronger outlines via modes.css' }
      }
      // vision mono etc. can be added later if you want theme-specific tweaks
    }
  }
};


