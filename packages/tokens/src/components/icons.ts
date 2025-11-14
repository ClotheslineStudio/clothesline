/**
 * Icon design tokens for Clothesline UI.
 *
 * Supports:
 * - stroke icons
 * - filled icons
 * - duotone (two-layer)
 * - animated icons (CSS or Lottie)
 *
 * Keys here become CSS vars like:
 *   icon → --icon
 *   icon-primary → --icon-primary
 *   icon-fill-primary → --icon-fill-primary
 */

export const iconTokens = {
  // --------------------------------------------------
  // Base color roles
  // --------------------------------------------------
  icon: 'var(--on-surface)',
  'icon-muted': 'var(--on-surface-muted, var(--color-surface-600))',

  'icon-primary': 'var(--color-primary-600)',
  'icon-success': 'var(--color-success-600)',
  'icon-warning': 'var(--color-warning-600)',
  'icon-error': 'var(--color-error-600)',
  'icon-info': 'var(--color-info-600)',

  // --------------------------------------------------
  // Duotone layers
  // --------------------------------------------------
  'icon-duotone-1': 'var(--icon)', // foreground
  'icon-duotone-2':
    'var(--color-surface-400, var(--on-surface-muted))', // background tint

  // --------------------------------------------------
  // Filled icons
  // --------------------------------------------------
  'icon-fill': 'var(--on-surface)',
  'icon-fill-muted': 'var(--color-surface-700)',
  'icon-fill-primary': 'var(--color-primary-600)',
  'icon-fill-success': 'var(--color-success-600)',
  'icon-fill-warning': 'var(--color-warning-600)',
  'icon-fill-error': 'var(--color-error-600)',
  'icon-fill-info': 'var(--color-info-600)',
  'icon-fill-hc': 'var(--color-surface-950)', // high-contrast override

  // --------------------------------------------------
  // Stroke
  // --------------------------------------------------
  // unitless for <svg stroke-width="var(--icon-stroke)">
  'icon-stroke': '2',
  'icon-stroke-hc': '2.25', // high-contrast

  'icon-stroke-linejoin': 'round',
  'icon-stroke-linecap': 'round',

  // --------------------------------------------------
  // Motion / animation
  // --------------------------------------------------
  'icon-spin-duration': '1.2s',
  'icon-pulse-duration': '1.0s',
  'icon-motion-scale': '1',
  'icon-motion-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',

  // --------------------------------------------------
  // Lottie metadata (optional)
  // --------------------------------------------------
  'icon-lottie-speed': '1',
  'icon-lottie-color-primary': 'var(--icon-primary)',
  'icon-lottie-color-secondary': 'var(--icon-duotone-2)',
  'icon-lottie-color-muted': 'var(--icon-muted)',
} as const;
