// packages/themes/types.ts

/** ──────────────────────────────────────────────────────────────────────────
 *  Legacy types (kept for back‑compat). Prefer the new ModeState model below.
 *  ────────────────────────────────────────────────────────────────────────── */

// Visual mode of the UI: standard light/dark
export type ThemeMode = 'light' | 'dark';

// Optional contrast override (used alongside ThemeMode)
/** @deprecated Use `Contrast` inside `ModeState` */
export type ContrastMode = 'normal' | 'high';

// Optional vision mode (used alongside ThemeMode)
/** @deprecated Use `Vision` inside `ModeState` */
export type VisionMode = 'default' | 'color-blind';

// Full combination string for a build variant (for CSS filenames)
/** @deprecated Use attribute-driven modes instead of filename variants */
export type ModeString =
  | 'light'
  | 'dark'
  | 'high-contrast-light'
  | 'high-contrast-dark'
  | 'color-blind-light'
  | 'color-blind-dark';

/** ──────────────────────────────────────────────────────────────────────────
 *  Core semantic color roles
 *  ────────────────────────────────────────────────────────────────────────── */

export type SemanticColorRole =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'accent'
  | 'neutral'
  | 'surface';

export interface RoleConfig {
  /** OKLCH hue (0–360) */
  hue: number;
  /** OKLCH chroma (typically 0–0.4; can exceed if you know what you’re doing) */
  chroma: number;
}

/** ──────────────────────────────────────────────────────────────────────────
 *  Stackable Modes: attribute-driven state + delta description types
 *  ────────────────────────────────────────────────────────────────────────── */

export type Vision = 'none' | 'protan' | 'deutan' | 'tritan' | 'mono';

export type Contrast =
  | 'normal'
  | 'high'
  | { custom: number }; // e.g. { custom: 1.12 } -> sets data-contrast="custom" and --contrast-factor: 1.12

export type ModeState = {
  /** Theme/palette name (e.g., 'clothesline', 'bigsky') */
  theme?: string;
  /** Light/Dark */
  mode?: ThemeMode;

  /** Color vision simulation / palette adjustment */
  vision?: Vision;

  /** Contrast handling; supports a custom scalar */
  contrast?: Contrast;

  /** Global type scale multiplier (1.00 = base) */
  typescale?: number;

  /** Reading/comprehension aids */
  reading?: 'dyslexia' | 'plain' | 'none';

  /** Motion preferences */
  motion?: 'normal' | 'reduced' | 'off';

  /** Emphasize focus affordances (presence = on) */
  focus?: boolean;

  /** UI complexity flags (space-separated tokens on `data-ui`) */
  ui?: Array<'simplified' | 'visual-alerts' | 'captions'>;

  /** Motor accessibility flags (space-separated tokens on `data-motor`) */
  motor?: Array<'large-hit' | 'kbd' | 'sticky-controls'>;

  /** Right-to-left layout (presence = true) */
  rtl?: boolean;

  /** Developer/debug overlays (space-separated tokens on `data-dev`) */
  dev?: Array<'a11y-debug' | 'grid' | 'tokens'>;
};

/** Minimal description of CSS variable changes for a given mode delta. */
export type CSSVarMap = Record<string, string | number>;

export interface TokenDelta {
  /**
   * Map of CSS custom properties to set on :root (html) when the mode is active.
   * Example: { '--radius-interactive': '0.625rem', '--focus-ring': 'oklch(70% 0.2 230)' }
   */
  vars?: CSSVarMap;

  /**
   * Optional note for docs; not used at runtime.
   */
  note?: string;
}

/**
 * Non-token adjustments that are still tiny/scoped (selectors you’ll target in modes.css).
 * This type is intentionally light; real CSS lives in your generated `modes.css`.
 */
export interface UtilityDelta {
  /** Optional list of selector “hooks” you plan to affect in CSS (for documentation/reference). */
  selectors?: string[];
  /** Optional note for docs; not used at runtime. */
  note?: string;
}

/**
 * A registry of deltas the theme can expose per mode bucket.
 * Each entry represents a tiny, scoped override (variables/utilities) for that mode.
 */
export interface ModeDeltas {
  // Visual Accessibility
  vision?: {
    protan?: TokenDelta;
    deutan?: TokenDelta;
    tritan?: TokenDelta;
    mono?: TokenDelta;
  };
  contrast?: {
    normal?: TokenDelta;
    high?: TokenDelta;
    /**
     * Custom contrast deltas should be multiplicative and read the runtime var
     * `--contrast-factor`; keep this empty or with doc notes.
     */
    custom?: TokenDelta;
  };
  /**
   * Reading: typescale is scalar (runtime via data-typescale);
   * dyslexia/plain can have token & utility tweaks.
   */
  reading?: {
    dyslexia?: TokenDelta & UtilityDelta;
    plain?: UtilityDelta; // content-level in apps; can still expose utility hooks
  };

  // Motion & Focus
  motion?: {
    reduced?: UtilityDelta;
    off?: UtilityDelta;
  };
  focus?: UtilityDelta;

  // UI Complexity & Motor
  ui?: {
    simplified?: UtilityDelta;
    'visual-alerts'?: UtilityDelta;
    captions?: UtilityDelta;
  };
  motor?: {
    'large-hit'?: UtilityDelta;
    kbd?: UtilityDelta;
    'sticky-controls'?: UtilityDelta;
  };

  // Language & Layout
  rtl?: UtilityDelta;

  // Developer & Debug
  dev?: {
    'a11y-debug'?: UtilityDelta;
    grid?: UtilityDelta;
    tokens?: UtilityDelta;
  };
}

/**
 * Preset named states you want to ship with a theme,
 * e.g., { "accessible": { contrast: 'high', typescale: 1.1, ui: ['simplified'] } }
 */
export type ModePresets = Record<string, ModeState>;

/** Default/initial state a theme recommends (can be overridden by the app at runtime). */
export interface ModeDefaults extends Required<Pick<ModeState, 'mode'>> {
  /** Optional defaults for other mode fields */
  theme?: string;
  vision?: Vision;
  contrast?: Contrast;
  typescale?: number;
  reading?: ModeState['reading'];
  motion?: ModeState['motion'];
  focus?: boolean;
  ui?: NonNullable<ModeState['ui']>;
  motor?: NonNullable<ModeState['motor']>;
  rtl?: boolean;
  dev?: NonNullable<ModeState['dev']>;
}

/** ──────────────────────────────────────────────────────────────────────────
 *  ThemeConfig: now with modes (presets + deltas). Legacy fields kept optional.
 *  ────────────────────────────────────────────────────────────────────────── */

export interface ThemeConfig {
  /** e.g., 'clothesline' */
  name: string;

  /** Purpose-driven role palette inputs used to generate ramps/tokens */
  roles: { [role in SemanticColorRole]: RoleConfig };

  /** Stackable modes: presets (named states), deltas (tiny CSS var/util overrides), and defaults */
  modes?: {
    /** Named presets (saved to JSON; exposed in builder UI) */
    presets?: ModePresets;
    /** Per-mode delta registry (tiny, scoped overrides that the builder can author) */
    deltas?: ModeDeltas;
    /** Default starting state */
    defaults?: ModeDefaults;
  };

  /** @deprecated kept for back‑compat with older builds */
  contrast?: ContrastMode;
  /** @deprecated kept for back‑compat with older builds */
  vision?: VisionMode;
}


