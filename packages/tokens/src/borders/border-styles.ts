/**
 * Border style tokens (theme-coupled)
 *
 * This file intentionally contains CSS-ready values (var(), color-mix(), etc.)
 * and is NOT part of the "width primitives + semantic width aliases" contract.
 *
 * Naming:
 * - kebab-case keys
 * - border-color-* for border/outline stroke colors
 */

export const borderStyleTokens = {
  // Border colors (states)
  'border-color-default': 'var(--color-surface-300-vis)',
  'border-color-muted': 'var(--color-surface-200-vis)',
  'border-color-disabled': 'var(--color-surface-200-vis)',

  'border-color-hover': 'var(--color-primary-300-vis)',
  'border-color-active': 'var(--color-primary-500-vis)',

  'border-color-error': 'var(--color-error-500-vis)',
  'border-color-warning': 'var(--color-warning-500-vis)',
  'border-color-success': 'var(--color-success-500-vis)',
  'border-color-info': 'var(--color-info-500-vis)',

  // High-contrast helper (your mode/contrast layer can override this)
  'border-color-contrast-high': 'var(--color-surface-900-vis)',

  // Misc border styles/effects
  'border-style-inspect': 'dashed',
  'border-inset': 'inset 0 0 0 var(--border-1) var(--border-color-muted)',
  'border-transition': 'border-color 0.2s ease, outline 0.2s ease',
  'border-radius-transition': '0.2s ease-in-out'
} as const;

export type BorderStyleTokenKey = keyof typeof borderStyleTokens;
