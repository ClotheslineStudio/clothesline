// packages/tokens/utils/generateRamps.ts
import { snapToGamut } from './snapToGamut.js';
import type { OklchColor } from './colorEngine.js';
import { toOklchCss } from './toCssColor.js';

// Canonical step labels from the OKLCH ramp
import { rampNames } from '../colors/oklch.js';
export { rampNames as RAMP_STEPS } from '../colors/oklch.js';
export type Step = (typeof rampNames)[number];

/* ================================
   Lightness plans (near-white tops)
   ================================ */

// Base/neutral lightness ladder (brighter 50/100 than before)
const L_PLAN: Record<Step, number> = {
  50: 0.985, 100: 0.960, 200: 0.900, 300: 0.800, 400: 0.720,
  500: 0.640, 600: 0.560, 700: 0.480, 800: 0.400, 900: 0.320, 950: 0.260
};

// Surface gets an even brighter top for ultra-clean canvas
const L_PLAN_SURFACE: Record<Step, number> = {
  ...L_PLAN, 50: 0.992, 100: 0.968
};

/* =========================================
   Chroma shapes (punchy for chromatic roles)
   ========================================= */

// Punchier chroma curve (peaks ~0.18)
const C_SHAPE_PUNCH: Record<Step, number> = {
  50: 0.050, 100: 0.060, 200: 0.080, 300: 0.100, 400: 0.130,
  500: 0.180, 600: 0.180, 700: 0.140, 800: 0.110, 900: 0.080, 950: 0.060
};

// Neutral caps: distinct from surface, barely tinted, never warm/muddy
const C_CAPS_NEUTRAL: Record<Step, number> = {
  50: 0.000, 100: 0.000, 200: 0.003, 300: 0.006, 400: 0.008,
  500: 0.012, 600: 0.012, 700: 0.010, 800: 0.008, 900: 0.006, 950: 0.006
};

/* ====================================
   Family detection (no role parameter)
   ====================================

   We infer the intent from the seed chroma:
   - surface: c≈0 → pure achromatic
   - neutral: 0 < c < 0.03 → tiny-capped cool-ish gray
   - chromatic: otherwise → punchy shape
*/
const NEAR_ZERO = 0.0005;
const NEUTRAL_THRESHOLD = 0.03;

/* ============================================================
   Public API — same signature as before (seed → ramp strings)
   ============================================================ */
export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const c = Math.max(0, seed.c ?? 0);

  if (c <= NEAR_ZERO) {
    // SURFACE: achromatic, ultra-bright 50/100, hue irrelevant
    return buildRamp({
      lPlan: L_PLAN_SURFACE,
      cForStep: () => 0
    });
  }

  if (c < NEUTRAL_THRESHOLD) {
    // NEUTRAL: tiny capped chroma (distinct from surface), keep seed hue
    const h = seed.h ?? 255; // if missing, bias cool
    return buildRamp({
      lPlan: L_PLAN,
      cForStep: (step) => Math.min(c, C_CAPS_NEUTRAL[step]),
      h
    });
  }

  // CHROMATIC: punchy curve, keep seed hue
  const h = seed.h ?? 0;
  return buildRamp({
    lPlan: L_PLAN,
    cForStep: (step) => C_SHAPE_PUNCH[step],
    h
  });
}

/* ======================
   Internal ramp builder
   ====================== */
function buildRamp({
  lPlan,
  cForStep,
  h
}: {
  lPlan: Record<Step, number>;
  cForStep: (step: Step) => number;
  h?: number;
}): Record<Step, string> {
  const out = {} as Record<Step, string>;
  for (const step of rampNames) {
    const L = lPlan[step];
    const C = Math.max(0, cForStep(step));
    const candidate: OklchColor = { mode: 'oklch', l: L, c: C, h };
    // Keep results display-safe
    out[step] = toOklchCss(snapToGamut(candidate, 'srgb'));
  }
  return out;
}

// Back-compat alias
export const generateColorRamps = generateRampFromSeed;




