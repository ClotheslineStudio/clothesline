// packages/tokens/colors/index.ts
// Clean re-export layer for color utilities and ramp names.
// No default ramps, no role hues.

export { generateRampFromSeed as generateColorRampFromSeed } from '../utils/generateRamps.js';
export { rampNames as colorShades } from './oklch.js';
export type { Step as ColorShade } from '../utils/generateRamps.js';


