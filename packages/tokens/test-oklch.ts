import { generateOklchRamp } from './colors/oklch.js';

const ramp = generateOklchRamp(145); // Green

console.log('🎨 Primary ramp (hue 260):');
ramp.forEach((color: string, i: number) => {
  console.log(`  ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][i]} → ${color}`);
});