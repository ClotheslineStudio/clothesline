import { describe, it, expect } from 'vitest';
import { generateColorRampFromSeed } from '../dist/colors/index.js';

describe('generateOklchRamp (array builder, no gamut)', () => {
  it('returns 11 items', () => {
    // Simulate a seed for the ramp
    const arrObj = generateColorRampFromSeed({ mode: 'oklch', l: 0.7, c: 0.12, h: 145 });
    const arr = Object.values(arrObj);
    expect(arr).toHaveLength(11);
    expect(arr[0].startsWith('oklch(')).toBe(true);
  });
});
