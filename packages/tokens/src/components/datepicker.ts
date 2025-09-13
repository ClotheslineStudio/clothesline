// DatePicker component tokens (flat CSS variable map)
// Mirrors your buttonTokens style: each key maps to a CSS var value
// using existing role variables (…-vis, --on-*, --spacing-*, etc.).

export const datepickerTokens = {
  /* ===== Container ===== */
  'datepicker-bg': 'var(--color-surface-100-vis)',
  'datepicker-border': '1px solid var(--color-surface-300)',
  'datepicker-text': 'var(--on-surface)',
  'datepicker-muted-text': 'var(--on-surface-muted)',

  /* Shape & spacing */
  'datepicker-radius': 'var(--radius-surface)',
  'datepicker-padding-x': 'var(--spacing-3)',
  'datepicker-padding-y': 'var(--spacing-3)',
  'datepicker-gap': 'var(--spacing-2)',

  /* Day cell metrics (keep square’ish) */
  // If you have --size-control-md, use it; otherwise fall back to 2.5rem
  'datepicker-cell-size': 'var(--size-control-md, 2.5rem)',

  /* ===== Header / Nav ===== */
  'datepicker-header-text': 'var(--on-surface-strong)',
  'datepicker-nav-icon': 'var(--on-surface)',
  'datepicker-nav-icon-hover': 'var(--on-surface-strong)',

  /* ===== Day states ===== */
  'datepicker-day-bg': 'var(--color-surface-0, transparent)',
  'datepicker-day-text': 'var(--on-surface)',
  'datepicker-day-hover-bg': 'var(--color-primary-100-vis)',
  'datepicker-day-selected-bg': 'var(--color-primary-500-vis)',
  'datepicker-day-selected-text': 'var(--on-primary)',
  'datepicker-day-disabled-text': 'var(--on-surface-disabled)',
  'datepicker-day-outside-text': 'var(--on-surface-subtle)',

  /* Today ring/outline (subtle) */
  'datepicker-day-today-ring': 'var(--color-info-400-vis)',

  /* Focus (match your focus system) */
  'datepicker-focus-ring': 'var(--focus-ring, 2px solid var(--color-info-500-vis))',
  'datepicker-focus-ring-offset': 'var(--focus-offset, 1px)',
};

