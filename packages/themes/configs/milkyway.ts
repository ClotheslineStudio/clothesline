// packages/themes/configs/milkyway.ts
import type { ThemeConfig } from 'src/types.ts';

/**
 * Milkyway — calibrated OKLCH seeds.
 * Each value is a measured color (no computed averages).
 */
const seeds = {
  primary:   { l: 0.4009, c: 0.0998, h: 249.74 },
  secondary: { l: 0.4997, c: 0.1198, h: 284.73 },
  tertiary:  { l: 0.5492, c: 0.0502, h: 249.75 },
  accent:    { l: 0.7201, c: 0.1504, h: 39.78  },
  success:   { l: 0.699, c: 0.14, h: 150.04 },
  warning:   { l: 0.8028, c: 0.1654, h: 82.04  },
  error:     { l: 0.599, c: 0.1997, h: 25.04  },
  info:      { l: 0.689508, c: 0.120453, h: 212.6224 },
  neutral: { l: 0.475, c: 0.025, h: 257.5 },
  surface:   {
    light: { l: 0.9007, c: 0.0203, h: 257.47 },
    dark:  { l: 0.2508, c: 0.0401, h: 259.32 }
  }
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
  surface:   { hue: seeds.surface.light.h, chroma: seeds.surface.light.c }
} as const;

/**
 * Milkyway — full ThemeConfig (with both seeds + roles)
 */
export const milkywayTheme: ThemeConfig = {
  name: 'milkyway',
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
        mono: { vars: { '--neutral-boost': 0.02 }, note: 'Used by generator to widen neutral steps' }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'See modes.css for the actual outline rule' }
      }
    }
  }
};

export default milkywayTheme;

