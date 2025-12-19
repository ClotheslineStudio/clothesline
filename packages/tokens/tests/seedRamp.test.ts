import { describe, it, expect } from 'vitest';
import {
  colorShades,
  generateColorRampFromSeed
} from '../dist/colors/index.js';

describe('generateColorRampFromSeed (gamut-safe)', () => {
  it('returns an OKLCH string for every step', () => {
    // Use an intentionally vivid seed to exercise gamut snapping
    const ramp = generateColorRampFromSeed({
      mode: 'oklch',
      l: 0.64,
      c: 0.5,   // high chroma -> forces snapping
      h: 145
    });
    for (const step of colorShades) {
      const val = ramp[step];
      expect(typeof val).toBe('string');
      expect(val.startsWith('oklch(')).toBe(true);
      expect(val.includes('deg')).toBe(true);
      expect(val.includes('NaN')).toBe(false);
    }
  });
});
