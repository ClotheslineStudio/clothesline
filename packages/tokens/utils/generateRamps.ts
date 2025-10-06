// packages/tokens/utils/generateRamps.ts
import { snapToGamut } from './snapToGamut.js';
import type { OklchColor } from './colorEngine.js';
import { toOklchCss } from './toCssColor.js'; // <- use .js here

export type Step = 50|100|200|300|400|500|600|700|800|900|950;

export function generateRampFromSeed(seed: OklchColor): Record<Step, string> {
  const plan: Array<[Step, number, number]> = [
    [50, 0.97, 0.04], [100, 0.94, 0.05], [200, 0.88, 0.06],
    [300, 0.80, 0.08], [400, 0.72, 0.10], [500, 0.64, 0.12],
    [600, 0.56, 0.12], [700, 0.48, 0.10], [800, 0.40, 0.08],
    [900, 0.32, 0.06], [950, 0.26, 0.05],
  ];
  const h = seed.h ?? 0;

  const out = {} as Record<Step, string>;
  for (const [step, L, C] of plan) {
    const candidate: OklchColor = { mode: 'oklch', l: L, c: C, h };
    out[step] = toOklchCss(snapToGamut(candidate, 'srgb'));
  }
  return out;
}

// Keep old name for anything already importing it:
export const generateColorRamps = generateRampFromSeed;


