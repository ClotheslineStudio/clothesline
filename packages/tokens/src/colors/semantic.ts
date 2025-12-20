// packages/themes/src/tokens/semantic-colors.ts
export const semanticColorTokens = {
  // Mode-dependent semantic mappings (theme-agnostic)
  light: {
    "on-primary":   "var(--color-primary-contrast-light)",
    "on-secondary": "var(--color-secondary-contrast-light)",
    "on-tertiary":  "var(--color-tertiary-contrast-light)",
    "on-accent":    "var(--color-accent-contrast-light)",
    "on-success":   "var(--color-success-contrast-light)",
    "on-warning":   "var(--color-warning-contrast-light)",
    "on-error":     "var(--color-error-contrast-light)",
    "on-info":      "var(--color-info-contrast-light)",
    "on-neutral":   "var(--color-neutral-contrast-light)",

    // Surface text ladder (this resolves your “on-surface” confusion)
    "on-surface":        "var(--color-surface-900-vis)",
    "on-surface-strong": "var(--color-surface-950-vis)",
    "on-surface-muted":  "var(--color-surface-700-vis)",
    "on-surface-subtle": "var(--color-surface-600-vis)",
    "on-surface-disabled":"var(--color-surface-500-vis)",
  },

  dark: {
    "on-primary":   "var(--color-primary-contrast-dark)",
    "on-secondary": "var(--color-secondary-contrast-dark)",
    "on-tertiary":  "var(--color-tertiary-contrast-dark)",
    "on-accent":    "var(--color-accent-contrast-dark)",
    "on-success":   "var(--color-success-contrast-dark)",
    "on-warning":   "var(--color-warning-contrast-dark)",
    "on-error":     "var(--color-error-contrast-dark)",
    "on-info":      "var(--color-info-contrast-dark)",
    "on-neutral":   "var(--color-neutral-contrast-dark)",

    "on-surface":        "var(--color-surface-100-vis)",
    "on-surface-strong": "var(--color-surface-50-vis)",
    "on-surface-muted":  "var(--color-surface-200-vis)",
    "on-surface-subtle": "var(--color-surface-300-vis)",
    "on-surface-disabled":"var(--color-surface-400-vis)",
    // Neon/glossy effect tokens for night-market theme
    "neon-pink":   "oklch(75% 0.28 340)",
    "neon-blue":   "oklch(70% 0.25 250)",
    "neon-green":  "oklch(80% 0.30 140)",
    "neon-purple": "oklch(68% 0.22 300)",
    "neon-yellow": "oklch(90% 0.22 100)",
    "neon-cyan":   "oklch(80% 0.25 210)",
    "neon-red":    "oklch(70% 0.28 30)",
    "glossy-surface": "rgba(20,20,30,0.85)",
    "neon-glow":   "0 0 24px 4px oklch(80% 0.30 140)",
    "glass-blur":  "blur(12px)",
    "glass-opacity": "0.85"
  }
} as const;
