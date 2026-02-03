export const alertTokens = {
  // base container
  'alert-radius': 'var(--radius-container)',
  'alert-padding-y': 'var(--spacing-3)',
  'alert-padding-x': 'var(--spacing-4)',
  'alert-gap': 'var(--spacing-3)',

  // Prefer semantic border width + semantic border color
  'alert-border': 'var(--border-width-default, 1px) solid var(--border-color-default)',
  'alert-shadow': 'none',

  // neutral/default (semantic surfaces + text ladder)
  'alert-bg': 'var(--fill-surface)',
  'alert-text': 'var(--on-surface)',
  'alert-border-color': 'var(--border-color-default)',

  // variants (use role subtle backgrounds + global readable text ladder)
  // NOTE: these rely entirely on semantic-colors.css tokens you already emit.
  'alert-info-bg': 'var(--info-subtle)',
  'alert-info-text': 'var(--on-surface-strong)',
  'alert-info-border-color': 'var(--border-color-default)',

  'alert-success-bg': 'var(--success-subtle)',
  'alert-success-text': 'var(--on-surface-strong)',
  'alert-success-border-color': 'var(--border-color-default)',

  'alert-warning-bg': 'var(--warning-subtle)',
  'alert-warning-text': 'var(--on-surface-strong)',
  'alert-warning-border-color': 'var(--border-color-default)',

  'alert-error-bg': 'var(--error-subtle)',
  'alert-error-text': 'var(--on-surface-strong)',
  'alert-error-border-color': 'var(--border-color-default)',

  // actions / close button
  'alert-action-color': 'var(--on-surface-strong)',
  'alert-action-color-hover': 'var(--on-surface)',
} as const;

