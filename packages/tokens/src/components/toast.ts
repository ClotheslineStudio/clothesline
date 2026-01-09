/**
 * Toast tokens (CSS-ready).
 * Contract updates:
 * - Use semantic layer for surfaces/text/borders (semantic-colors.css)
 * - Shadow from elevation semantics
 * - z-index from z-index semantics (not magic numbers)
 * - Variant backgrounds use role-subtle helpers (semantic-colors.css)
 */
export const toastTokens = {
  // layout
  'toast-radius': 'var(--radius-lg)',
  'toast-padding-y': 'var(--spacing-3)',
  'toast-padding-x': 'var(--spacing-4)',
  'toast-gap': 'var(--spacing-2)',
  'toast-width': '22rem',

  // layering
  'toast-shadow': 'var(--elevation-toast)',
  'toast-z': 'var(--z-toast)',

  // base surface
  'toast-bg': 'var(--background-panel)',
  'toast-text': 'var(--on-surface)',
  'toast-border': '1px solid var(--border-color-default)',

  // variants (subtle role fills)
  'toast-info-bg': 'var(--info-subtle)',
  'toast-success-bg': 'var(--success-subtle)',
  'toast-warning-bg': 'var(--warning-subtle)',
  'toast-error-bg': 'var(--error-subtle)',

  // optional: if you want variant text to switch to role on-color:
  // 'toast-info-text': 'var(--on-info)',
  // 'toast-success-text': 'var(--on-success)',
  // 'toast-warning-text': 'var(--on-warning)',
  // 'toast-error-text': 'var(--on-error)',
} as const;

