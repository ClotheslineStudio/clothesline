// Refactored to use semantic tokens where possible
export const componentPreviewTokens = {
  // Backgrounds
  'preview-bg': 'var(--on-surface, var(--color-surface-100))',
  'preview-header-bg': 'var(--on-surface-subtle, var(--color-surface-200))',
  'preview-code-bg': 'var(--on-surface, var(--color-surface-50))',

  // Borders
  'preview-border': 'var(--border-default, var(--color-border-default))',
  'preview-code-border': 'var(--border-subtle, var(--color-border-subtle))',

  // Text
  'preview-title-color': 'var(--on-surface-strong, var(--color-text-strong))',
  'preview-code-color': 'var(--on-surface-muted, var(--color-text-muted))',

  // Shape & shadow
  'preview-radius': 'var(--radius-lg)',
  'preview-shadow': 'var(--shadow-md)',

  // Spacing (semantic tokens)
  'preview-padding': 'var(--spacing-base, var(--spacing-4))',
  'preview-code-padding': 'var(--spacing-sm, var(--spacing-3))',

  // Typography (semantic tokens)
  'preview-code-font-size': 'var(--type-scale-sm, 0.875rem)',
  'preview-code-font-family': 'var(--type-family-mono, var(--font-mono))'
};
