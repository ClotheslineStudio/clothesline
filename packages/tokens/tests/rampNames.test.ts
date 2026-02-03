import { describe, it, expect } from 'vitest';
import { colorShades } from '../dist/colors/index.js';

describe('rampNames (canonical shade labels)', () => {
  it('matches exactly 50..950 and length 11', () => {
    expect(colorShades).toEqual([50,100,200,300,400,500,600,700,800,900,950]);
    expect(colorShades).toHaveLength(11);
  });
});