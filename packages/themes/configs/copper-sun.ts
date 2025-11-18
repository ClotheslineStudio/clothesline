// packages/themes/configs/copper-sun.ts
import type { ThemeConfig } from 'src/types.js';

/**
 * Copper Sun — calibrated OKLCH seeds.
 */
const seeds = {
  primary:   { l: 0.6306, c: 0.2283, h: 33.73 },
  secondary: { l: 0.7025, c: 0.1601, h: 63.1 },
  tertiary:  { l: 0.5799, c: 0.1002, h: 344.81  },
  accent:    { l: 0.601, c: 0.1704, h: 45.01  },
  success:   { l: 0.5601, c: 0.1503, h: 151.1 },
  warning:   { l: 0.702294, c: 0.151368, h: 70.8433  },
  error:     { l: 0.5119, c: 0.2088, h: 27.38  },
  info:      { l: 0.6, c: 0.11, h: 240.01 },
  neutral:   { l: 0.8308, c: 0.0357, h: 82.89   },
  surface: { l: 0.58, c: 0.03, h: 83 }
} as const;

/**
 * Roles — minimal legacy support for {hue, chroma}.
 */
const roles = {
  primary:   { hue: seeds.primary.h,   chroma: seeds.primary.c },
  secondary: { hue: seeds.secondary.h, chroma: seeds.secondary.c },
  tertiary:  { hue: seeds.tertiary.h,  chroma: seeds.tertiary.c },
  accent:    { hue: seeds.accent.h,    chroma: seeds.accent.c },
  success:   { hue: seeds.success.h,   chroma: seeds.success.c },
  warning:   { hue: seeds.warning.h,   chroma: seeds.warning.c },
  error:     { hue: seeds.error.h,     chroma: seeds.error.c },
  info:      { hue: seeds.info.h,      chroma: seeds.info.c },
  neutral:   { hue: seeds.neutral.h,   chroma: seeds.neutral.c },
  surface:   { hue: seeds.surface.h, chroma: seeds.surface.c }
} as const;

/**
 * Copper Sun — full ThemeConfig (with both seeds + roles)
 */
export const copperSunTheme: ThemeConfig = {
  name: 'copper-sun',
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
      accessible: { contrast: 'high', typescale: 1.1, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.08, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal', dev: ['grid'] }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(82% 0.25 230)' } }
      },
      vision: {
        mono: { vars: { '--neutral-boost': 0.02 }, note: 'Used by generator to widen neutral steps' }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'See modes.css for the actual outline rule' }
      }
    }
  }
};

export default copperSunTheme;

