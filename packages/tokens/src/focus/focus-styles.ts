/**
 * Focus style tokens (theme-coupled)
 *
 * This file contains CSS-ready focus indicator values (colors, glow/shadow).
 * Width/offset *sizes* should live in focus.ts (your “contracted” tokens).
 *
 * Naming:
 * - focus-* keys (designer-friendly)
 */

export const focusStyleTokens = {
  // Focus indicator colors
  'focus-color': 'var(--color-primary-500-vis)',
  'focus-offset-color': 'var(--color-surface-50-vis)',

  // Optional emphasis effect (use sparingly)
  'focus-glow':
    '0 0 0 3px color-mix(in oklch, var(--color-primary-500-vis) 40%, transparent)',

  // High-contrast helper
  'focus-color-contrast-high': 'var(--color-primary-300-vis)',

  // Disabled
  'focus-disabled': 'transparent'
} as const;

export type FocusStyleTokenKey = keyof typeof focusStyleTokens;
