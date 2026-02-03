// packages/themes/configs/retrograde.ts
import type { ThemeConfig } from '../src/types.js';

/**
 * Retrograde — calibrated OKLCH seeds.
 * Vaporwave/pixel-friendly palette with an intentionally “game UI” foundation.
 */
const seeds = {
  primary:   { l: 0.5802, c: 0.2498, h: 340.07 },
  secondary: { l: 0.52,   c: 0.2093, h: 259.95 },
  tertiary:  { l: 0.689508, c: 0.120453, h: 212.6224 },
  accent:    { l: 0.5498, c: 0.1994, h: 29.99 },
  success:   { l: 0.7196, c: 0.2098, h: 140.07 },
  warning:   { l: 0.7515, c: 0.1571, h: 77.18 },
  error:     { l: 0.5502, c: 0.22,   h: 25.04 },
  info:      { l: 0.6798, c: 0.1703, h: 250.19 },
  neutral:   { l: 0.8792, c: 0.0114, h: 269.54 },
  surface:   { l: 0.58,   c: 0.03,   h: 270 }
} as const;

/** Roles — minimal legacy support for {hue, chroma}. */
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

export const retrogradeTheme: ThemeConfig = {
  name: 'retrograde',
  seeds,
  roles,

  /**
   * FOUNDATION (pixel skin)
   * - Hard corners (radius 0)
   * - Chunkier borders
   * - Mono/pixel-friendly type defaults
   * - Button contract tokens overridden for pixel depth + press
   */
  foundation: {
    textScaling: 1,

    // Slightly tighter “unit” makes layouts feel more retro/compact.
    spacingUnit: 'var(--spacing-2)',

    // Hard corners everywhere by default.
    radii: {
      base: 'var(--radius-0)',
      container: 'var(--radius-0)'
    },

    // Chunkier lines + focus.
    borders: {
      defaultBorderWidth: 'var(--border-width-strong)', // typically 2px
      defaultDivideWidth: 'var(--border-width-strong)',
      defaultRingWidth: 'var(--focus-width-strong)' // typically 3px
    },

    base: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },

      // Retrograde defaults to mono; if you later add a real pixel font,
      // set --type-family-body in theme CSS and this will pick it up.
      family: 'var(--type-family-mono)',
      size: 'var(--type-scale-sm)',
      lineHeight: 'var(--type-leading-normal)',
      weight: 'var(--type-weight-medium)',
      letterSpacing: 'var(--type-tracking-wide)'
    },

    heading: {
      color: { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' },

      family: 'var(--type-family-mono)',
      weight: 'var(--type-weight-bold)',
      letterSpacing: 'var(--type-tracking-wide)'
    },

    anchor: {
      color: { light: 'var(--anchor-color)', dark: 'var(--anchor-color)' },
      textDecoration: 'underline',
      textDecorationHover: 'underline',
      textDecorationFocus: 'underline'
    },

    bodyBackgroundColor: {
      light: 'var(--color-surface-50)',
      dark: 'var(--color-surface-950)'
    },

    /**
     * Theme overrides (pixel UI + button skin)
     * Your generator should emit these as CSS vars for html[data-theme='retrograde'].
     */
    vars: {
      /* ---------- radii: make UI square ---------- */
      '--radius-interactive': 'var(--radius-0)',
      '--radius-container': 'var(--radius-0)',
      '--radius-card': 'var(--radius-0)',
      '--radius-md': 'var(--radius-0)',
      '--radius-sm': 'var(--radius-0)',
      '--radius-lg': 'var(--radius-0)',
      '--radius-tooltip': 'var(--radius-0)',

      /* ---------- borders: chunky/pixel ---------- */
      '--border-width-default': 'var(--border-2)',
      '--border-width-divider': 'var(--border-2)',
      '--border-width-interactive': 'var(--border-2)',

      /* ---------- focus: no offset, crisp ring ---------- */
      '--focus-offset': 'var(--focus-0)',
      '--focus-width': 'var(--focus-2)',

      /* ---------- motion: step-y ---------- */
      '--motion-ease': 'steps(2, end)',

      /* ---------- button skin: consumes your --button-* contract ---------- */
      '--button-radius': 'var(--radius-0)',
      '--button-padding-x': 'var(--spacing-3)',
      '--button-padding-y': 'var(--spacing-2)',

      // Thicker border reads more “8-bit UI”
      '--button-border': '2px solid var(--color-primary-900-vis)',
      '--button-border-hover': '2px solid var(--color-primary-950-vis)',
      '--button-border-active': '2px solid var(--color-primary-950-vis)',

      // Pixel “drop” depth + press
      '--button-shadow': '0 2px 0 0 var(--color-surface-950-vis)',
      '--button-shadow-hover': '0 3px 0 0 var(--color-surface-950-vis)',
      '--button-shadow-active': '0 1px 0 0 var(--color-surface-950-vis)',
      '--button-press-translate': '2px',

      // Focus ring can be themed to accent for retro pop
      '--button-focus-ring-width': '2px',
      '--button-focus-ring-offset': '0px',
      '--button-focus-ring-color': 'var(--color-accent-500-vis)'
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

export default retrogradeTheme;


