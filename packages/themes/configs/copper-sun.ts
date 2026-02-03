// packages/themes/configs/copper-sun.ts
import type { ThemeConfig } from '../src/types.js';

/**
 * Copper Sun — calibrated OKLCH seeds.
 * Sepia-toned reader theme: warm surfaces, comfortable contrast.
 */
const seeds = {
  primary:   { l: 0.6306, c: 0.2283, h: 33.73 },
  secondary: { l: 0.7025, c: 0.1601, h: 63.1 },
  tertiary:  { l: 0.5799, c: 0.1002, h: 344.81 },
  accent:    { l: 0.601,  c: 0.1704, h: 45.01 },

  success:   { l: 0.5601, c: 0.1503, h: 151.1 },
  warning:   { l: 0.702294, c: 0.151368, h: 70.8433 },
  error:     { l: 0.5119, c: 0.2088, h: 27.38 },
  info:      { l: 0.6,    c: 0.11,   h: 240.01 },

  neutral:   { l: 0.8308, c: 0.0357, h: 82.89 },
  surface:   { l: 0.58,   c: 0.03,   h: 83 }
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

export const copperSunTheme: ThemeConfig = {
  name: 'copper-sun',
  seeds,
  roles,

  /**
   * FOUNDATION
   * Reader vibe = a touch looser leading + comfortable tracking + softer radii.
   * (If you have a dedicated reading font token later, swap families here.)
   */
  foundation: {
    textScaling: 1,

    // Slightly larger rhythm feels more “book”
    spacingUnit: 'var(--spacing-sm)',

    radii: {
      base: 'var(--radius-6)',
      container: 'var(--radius-12)'
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
      // a little more leading reads better
      lineHeight: 'calc(var(--type-body-leading) + 0.15)',
      weight: 'var(--type-body-weight)',
      // slightly looser for longer-form reading
      letterSpacing: 'calc(var(--type-body-tracking) + 0.005em)'
    },

    heading: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },
      family: 'var(--type-heading-family)',
      weight: 'var(--type-heading-weight)',
      letterSpacing: 'var(--type-heading-tracking)'
    },

    anchor: {
      color: { light: 'var(--anchor-color)', dark: 'var(--anchor-color)' },
      textDecoration: 'var(--anchor-decoration)',
      textDecorationHover: 'var(--anchor-decoration-hover)',
      textDecorationFocus: 'var(--anchor-decoration-hover)'
    },

    bodyBackgroundColor: {
      // this is where the “paper” ramp shows up
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

export default copperSunTheme;

