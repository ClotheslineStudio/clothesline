// packages/themes/configs/bigsky.ts
import type { ThemeConfig } from '../src/types.js';

/**
 * Big Sky — calibrated OKLCH seeds.
 * Each value is a measured color (no computed averages).
 *
 * NOTE on "full ramp" generation:
 * Keep `seeds.surface` as a single OKLCH seed ({ l, c, h }) so the builder generates
 * a full surface ramp (e.g., 50–950). Do NOT provide { light, dark } here.
 */
const seeds = {
  primary:   { l: 0.6981, c: 0.1714, h: 243.77 },
  secondary: { l: 0.8201, c: 0.0494, h: 235.03 },
  tertiary:  { l: 0.4514, c: 0.0593, h: 228.99 },
  accent:    { l: 0.7512, c: 0.1647, h: 68.12  },
  success:   { l: 0.6990, c: 0.1292, h: 144.87 },
  warning:   { l: 0.8028, c: 0.1654, h: 82.04  },
  error:     { l: 0.5793, c: 0.1601, h: 29.71  },
  info:      { l: 0.6789, c: 0.1001, h: 220.58 },
  neutral:   { l: 0.3797, c: 0.0608, h: 59.6   },

  // Single seed => full ramp generation
  surface:   { l: 0.58, c: 0.03, h: 236 }
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

/**
 * Big Sky — full ThemeConfig
 * (seeds + roles + foundation + modes)
 */
export const bigSkyTheme: ThemeConfig = {
  name: 'bigsky',
  seeds,
  roles,

  /**
   * FOUNDATION
   * References your global foundations (html { ... }) and generated ramps.
   * Bigsky “feel”: slightly roomier spacing + rounder containers + slightly larger type.
   */
  foundation: {
    // Slightly larger default readability than clothesline
    textScaling: 1,

    // Roomier rhythm (semantic token from your foundations)
    spacingUnit: 'var(--spacing-2)',

    radii: {
      // Rounder than clothesline, but still within your semantic tokens
      base: 'var(--radius-interactive)',
      container: 'var(--radius-xl)'
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
      letterSpacing: 'var(--type-body-tracking)'
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

export default bigSkyTheme;


