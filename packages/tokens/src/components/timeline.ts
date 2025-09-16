// packages/tokens/src/timeline.ts
// Semantic tokens for Timeline components
// These rely on theme variables (expects --color-*, --on-* to be defined in theme CSS).

export const timelineTokens = {
  /* ===== Track (the line itself) ===== */
  'timeline-track-color': 'var(--color-surface-400-vis)',
  'timeline-track-color-active': 'var(--color-primary-500-vis)',
  'timeline-track-thickness': '2px',
  'timeline-track-style': 'solid', // can be dashed/dotted via CSS override
  'timeline-track-gap': 'var(--spacing-8)', // distance between items

  /* ===== Node (the markers) ===== */
  'timeline-node-size-sm': '0.75rem',
  'timeline-node-size-md': '1rem',
  'timeline-node-size-lg': '1.5rem',

  'timeline-node-bg': 'var(--color-surface-0)', // neutral surface
  'timeline-node-border': '2px solid var(--color-surface-400-vis)',
  'timeline-node-shadow': '0 1px 2px rgba(0,0,0,0.08)',

  'timeline-node-active-bg': 'var(--color-primary-500-vis)',
  'timeline-node-active-border': '2px solid var(--color-primary-600-vis)',
  'timeline-node-active-icon': 'var(--on-primary)',

  'timeline-node-complete-bg': 'var(--color-success-500-vis)',
  'timeline-node-complete-border': '2px solid var(--color-success-600-vis)',
  'timeline-node-complete-icon': 'var(--on-success)',

  'timeline-node-pending-bg': 'var(--color-surface-300)',
  'timeline-node-pending-border': '2px solid var(--color-surface-400-vis)',
  'timeline-node-pending-icon': 'var(--on-surface-muted)',

  'timeline-node-error-bg': 'var(--color-error-500-vis)',
  'timeline-node-error-border': '2px solid var(--color-error-600-vis)',
  'timeline-node-error-icon': 'var(--on-error)',

  /* ===== Card (content containers) ===== */
  'timeline-card-bg': 'var(--color-surface-0)',
  'timeline-card-fg': 'var(--on-surface)',
  'timeline-card-radius': 'var(--radius-md)',
  'timeline-card-padding-x': 'var(--spacing-4)',
  'timeline-card-padding-y': 'var(--spacing-3)',
  'timeline-card-shadow': 'var(--shadow-sm)',
  'timeline-card-border': '1px solid var(--color-surface-300)',

  /* Variants */
  'timeline-card-outlined-bg': 'transparent',
  'timeline-card-outlined-border': '1px solid var(--color-surface-400-vis)',
  'timeline-card-elevated-shadow': 'var(--shadow-md)',
  'timeline-card-soft-bg': 'var(--color-surface-100)',

  /* ===== Motion / Interaction ===== */
  'timeline-motion-duration': '150ms',
  'timeline-motion-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'timeline-expand-duration': '200ms',
};
