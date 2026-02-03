// packages/themes/configs/clothesline.ts
import type { ThemeConfig } from '../src/types.js';

/**
 * Clothesline — unified OKLCH seeds.
 * Clean, neutral UI surfaces; balanced, accessible brand colors.
 *
 * NOTE on "full ramp" generation:
 * Your builder almost certainly expects `seeds.surface` to be a single OKLCH seed
 * ({ l, c, h }) so it can generate 0–950 (or similar) steps.
 * If you provide a `{ light, dark }` object, many builders treat it as "explicit endpoints"
 * and skip ramp generation (or produce partial output).
 */
const seeds = {
  // Brand / status roles
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
   * SURFACE (single seed = full ramp)
   * Keep chroma low for clean “paper” surfaces.
   * If you see gamut clipping, reduce `c` before changing structure.
   */
  surface:   { l: 0.58, c: 0.02, h: 255 }
} as const;

/**
 * Roles — legacy support for hue/chroma pairing
 * (kept for backwards compatibility with any builder logic that still reads roles)
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

export const clotheslineTheme: ThemeConfig = {
  name: 'clothesline',
  seeds,
  roles,

  /**
   * FOUNDATION
   * These should reference tokens that actually exist in your global foundations (html { ... }).
   * Avoid `--type-family-sans`, `--type-scale-base`, etc. since your foundations use `--type-body-*`.
   */
  foundation: {
    textScaling: 1,

    // Global “unit” knob (uses your semantic spacing token)
    spacingUnit: 'var(--spacing-2)',

    radii: {
      // semantic radii tokens from your foundations
      base: 'var(--radius-interactive)',
      container: 'var(--radius-container)'
    },

    borders: {
      // semantic border/focus tokens from your foundations
      defaultBorderWidth: 'var(--border-width-default)',
      defaultDivideWidth: 'var(--border-width-divider)',
      defaultRingWidth: 'var(--focus-width)'
    },

    // Typography + base text styling (foundation-driven)
    base: {
      // These *do* legitimately point to the generated surface ramp, because text color is theme-dependent.
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },

      family: 'var(--type-body-family)',
      size: 'inherit',
      lineHeight: 'var(--type-body-leading)',
      weight: 'var(--type-body-weight)',
      letterSpacing: 'var(--type-body-tracking)'
    },

    heading: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },

      family: 'var(--type-heading-family)',
      weight: 'var(--type-heading-weight)',
      letterSpacing: 'var(--type-heading-tracking)'
    },

    anchor: {
      // Use your global anchor tokens, which already alias to the theme’s primary “vis” ramp.
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

    // Metadata for docs/reference; modes.css should implement the actual behavior.
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




