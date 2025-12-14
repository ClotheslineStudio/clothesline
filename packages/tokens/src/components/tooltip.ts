/**
 * Tooltip tokens (CSS-ready).
 * Contract:
 * - No raw colors when a system token exists (prefer *-vis).
 * - Shadow should come from elevation tokens.
 * - z-index should come from z-index tokens.
 */
export const tooltipTokens = {
  'tooltip-bg': 'var(--color-surface-900-vis)',
  'tooltip-text': 'var(--color-surface-50-vis)',

  'tooltip-radius': 'var(--radius-sm)',
  'tooltip-padding-y': 'var(--spacing-1)',
  'tooltip-padding-x': 'var(--spacing-2)',

  // Use your elevation system instead of raw rgba literals
  'tooltip-shadow': 'var(--elevation-popover)',

  // Use your z-index semantics instead of magic numbers
  'tooltip-z': 'var(--z-tooltip)'
} as const;

