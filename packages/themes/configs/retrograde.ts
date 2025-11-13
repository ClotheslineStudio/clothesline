// packages/themes/configs/retrograde.ts
import type { ThemeConfig } from 'src/types.js';

/**
 * Retrograde — calibrated OKLCH seeds.
 * Each value is a measured color (no computed averages).
 */
const seeds = {
  primary:   { l: 0.5802, c: 0.2498, h: 340.07 },
  secondary: { l: 0.52, c: 0.2093, h: 259.95 },
  tertiary:  { l: 0.689508, c: 0.120453, h: 212.6224  },
  accent:    { l: 0.5498, c: 0.1994, h: 29.99  },
  success:   { l: 0.7196, c: 0.2098, h: 140.07 },
  warning:   { l: 0.7515, c: 0.1571, h: 77.18  },
  error:     { l: 0.5502, c: 0.22, h: 25.04  },
  info:      { l: 0.6798, c: 0.1703, h: 250.19 },
  neutral:   { l: 0.8792, c: 0.0114, h: 269.54   },
  surface:   {
    light: { l: 0.7803, c: 0.0295, h: 270.33 },
    dark:  { l: 0.2186, c: 0.0404, h: 270.15 }
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
 * Retrograde — full ThemeConfig (with both seeds + roles)
 */
export const retrogradeTheme: ThemeConfig = {
  name: 'retrograde',
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

export default retrogradeTheme;

