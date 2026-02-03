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
 *  Values / maps used by builders
 *  ────────────────────────────────────────────────────────────────────────── */

export type CSSVarValue = string | number;

/**
 * Skeleton-style “single selector” theme output pattern:
 * - light value is written to `--token`
 * - dark value is written to `--token-dark`
 *
 * Example:
 * { light: 'var(--color-surface-950)', dark: 'var(--color-surface-50)' }
 * => --base-font-color: var(--color-surface-950);
 * => --base-font-color-dark: var(--color-surface-50);
 */
export type DualModeValue<T extends CSSVarValue = CSSVarValue> = {
  light: T;
  dark: T;
};

export type ThemeVarValue<T extends CSSVarValue = CSSVarValue> = T | DualModeValue<T>;

/** CSS custom properties map (must be written as `--foo`). */
export type ThemeVarMap = Record<`--${string}`, ThemeVarValue>;

/** ──────────────────────────────────────────────────────────────────────────
 *  Foundation config — to generate “non-color” theme vars in the single theme file
 *  (spacing, radii, typography, base semantics, etc.)
 *  ────────────────────────────────────────────────────────────────────────── */

export interface FontBlock {
  color?: ThemeVarValue; // usually var(--color-surface-950) / var(--color-surface-50)
  family?: ThemeVarValue;
  size?: ThemeVarValue;
  lineHeight?: ThemeVarValue;
  weight?: ThemeVarValue;
  style?: ThemeVarValue;
  letterSpacing?: ThemeVarValue;
  transform?: ThemeVarValue;
}

export interface AnchorBlock extends FontBlock {
  textDecoration?: ThemeVarValue;
  textDecorationHover?: ThemeVarValue;
  textDecorationActive?: ThemeVarValue;
  textDecorationFocus?: ThemeVarValue;
}

export interface ThemeFoundationConfig {
  /**
   * Matches Skeleton’s `--text-scaling`.
   * You can also override via modes (typescale) at runtime if desired.
   */
  textScaling?: ThemeVarValue<number>;

  /** Base/root text tokens (Skeleton-style `--base-*`) */
  base?: FontBlock;

  /** Heading tokens (Skeleton-style `--heading-*`) */
  heading?: FontBlock;

  /** Anchor/link tokens (Skeleton-style `--anchor-*`) */
  anchor?: AnchorBlock;

  /**
   * A single spacing unit (Skeleton uses `--spacing: 0.25rem`).
   * You can still keep your detailed spacing scale elsewhere; this is the theme’s “unit.”
   */
  spacingUnit?: ThemeVarValue;

  /** Primary radii knobs (Skeleton uses base + container). */
  radii?: {
    base?: ThemeVarValue;
    container?: ThemeVarValue;
  };

  /** Global border/ring widths (Skeleton uses these defaults). */
  borders?: {
    defaultBorderWidth?: ThemeVarValue;
    defaultDivideWidth?: ThemeVarValue;
    defaultRingWidth?: ThemeVarValue;
  };

  /** Body/background semantic (Skeleton uses `--body-background-color` + `-dark`). */
  bodyBackgroundColor?: ThemeVarValue;

  /**
   * Escape hatch: additional theme-level vars to output into the *same selector*.
   * Prefer this over ad-hoc extra CSS files when you want a single theme file.
   */
  vars?: ThemeVarMap;
}

/** ──────────────────────────────────────────────────────────────────────────
 *  Mode delta description types (builder metadata; real behavior lives in CSS)
 *  ────────────────────────────────────────────────────────────────────────── */

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

export interface UtilityDelta {
  /** Optional list of selector hooks you plan to affect in CSS (for docs/reference). */
  selectors?: string[];
  /** Optional note for docs; not used at runtime. */
  note?: string;
}

export interface ModeDeltas {
  // Visual accessibility
  vision?: Partial<Record<Exclude<Vision, 'none'>, TokenDelta>>;

  contrast?: {
    normal?: TokenDelta;
    high?: TokenDelta;
    custom?: TokenDelta;
  };

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

export type ModePresets = Record<string, ModeState>;

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
   * Foundations: generates the “top” variables you see in Skeleton-like theme files:
   * spacing unit, radii knobs, typography, base/heading/link semantics, etc.
   */
  foundation?: ThemeFoundationConfig;

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

  /**
   * Escape hatch: additional variables to emit at the theme selector level.
   * If you use DualModeValue here, your builder should emit `-dark` suffixes.
   */
  vars?: ThemeVarMap;

  /** Stackable modes: presets, deltas (tiny overrides), and defaults */
  modes?: {
    presets?: ModePresets;
    deltas?: ModeDeltas;
    defaults?: ModeDefaults;
  };
}





