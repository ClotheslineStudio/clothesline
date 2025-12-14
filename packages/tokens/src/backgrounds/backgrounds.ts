/**
 * Background tokens (CSS-ready, theme-coupled).
 *
 * Contract:
 * - These are semantic roles, not a numeric scale.
 * - Values MAY use var() and reference color ramps.
 * - Emit under the `--background-*` namespace.
 * - Prefer `*-vis` color vars so vision/contrast adjustments flow through.
 *
 * Notes:
 * - `scrim` = the dimming layer behind modals/drawers. Pair with opacity at point-of-use.
 * - `elevation-*` here is a *surface color step*, not a shadow. Shadows live in elevation tokens.
 */
export const backgroundTokens = {
  background: {
    /* PAGE / CANVAS */
    body: "var(--color-surface-50-vis)",
    app: "var(--color-surface-50-vis)",

    /* SURFACES */
    surface: "var(--color-surface-100-vis)",
    panel: "var(--color-surface-100-vis)",

    /* ELEVATED SURFACES (visual layer, not shadow) */
    "elevation-1": "var(--color-surface-100-vis)",
    "elevation-2": "var(--color-surface-200-vis)",

    /* OVERLAYS */
    scrim: "var(--color-surface-950-vis)",

    /* DECORATIVE / OPTIONAL LAYERS */
    "gradient-1": "none",
    "gradient-2": "none",
    overlay: "none",
    "visual-noise": "none",
    blur: "none",
    animation: "none",

    /* BACKGROUND IMAGE SETTINGS (OPTIONAL) */
    image: "none",
    "image-attachment": "fixed",
    "image-position": "center",
    "image-repeat": "no-repeat",
    "image-size": "cover",

    /* CONTEXTUAL */
    secure: "var(--color-neutral-100-vis)",
    print: "#fff",
    admin: "var(--color-error-50-vis)",

    /* DEFAULT */
    default: "var(--background-body)"
  }
} as const;

export type BackgroundTokenKey = keyof (typeof backgroundTokens)["background"];


