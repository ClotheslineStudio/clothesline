// packages/tokens/src/timeline.ts
// Timeline component tokens (CSS-ready).
// Contract updates (aligned with your semantic layers):
// - Prefer semantic surface/text/border tokens where they exist.
// - Prefer elevation + z-index semantics over raw shadows/nums.
// - Avoid non-existent surface keys (e.g., surface-0) and legacy shadow tokens.

export const timelineTokens = {
  /* ===== Track (the line itself) ===== */
  'timeline-track-color': 'var(--border-color-strong)',
  'timeline-track-color-active': 'var(--color-primary-500-vis)',
  'timeline-track-thickness': '2px',
  'timeline-track-style': 'solid',
  'timeline-track-gap': 'var(--spacing-8)',

  /* ===== Node (the markers) ===== */
  'timeline-node-size-sm': '0.75rem',
  'timeline-node-size-md': '1rem',
  'timeline-node-size-lg': '1.5rem',

  // Base node: use semantic surface + border
  'timeline-node-bg': 'var(--fill-surface-subtle)',
  'timeline-node-border': '2px solid var(--border-color-strong)',
  'timeline-node-shadow': 'var(--elevation-hairline)',

  // Active
  'timeline-node-active-bg': 'var(--color-primary-500-vis)',
  'timeline-node-active-border': '2px solid var(--color-primary-600-vis)',
  'timeline-node-active-icon': 'var(--on-primary)',

  // Complete
  'timeline-node-complete-bg': 'var(--color-success-500-vis)',
  'timeline-node-complete-border': '2px solid var(--color-success-600-vis)',
  'timeline-node-complete-icon': 'var(--on-success)',

  // Pending (neutral)
  'timeline-node-pending-bg': 'var(--fill-surface)',
  'timeline-node-pending-border': '2px solid var(--border-color-default)',
  'timeline-node-pending-icon': 'var(--on-surface-muted)',

  // Error
  'timeline-node-error-bg': 'var(--color-error-500-vis)',
  'timeline-node-error-border': '2px solid var(--color-error-600-vis)',
  'timeline-node-error-icon': 'var(--on-error)',

  /* ===== Card (content containers) ===== */
  'timeline-card-bg': 'var(--background-panel)',
  'timeline-card-fg': 'var(--on-surface)',
  'timeline-card-radius': 'var(--radius-md)',
  'timeline-card-padding-x': 'var(--spacing-4)',
  'timeline-card-padding-y': 'var(--spacing-3)',
  'timeline-card-shadow': 'var(--elevation-card)',
  'timeline-card-border': '1px solid var(--border-color-default)',

  /* Variants */
  'timeline-card-outlined-bg': 'transparent',
  'timeline-card-outlined-border': '1px solid var(--border-color-strong)',
  'timeline-card-elevated-shadow': 'var(--elevation-popover)',
  'timeline-card-soft-bg': 'var(--background-elevation-1)',

  /* ===== Motion / Interaction ===== */
  'timeline-motion-duration': 'var(--motion-duration-fast, 150ms)',
  'timeline-motion-ease': 'var(--motion-ease, ease-in-out)',
  'timeline-expand-duration': 'var(--motion-duration-medium, 200ms)',
} as const;

