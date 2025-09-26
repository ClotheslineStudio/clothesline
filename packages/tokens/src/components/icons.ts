/**
 * Icon design tokens for Clothesline.
 * These map to CSS custom properties that your icon components read.
 *
 * Roles:
 *  - default/muted/primary/success/warning/error  → color roles
 *  - secondary → used by duotone's second layer
 *
 * Behavior:
 *  - stroke width defaults to --cl-icon-stroke, with a thicker value in
 *    high-contrast contexts (themes can swap to --cl-icon-stroke-hc).
 *  - durations are for CSS-driven animations (spin/pulse/etc).
 */

export const iconTokens = {
  // ---- Color roles (theme sets these to the right ramps) -------------------
  '--cl-icon': 'var(--on-surface)',
  '--cl-icon-muted':
    'var(--on-surface-muted, var(--color-surface-600))',
  '--cl-icon-primary': 'var(--color-primary-600)',
  '--cl-icon-success': 'var(--color-success-600)',
  '--cl-icon-warning': 'var(--color-warning-600)',
  '--cl-icon-error': 'var(--color-error-600)',

  // Secondary role (duotone second layer)
  '--cl-icon-secondary':
    'var(--color-surface-400, var(--on-surface-muted))',

  // ---- Stroke weight -------------------------------------------------------
  // Unitless so it can be used directly in <svg stroke-width="var(...)">
  '--cl-icon-stroke': '2',
  // Preferred stroke in high-contrast (themes can enable it conditionally)
  '--cl-icon-stroke-hc': '2.25',

  // ---- Motion (for CSS-only animations; components can read these) --------
  '--cl-icon-spin-duration': '1.2s',
  '--cl-icon-pulse-duration': '1.0s',
} as const;
