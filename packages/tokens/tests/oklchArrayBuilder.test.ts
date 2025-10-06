import { describe, it, expect } from 'vitest';
import { generateOklchRamp } from '../dist/colors/index.js';

describe('generateOklchRamp (array builder, no gamut)', () => {
  it('returns 11 items', () => {
    const arr = generateOklchRamp(145, 0.12);
    expect(arr).toHaveLength(11);
    expect(arr[0].startsWith('oklch(')).toBe(true);
  });
});
