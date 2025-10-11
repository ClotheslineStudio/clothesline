// packages/themes/configs/clothesline.ts
import type { ThemeConfig } from '../src/types.js';

// packages/themes/configs/clothesline.ts
const roles = {
  // Brand/status (vivid)
  primary:   { hue: 270,   chroma: 0.10 },
  secondary: { hue: 220,   chroma: 0.11 },
  tertiary:  { hue: 180,   chroma: 0.10 },
  success:   { hue: 145,   chroma: 0.11 },
  warning:   { hue:  75,   chroma: 0.11 },
  error:     { hue:  25,   chroma: 0.11 },
  info:      { hue: 200,   chroma: 0.11 },

  // Poppy accent (your request)
  accent:    { hue: 43.26, chroma: 0.1882 }, // punchy sunset orange

  // Cool, *not beige* backgrounds
  neutral:   { hue: 255,   chroma: 0.010 }, // cool gray track (UI chrome)
  surface:   { hue: 255,   chroma: 0.000 }, // pure achromatic (paper)
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


