/**
 * Background & surface tokens for Clothesline UI.
 *
 * Design goals:
 * - Token names are stable across modes (light/dark handled via modes.css overrides).
 * - Tokens represent semantic roles (page, app chrome, surfaces, overlays), not raw colors.
 * - Keep “image config” separate from background colors to avoid mixing concerns.
 *
 * Emission:
 * - Keys are raw token names (no `--`).
 * - Build step emits them as CSS variables under the `--background-*` namespace
 *   unless you intentionally include the full prefix in the key.
 */

export const backgroundTokens = {
  /* =========================================================
     PAGE / DOCUMENT BACKGROUNDS
     ========================================================= */
  // The root/page background (behind everything).
  "body-color": "var(--color-surface-50)",

  // Default “app canvas” background for full-height layouts.
  "app": "var(--color-surface-50)",

  /* =========================================================
     SURFACE ROLES (LAYERED UI)
     ========================================================= */
  // Generic surface for sections/containers (cards often sit on this).
  "surface": "var(--color-surface-100)",

  // App chrome surfaces (sidebars, headers, panels).
  "panel": "var(--color-surface-100)",

  // Elevation steps (raised surfaces).
  // Keep these aligned with your elevation/shadow system.
  "elevation-1": "var(--color-surface-100)",
  "elevation-2": "var(--color-surface-200)",

  /* =========================================================
     OVERLAYS / SCRIMS / EFFECTS (OPTIONAL)
     ========================================================= */
  // Used for modal backdrops, drawers, etc. (often combined with opacity tokens).
  // Recommend pairing with an opacity token at point-of-use.
  "scrim": "var(--color-surface-950)",

  // Optional decorative layers (leave as "none" by default).
  "gradient-1": "none",
  "gradient-2": "none",
  "overlay": "none",
  "visual-noise": "none",
  "blur": "none",
  "animation": "none",

  /* =========================================================
     BACKGROUND IMAGE (OPTIONAL)
     ========================================================= */
  "image": "none",
  "image-attachment": "fixed",
  "image-position": "center",
  "image-repeat": "no-repeat",
  "image-size": "cover",

  /* =========================================================
     CONTEXTUAL / SPECIALTY BACKGROUNDS
     ========================================================= */
  // These should be used sparingly; prefer semantic surface roles when possible.
  "secure": "var(--color-neutral-100)",
  "print": "#fff",
  "admin": "var(--color-error-50)",

  /* =========================================================
     DEFAULT ALIAS
     ========================================================= */
  // Your system-wide default background role.
  "default": "var(--background-body-color)"
} as const;


