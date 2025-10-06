// packages/tokens/colors/index.ts

// Use ".js" in import specifiers to match your ESM output from tsup.
import { generateOklchRamp } from './oklch.js';

// Re-export the proven, gamut-safe seed → ramp builder (no behavior change).
// ✅ keep the gamut-safe builder
export { generateRampFromSeed as generateColorRampFromSeed } from '../utils/generateRamps.js';

// ✅ re-export the *canonical* labels from oklch.ts
export { rampNames } from './oklch.js';

// ✅ keep type-only re-export
export type { Step } from '../utils/generateRamps.js';


export { rampFormatsFromSeed } from '../utils/emitFormats.js';

// ---- Default roles + options -------------------------------------------------

export const roleHues = {
  primary:   260, // purple
  secondary: 220, // blue
  tertiary:  180, // teal
  success:   145, // green
  warning:    75, // yellow
  error:      25, // red
  info:      200, // light blue
  accent:    310, // pink
  neutral:   270, // gray-violet
  surface:     0, // grayscale
} as const;

export type ColorRole = keyof typeof roleHues;

export const chromaDefaults: Partial<Record<ColorRole, number>> = {
  surface: 0.01,
  neutral: 0.03,
} as const;

export const DEFAULT_CHROMA = 0.09 as const;

// Convenience arrays/types
export const colorRoles = Object.keys(roleHues) as ColorRole[];

// Local alias for the shared ramp steps tuple (same as utils.RAMP_STEPS)
import { RAMP_STEPS as TOKEN_SHADES } from '../utils/generateRamps.js';
export const colorShades = TOKEN_SHADES;
export type ColorShade = typeof colorShades[number];

// ---- Pure builder (on-demand generation) -------------------------------------

/**
 * Build a full set of ramps (50..950) for all roles using hue/chroma defaults.
 * NOTE: No gamut logic here — gamut clamping lives in utils/generateRamps.ts.
 */
export function buildColorRamps(options?: {
  hues?: Partial<Record<ColorRole, number>>;
  chroma?: Partial<Record<ColorRole, number>>;
  lightenBoost?: Partial<Record<ColorRole, number>>;
}): Record<ColorRole, string[]> {
  const hues = { ...roleHues, ...(options?.hues ?? {}) };
  const chromaVals = { ...chromaDefaults, ...(options?.chroma ?? {}) };

  const ramps = {} as Record<ColorRole, string[]>;
  (Object.keys(hues) as ColorRole[]).forEach((role) => {
    const c  = chromaVals[role] ?? DEFAULT_CHROMA;
    const lb = options?.lightenBoost?.[role] ?? 0;
    ramps[role] = generateOklchRamp(hues[role], c, lb);
  });
  return ramps;
}

// Keep exporting the hue/chroma generator for power users
export { generateOklchRamp } from './oklch.js';

// Optional: a prebuilt default set (no side effects besides creating data)
export const defaultRamps = buildColorRamps();


