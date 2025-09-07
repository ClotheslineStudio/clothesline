// Step tokens: 50 → 950
export const rampSteps = [97.5, 95, 90, 82, 70, 55, 45, 35, 25, 15, 7];

// Step names (for CSS output)
export const rampNames = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * Generate a color ramp in OKLCH space.
 * @param hue - The hue in degrees (0–360)
 * @param chroma - The chroma (0 = grayscale, 0.1 = vivid)
 * @param lightenBoost - Optional lightness offset
 */
export function generateOklchRamp(
	hue: number,
	chroma: number = 0.09,
	lightenBoost: number = 0
): string[] {
	return rampSteps.map((lightness) => {
		const l = Math.min(100, lightness + lightenBoost);
		return `oklch(${l}% ${chroma} ${hue}deg)`;
	});
}