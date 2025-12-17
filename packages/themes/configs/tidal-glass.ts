import type { ThemeConfig } from '../src/types.js';

/**
 * Tidal Glass — calibrated OKLCH seeds.
 * Aquatic palette: deep blues, teals, kelp greens, violet accents.
 */
const seeds = {
  primary:   { l: 0.72, c: 0.13, h: 200 },
  secondary: { l: 0.75, c: 0.11, h: 180 },
  tertiary:  { l: 0.63, c: 0.09, h: 160 },
  accent:    { l: 0.74, c: 0.12, h: 260 },

  success:   { l: 0.70, c: 0.10, h: 145 },
  warning:   { l: 0.78, c: 0.09, h: 50  },
  error:     { l: 0.58, c: 0.09, h: 10  },
  info:      { l: 0.71, c: 0.11, h: 190 },

  neutral:   { l: 0.40, c: 0.03, h: 210 },
  surface:   { l: 0.58, c: 0.03, h: 190 }
} as const;

/**
 * Roles — legacy support
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

export const tidalGlassTheme: ThemeConfig = {
  name: 'tidal-glass',
  seeds,
  roles,

  /**
   * FOUNDATION
   * “Glassy” feel comes from rounder radii + slightly crisper type + cool ink.
   * (Actual glass blur/tint should be implemented in component CSS using your surface tokens.)
   */
  foundation: {
    textScaling: 1,
    spacingUnit: 'var(--spacing-md)',

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
      // Cool “ink” that reads clean over teal surfaces
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },

      family: 'var(--type-body-family)',
      size: 'var(--type-body-size)',
      lineHeight: 'var(--type-body-leading)',
      weight: 'var(--type-body-weight)',
      // glass themes usually look better slightly tighter
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
      accessible: { contrast: 'high', typescale: 1.08, ui: ['simplified'], motor: ['kbd'] },
      reading:    { reading: 'dyslexia', typescale: 1.06, motion: 'reduced', focus: true },
      night:      { mode: 'dark', contrast: 'normal' }
    },

    deltas: {
      contrast: {
        high: { vars: { '--focus-ring': 'oklch(85% 0.20 200)' } }
      },
      motor: {
        kbd: { selectors: [':focus-visible'], note: 'Outline defined in modes.css' }
      }
    }
  }
};

export default tidalGlassTheme;
