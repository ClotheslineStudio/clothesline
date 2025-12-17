import type { ThemeConfig } from '../src/types.js';

/**
 * Night Market — calibrated OKLCH seeds.
 * Vibrant, festival-inspired colors with warm lanterns + neon purples.
 */
const seeds = {
  primary:   { l: 0.70, c: 0.14, h: 30   },
  secondary: { l: 0.72, c: 0.14, h: 270  },
  tertiary:  { l: 0.63, c: 0.12, h: 120  },
  accent:    { l: 0.68, c: 0.18, h: 20   },

  success:   { l: 0.68, c: 0.10, h: 135  },
  warning:   { l: 0.78, c: 0.12, h: 45   },
  error:     { l: 0.58, c: 0.12, h: 10   },
  info:      { l: 0.70, c: 0.10, h: 210  },

  neutral:   { l: 0.42, c: 0.03, h: 270  },
  surface:   { l: 0.58, c: 0.03, h: 240 }
} as const;

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

export const nightMarketTheme: ThemeConfig = {
  name: 'night-market',
  seeds,
  roles,

  /**
   * FOUNDATION
   * Spooky/neon = slightly sharper geometry + punchier headings.
   */
  foundation: {
    textScaling: 1,
    spacingUnit: 'var(--spacing-md)',

    radii: {
      base: 'var(--radius-3)',
      container: 'var(--radius-6)'
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
      // a touch heavier reads better over neon chroma
      weight: 'calc(var(--type-body-weight) + 100)',
      letterSpacing: 'var(--type-body-tracking)'
    },

    heading: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },
      family: 'var(--type-heading-family)',
      // punchy headers
      weight: 'calc(var(--type-heading-weight) + 200)',
      letterSpacing: 'calc(var(--type-heading-tracking) + 0.01em)'
    },

    anchor: {
      color: { light: 'var(--anchor-color)', dark: 'var(--anchor-color)' },
      textDecoration: 'var(--anchor-decoration)',
      textDecorationHover: 'var(--anchor-decoration-hover)',
      textDecorationFocus: 'var(--anchor-decoration-hover)'
    },

    bodyBackgroundColor: {
      light: 'var(--color-surface-50)',
      // darker baseline makes the “night” preset feel immediate
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
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal' }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(85% 0.24 30)' } }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Stronger outline defined in modes.css' }
      }
    }
  }
};

export default nightMarketTheme;
