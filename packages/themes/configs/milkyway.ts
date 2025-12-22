// packages/themes/configs/milkyway.ts
import type { ThemeConfig } from '../src/types.js';

/**
 * Milkyway — calibrated OKLCH seeds.
 * Cosmic: deep indigos, violet accents, warm starlight.
 */
const seeds = {
  primary:   { l: 0.4009, c: 0.0998, h: 249.74 },
  secondary: { l: 0.4997, c: 0.1198, h: 284.73 },
  tertiary:  { l: 0.5492, c: 0.0502, h: 249.75 },
  accent:    { l: 0.7201, c: 0.1504, h: 39.78  },

  success:   { l: 0.699,  c: 0.14,   h: 150.04 },
  warning:   { l: 0.8028, c: 0.1654, h: 82.04  },
  error:     { l: 0.599,  c: 0.1997, h: 25.04  },
  info:      { l: 0.689508, c: 0.120453, h: 212.6224 },

  neutral:   { l: 0.475, c: 0.025, h: 257.5 },
  surface:   { l: 0.58,  c: 0.03,  h: 258 }
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
  surface:   { hue: seeds.surface.h,   chroma: seeds.surface.c }
} as const;

export const milkywayTheme: ThemeConfig = {
  name: 'milkyway',
  seeds,
  roles,

  /**
   * FOUNDATION
   * Cosmic = slightly rounder UI + crisp type.
   * Adjust radii tokens to match what your foundations actually ship.
   */
  foundation: {
    textScaling: 1,
    spacingUnit: 'var(--spacing-2)',

    radii: {
      base: 'var(--radius-6)',
      container: 'var(--radius-10)'
    },

    borders: {
      defaultBorderWidth: 'var(--border-width-default)',
      defaultDivideWidth: 'var(--border-width-divider)',
      defaultRingWidth: 'var(--focus-width)'
    },

    base: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },
      family: 'var(--type-body-family)',
      size: 'var(--type-body-size)',
      lineHeight: 'var(--type-body-leading)',
      weight: 'var(--type-body-weight)',
      letterSpacing: 'calc(var(--type-body-tracking) - 0.01em)'
    },

    heading: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },
      family: 'var(--type-heading-family)',
      weight: 'var(--type-heading-weight)',
      letterSpacing: 'calc(var(--type-heading-tracking) - 0.01em)'
    },

    anchor: {
      color: { light: 'var(--anchor-color)', dark: 'var(--anchor-color)' },
      textDecoration: 'var(--anchor-decoration)',
      textDecorationHover: 'var(--anchor-decoration-hover)',
      textDecorationFocus: 'var(--anchor-decoration-hover)'
    },

    bodyBackgroundColor: {
      light: 'var(--color-surface-50)',
      dark: 'var(--color-surface-950)'
    }
  },

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

export default milkywayTheme;


