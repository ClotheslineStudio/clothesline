/**
 * Background-related tokens for the Clothesline UI system.
 * These control global body/surface backgrounds and app surfaces.
 *
 * Note:
 * - Keys are raw token names (no `--`).
 * - Values can reference other CSS vars (theme colors).
 * - The build step will emit them as `--background-*` variables.
 */

export const backgroundTokens = {
  // Light & dark mode body backgrounds
  "body-background-color": "var(--color-surface-50)",
  "body-background-color-dark": "var(--color-surface-950)",

  // Default section / container backgrounds
  "surface-background": "var(--color-surface-100)",
  "surface-background-dark": "var(--color-surface-900)",

  // Mesh/gradient background (optional visual override)
  "background-image": "none",
  "background-image-dark": "none",

  // Additional background config (optional future use)
  "background-attachment": "fixed",
  "background-position": "center",
  "background-repeat": "no-repeat",
  "background-size": "cover",

  // App + panel surfaces
  "background-app": "var(--color-surface-50)",
  "background-panel": "var(--color-surface-100)",
  "background-elevation-1": "var(--color-surface-100)",
  "background-elevation-2": "var(--color-surface-200)",

  // Visual flourishes (gradients, noise, overlays)
  "background-gradient-1": "none",
  "background-gradient-2": "none",
  "background-overlay": "none",
  "background-animation": "none",
  "background-visual-noise": "none",
  "background-blur": "none",

  // Default semantic background
  "background-default": "var(--body-background-color)",

  // Contextual backgrounds
  "background-secure": "var(--color-neutral-100)",
  "background-print": "#fff",
  "background-admin": "var(--color-error-50)",
};

