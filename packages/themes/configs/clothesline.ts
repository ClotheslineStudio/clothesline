// packages/themes/configs/clothesline.ts
import type { ThemeConfig } from 'src/types.js';

/**
 * Clothesline — unified OKLCH seeds.
 * Clean, neutral UI surfaces; balanced, accessible brand colors.
 */
const seeds = {
  // Brand/status vivid colors (balanced chroma)
  primary:   { l: 0.62, c: 0.10, h: 270 },
  secondary: { l: 0.64, c: 0.11, h: 220 },
  tertiary:  { l: 0.60, c: 0.10, h: 180 },

  success:   { l: 0.66, c: 0.11, h: 145 },
  warning:   { l: 0.75, c: 0.11, h: 75  },
  error:     { l: 0.58, c: 0.11, h: 25  },
  info:      { l: 0.68, c: 0.11, h: 200 },

  // Accent pop
  accent:    { l: 0.70, c: 0.19, h: 43.26 },

  // Neutral UI chrome tint (slightly cool)
  neutral:   { l: 0.55, c: 0.015, h: 255 },

  /**
   * SURFACE (flat, universal)
   * Generates a full ramp from near-black → near-white.
   * Low-chroma neutral keeps backgrounds clean and paper-like.
   */
  surface:   { l: 0.58, c: 0.03, h: 255 }
} as const;


/**
 * Roles — legacy support for hue/chroma pairing
 * (kept for your builder’s backwards compatibility)
 */
const roles = {
  primary:   { hue: seeds.primary.h,   chroma: seeds.primary.c },
  secondary: { hue: seeds.secondary.h, chroma: seeds.secondary.c },
  tertiary:  { hue: seeds.tertiary.h,  chroma: seeds.tertiary.c },

  success:   { hue: seeds.success.h,   chroma: seeds.success.c },
  warning:   { hue: seeds.warning.h,   chroma: seeds.warning.c },
  error:     { hue: seeds.error.h,     chroma: seeds.error.c },
  info:      { hue: seeds.info.h,      chroma: seeds.info.c },

  accent:    { hue: seeds.accent.h,    chroma: seeds.accent.c },

  neutral:   { hue: seeds.neutral.h,   chroma: seeds.neutral.c },
  surface:   { hue: seeds.surface.h,   chroma: seeds.surface.c }
} as const;


/**
 * Clothesline — full ThemeConfig
 * identical structure to copper-sun, milkyway, etc.
 */
export const clotheslineTheme: ThemeConfig = {
  name: 'clothesline',
  seeds,
  roles,

  modes: {
    defaults: {
      mode: 'light',
      vision: 'none',
      contrast: 'normal',
      typescale: 1.0,
      ui: [],
      motor: [],
      focus: true
    },

    presets: {
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal' }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(82% 0.25 230)' } }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'See modes.css for the actual outline rule' }
      }
    }
  }
};

export default clotheslineTheme;




