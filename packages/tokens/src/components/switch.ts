// packages/tokens/src/switch.ts
// Switch component tokens (CSS-ready).
// Contract updates (aligned with your semantic layers):
// - Prefer semantic surface/fill/border/ring tokens over raw ramp steps when practical.
// - Avoid non-existent surface keys (e.g., surface-0); use fill/background semantics instead.
// - Prefer elevation semantics over raw rgba shadows.
// - Prefer focus tokens + semantic focus-ring-color / ring-offset-color.

export const switchTokens = {
  /* ===========================================================================
     Track
     - Neutral track uses surface/border semantics
     - Checked uses primary ramp
  =========================================================================== */
  'switch-track-bg': 'var(--border-color-strong)',
  'switch-track-bg-hover': 'var(--border-color-default)',
  'switch-track-bg-active': 'var(--color-primary-500-vis)',
  'switch-track-bg-checked-hover': 'var(--color-primary-600-vis)',
  'switch-track-bg-disabled': 'var(--border-color-muted)',

  /* ===========================================================================
     Thumb
     - Use fill/background semantics instead of surface-0/50 literals
  =========================================================================== */
  'switch-thumb-bg': 'var(--fill-surface-subtle)',
  'switch-thumb-bg-hover': 'var(--fill-surface)',
  'switch-thumb-bg-active': 'var(--on-primary)', // reads well on primary track
  'switch-thumb-bg-disabled': 'var(--fill-surface-strong)',

  /* ===========================================================================
     Depth
     - Use elevation semantics (no raw rgba)
  =========================================================================== */
  'switch-thumb-shadow': 'var(--elevation-hairline)',
  'switch-thumb-shadow-active': 'var(--elevation-popover)',

  /* ===========================================================================
     Shape & sizing
  =========================================================================== */
  'switch-radius': 'var(--radius-full)',
  'switch-track-height': '1.25rem',
  'switch-track-width': '2.25rem',
  'switch-thumb-size': '1rem',
  'switch-gap': '2px',

  /* ===========================================================================
     Motion + focus
  =========================================================================== */
  'switch-motion-duration': 'var(--motion-duration-fast, 150ms)',
  'switch-motion-ease': 'var(--motion-ease, ease-in-out)',

  // Prefer semantic ring colors + your focus width/offset scales
  'switch-focus-ring-color': 'var(--focus-ring-color)',
  'switch-focus-ring-width': 'var(--focus-width)',
  'switch-focus-ring-offset': 'var(--focus-offset)',
  'switch-focus-ring-offset-color': 'var(--ring-offset-color)',
} as const;


