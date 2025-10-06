import { toSrgbGamut, toP3Gamut, toOklch } from './colorEngine.js';
import type { OklchColor } from './colorEngine.js';

export type Gamut = 'srgb' | 'p3';

export function snapToGamut(color: OklchColor | string, gamut: Gamut = 'srgb'): OklchColor {
  const mapped = gamut === 'p3' ? toP3Gamut(color) : toSrgbGamut(color);
  // Convert back to OKLCH for the rest of our pipeline
  return toOklch(mapped) as OklchColor;
}











