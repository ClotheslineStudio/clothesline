// packages/themes/src/types.ts
import type { ModeState, Vision, Contrast } from './runtime/modes.js';

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

/** OKLCH seed triplet used to generate ramps. */
export type OklchSeed = { l: number; c: number; h: number };

/** Per-mode seed overrides (used primarily for surface). */
export type OklchSeedPair = { light: OklchSeed; dark: OklchSeed };

/** ──────────────────────────────────────────────────────────────────────────
 *  Mode delta description types (builder metadata; real behavior lives in CSS)
 *  ────────────────────────────────────────────────────────────────────────── */

/** Minimal description of CSS variable changes for a given mode delta. */
export type CSSVarMap = Record<string, string | number>;

export interface TokenDelta {
  /**
   * Map of CSS custom properties to set on :root (html) when the mode is active.
   * Example: { '--radius-interactive': '0.625rem', '--focus-ring': 'oklch(70% 0.2 230)' }
   */
  vars?: CSSVarMap;

  /** Optional note for docs; not used at runtime. */
  note?: string;
}

/**
 * Non-token adjustments that are still tiny/scoped (selectors you’ll target in modes.css).
 * This type is intentionally light; real CSS lives in `modes.css`.
 */
export interface UtilityDelta {
  /** Optional list of selector hooks you plan to affect in CSS (for docs/reference). */
  selectors?: string[];
  /** Optional note for docs; not used at runtime. */
  note?: string;
}

/**
 * A registry of deltas the theme can expose per mode bucket.
 * Each entry represents a tiny, scoped override (variables/utilities) for that mode.
 */
export interface ModeDeltas {
  // Visual accessibility
  vision?: Partial<Record<Exclude<Vision, 'none'>, TokenDelta>>;

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
   * Reading: typescale is scalar (runtime via setTheme -> --typeset-scale);
   * dyslexia/plain can have token & utility tweaks.
   */
  reading?: {
    dyslexia?: TokenDelta & UtilityDelta;
    plain?: UtilityDelta;
  };

  // Motion & focus
  motion?: {
    reduced?: UtilityDelta;
    off?: UtilityDelta;
  };
  focus?: UtilityDelta;

  // UI complexity & motor
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

  // Language & layout
  rtl?: UtilityDelta;

  // Developer & debug
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
 *  ThemeConfig (used by build scripts + theme generator UI)
 *  ────────────────────────────────────────────────────────────────────────── */

export interface ThemeConfig {
  /** e.g., 'clothesline' */
  name: string;

  /**
   * Source-of-truth OKLCH seeds used to generate ramps.
   * Optional but preferred over `roles`.
   */
  seeds?: Partial<Record<SemanticColorRole, OklchSeed | OklchSeedPair>>;

  /**
   * Legacy/alternate palette inputs used to generate ramps/tokens.
   * Keep optional if you’re migrating fully to `seeds`.
   */
  roles?: Partial<Record<SemanticColorRole, RoleConfig>>;

  /** Stackable modes: presets, deltas (tiny overrides), and defaults */
  modes?: {
    presets?: ModePresets;
    deltas?: ModeDeltas;
    defaults?: ModeDefaults;
  };
}




