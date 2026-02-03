// packages/themes/src/tokens/semantic-colors.ts
export const semanticColorTokens = {
  /**
   * Mode-dependent semantic mappings (theme-agnostic)
   * Keys should NOT include leading `--` — the build emitter adds it.
   */
  light: {
    /* -----------------------------------------------------------------------
       Foregrounds (on-*)
    ----------------------------------------------------------------------- */
    "on-primary": "var(--color-primary-contrast-light)",
    "on-secondary": "var(--color-secondary-contrast-light)",
    "on-tertiary": "var(--color-tertiary-contrast-light)",
    "on-accent": "var(--color-accent-contrast-light)",
    "on-success": "var(--color-success-contrast-light)",
    "on-warning": "var(--color-warning-contrast-light)",
    "on-error": "var(--color-error-contrast-light)",
    "on-info": "var(--color-info-contrast-light)",
    "on-neutral": "var(--color-neutral-contrast-light)",

    /* Surface text ladder */
    "on-surface-strong": "var(--color-surface-950-vis)",
    "on-surface": "var(--color-surface-800-vis)",
    "on-surface-muted": "var(--color-surface-700-vis)",
    "on-surface-subtle": "var(--color-surface-600-vis)",
    "on-surface-disabled": "var(--color-surface-500-vis)",

    /* Text convenience (used everywhere) */
    "text-muted": "var(--on-surface-muted, var(--color-surface-700-vis))",
    "text-disabled": "var(--on-surface-disabled, var(--color-surface-500-vis))",

    /* -----------------------------------------------------------------------
       Backgrounds / surfaces
    ----------------------------------------------------------------------- */
    "background-app": "var(--color-surface-50-vis)",
    "background-panel": "var(--color-surface-100-vis)",
    "background-elevation-1": "var(--color-surface-100-vis)",
    "background-elevation-2": "var(--color-surface-200-vis)",

    /* Optional fill helpers */
    "fill-surface": "var(--color-surface-100-vis)",
    "fill-surface-subtle": "var(--color-surface-50-vis)",
    "fill-surface-strong": "var(--color-surface-200-vis)",

    /* -----------------------------------------------------------------------
       Borders (colors only)
    ----------------------------------------------------------------------- */
    "border-color-muted": "var(--color-surface-100-vis)",
    "border-color-default": "var(--color-surface-200-vis)",
    "border-color-strong": "var(--color-surface-300-vis)",

    /* -----------------------------------------------------------------------
       Focus / rings
    ----------------------------------------------------------------------- */
    "ring-offset-color": "var(--background-app)",
    "focus-ring-color": "var(--color-primary-400-vis)",

    /* -----------------------------------------------------------------------
       Role “subtle” backgrounds (extremely practical)
    ----------------------------------------------------------------------- */
    "primary-subtle": "var(--color-primary-100-vis)",
    "secondary-subtle": "var(--color-secondary-100-vis)",
    "tertiary-subtle": "var(--color-tertiary-100-vis)",
    "success-subtle": "var(--color-success-100-vis)",
    "warning-subtle": "var(--color-warning-100-vis)",
    "error-subtle": "var(--color-error-100-vis)",
    "info-subtle": "var(--color-info-100-vis)",
    "accent-subtle": "var(--color-accent-100-vis)",
    "neutral-subtle": "var(--color-neutral-100-vis)",

    /* -----------------------------------------------------------------------
       Links (semantic output)
       NOTE: semantic.css can map anchor-* → link-* for back-compat.
    ----------------------------------------------------------------------- */
    "link-color": "var(--color-primary-600-vis)",
    "link-color-hover": "var(--color-primary-700-vis)",
    "link-color-active": "var(--color-primary-800-vis)",
    "link-color-visited": "var(--color-tertiary-700-vis)",
  },

  dark: {
    /* Foregrounds (on-*) */
    "on-primary": "var(--color-primary-contrast-dark)",
    "on-secondary": "var(--color-secondary-contrast-dark)",
    "on-tertiary": "var(--color-tertiary-contrast-dark)",
    "on-accent": "var(--color-accent-contrast-dark)",
    "on-success": "var(--color-success-contrast-dark)",
    "on-warning": "var(--color-warning-contrast-dark)",
    "on-error": "var(--color-error-contrast-dark)",
    "on-info": "var(--color-info-contrast-dark)",
    "on-neutral": "var(--color-neutral-contrast-dark)",

    /* Surface text ladder */
    "on-surface-strong": "var(--color-surface-50-vis)",
    "on-surface": "var(--color-surface-200-vis)",
    "on-surface-muted": "var(--color-surface-400-vis)",
    "on-surface-subtle": "var(--color-surface-500-vis)",
    "on-surface-disabled": "var(--color-surface-600-vis)",

    /* Text convenience */
    "text-muted": "var(--on-surface-muted, var(--color-surface-400-vis))",
    "text-disabled": "var(--on-surface-disabled, var(--color-surface-600-vis))",

    /* Backgrounds / surfaces */
    "background-app": "var(--color-surface-950-vis)",
    "background-panel": "var(--color-surface-900-vis)",
    "background-elevation-1": "var(--color-surface-900-vis)",
    "background-elevation-2": "var(--color-surface-800-vis)",

    /* Fill helpers */
    "fill-surface": "var(--color-surface-900-vis)",
    "fill-surface-subtle": "var(--color-surface-950-vis)",
    "fill-surface-strong": "var(--color-surface-800-vis)",

    /* Borders (colors only) */
    "border-color-muted": "var(--color-surface-800-vis)",
    "border-color-default": "var(--color-surface-700-vis)",
    "border-color-strong": "var(--color-surface-600-vis)",

    /* Focus / rings */
    "ring-offset-color": "var(--background-app)",
    "focus-ring-color": "var(--color-primary-400-vis)",

    /* Role subtle backgrounds */
    "primary-subtle": "var(--color-primary-900-vis)",
    "secondary-subtle": "var(--color-secondary-900-vis)",
    "tertiary-subtle": "var(--color-tertiary-900-vis)",
    "success-subtle": "var(--color-success-900-vis)",
    "warning-subtle": "var(--color-warning-900-vis)",
    "error-subtle": "var(--color-error-900-vis)",
    "info-subtle": "var(--color-info-900-vis)",
    "accent-subtle": "var(--color-accent-900-vis)",
    "neutral-subtle": "var(--color-neutral-900-vis)",

    /* Links */
    "link-color": "var(--color-primary-300-vis)",
    "link-color-hover": "var(--color-primary-200-vis)",
    "link-color-active": "var(--color-primary-100-vis)",
    "link-color-visited": "var(--color-tertiary-300-vis)",
  },
} as const;

