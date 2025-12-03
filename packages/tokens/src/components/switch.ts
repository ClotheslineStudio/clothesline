// packages/tokens/src/switch.ts
export const switchTokens = {
  /* Track */
  'switch-track-bg': 'var(--color-surface-400-vis, var(--color-surface-400))',
  'switch-track-bg-hover': 'var(--color-surface-500-vis, var(--color-surface-500))',
  'switch-track-bg-active': 'var(--color-primary-500-vis, var(--color-primary-500))',
  'switch-track-bg-checked-hover':
    'var(--color-primary-600-vis, var(--color-primary-600))',
  'switch-track-bg-disabled': 'var(--color-surface-300)',

  /* Thumb */
  'switch-thumb-bg': 'var(--color-surface-0)',
  'switch-thumb-bg-hover': 'var(--color-surface-50)',
  'switch-thumb-bg-active': 'var(--on-primary, var(--color-surface-0))',
  'switch-thumb-bg-disabled': 'var(--color-surface-200)',

  /* Depth (no borders) */
  'switch-thumb-shadow': '0 1.5px 3px rgba(0,0,0,0.25)',
  'switch-thumb-shadow-active': '0 2px 6px rgba(0,0,0,0.28)',

  /* Shape & sizing */
  'switch-radius': 'var(--radius-full)',
  'switch-track-height': '1.25rem',
  'switch-track-width': '2.25rem',
  'switch-thumb-size': '1rem',
  'switch-gap': '2px',

  /* Motion + focus */
  'switch-motion-duration': '150ms',
  'switch-motion-ease': 'var(--motion-ease)',
  'switch-focus-ring': 'var(--focus-ring)',
  'switch-focus-ring-offset': 'var(--focus-offset)'
};

