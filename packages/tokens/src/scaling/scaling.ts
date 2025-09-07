/**
 * Scaling tokens for the Clothesline UI system.
 * Controls text scaling, component density, motion preferences,
 * and system-wide responsiveness. Enables user preferences and
 * accessible themes (e.g. large UI, reduced motion).
 */

export const scalingTokens = {
  // Base scaling values
  '--text-scaling': '1.067',         // Modular type scale multiplier (major second)
  '--ui-scaling': '1',               // Base multiplier for sizing UI elements
  '--icon-scaling': '1',             // Adjusts icon size for compact or large modes
  '--density-scaling': '1',          // 0.9 = compact, 1.1 = spacious

  // Semantic scaling tiers (can be used as presets)
  '--scaling-xs': '0.875',           // Extra small / dense
  '--scaling-sm': '0.95',
  '--scaling-md': '1',               // Default
  '--scaling-lg': '1.1',
  '--scaling-xl': '1.25',            // Accessible / touch-friendly

  // Motion & accessibility controls
  '--motion-scale': '1',             // 0 = reduced motion
  '--motion-duration-fast': '150ms',
  '--motion-duration-base': '250ms',
  '--motion-duration-slow': '400ms',
  '--motion-ease': 'ease-in-out',

  // Semantic hooks for components
  '--tap-target-scale': '1.25',      // Used to increase padding for touch devices
  '--focus-ring-scale': '1',         // Adjust ring size for zoom/vision needs
  '--control-height-multiplier': '1',// Used to adapt input/button height system-wide
};
