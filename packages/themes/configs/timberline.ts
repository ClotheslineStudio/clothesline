// packages/themes/configs/timberline.ts
import type { ThemeConfig } from '../src/types.js';


/**
 * Timberline — calibrated OKLCH seeds.
 * Each value is a measured color (no computed averages).
 */
const seeds = {
  primary:   { l: 0.4501, c: 0.0904, h: 149.62 },
  secondary: { l: 0.7996, c: 0.0293, h: 191.12 },
  tertiary:  { l: 0.5497, c: 0.0301, h: 251.85  },
  accent:    { l: 0.3999, c: 0.0499, h: 58.59  },
  success:   { l: 0.6803, c: 0.1098, h: 139.96 },
  warning:   { l: 0.782025, c: 0.161871, h: 98.5584  },
  error:     { l: 0.5501, c: 0.13, h: 35.32  },
  info:      { l: 0.6508, c: 0.0798, h: 219.81 },
  neutral:   { l: 0.8797, c: 0.0203, h: 100.62   },
  surface: { l: 0.58, c: 0.03, h: 181 }
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
 * Timberline — full ThemeConfig (with both seeds + roles)
 */
export const timberlineTheme: ThemeConfig = {
  name: 'timberline',
  seeds,  // ← THIS was missing
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
        monochromacy: { vars: { '--neutral-boost': 0.02 }, note: 'Used by generator to widen neutral steps' }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'See modes.css for the actual outline rule' }
      }
    }
  }
};

export default timberlineTheme;

