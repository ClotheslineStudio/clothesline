/**
 * Scaling tokens for the Clothesline UI system.
 *
 * These control:
 * - text scaling
 * - overall UI and icon scaling
 * - density (compact vs spacious)
 * - motion preferences (duration, easing)
 * - component-level multipliers for touch / focus / control height
 *
 * All values here are raw; the build step is responsible for turning
 * them into CSS custom properties like:
 *
 *   --text-scaling
 *   --ui-scaling
 *   --icon-scaling
 *   --density-scaling
 *   --scaling-xs / --scaling-md / ...
 *   --motion-duration-fast / --motion-ease
 *   --tap-target-scale / --control-height-multiplier
 */

/** Base scaling multipliers */
export type ScalingBaseKey =
  | 'text'
  | 'ui'
  | 'icon'
  | 'density';

export const scalingBase: Record<ScalingBaseKey, string> = {
  text: '1.067',  // modular type scale (major second)
  ui: '1',        // base UI scale
  icon: '1',      // icon scaling
  density: '1',   // 0.9 = compact, 1.1 = spacious
};

/** Semantic preset tiers */
export type ScalingPresetKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export const scalingPresets: Record<ScalingPresetKey, string> = {
  xs: '0.875', // extra small / dense
  sm: '0.95',
  md: '1',     // default
  lg: '1.1',
  xl: '1.25',  // accessible / touch-friendly
};

/** Motion scale + durations + easing */
export type MotionDurationKey = 'fast' | 'base' | 'slow';

export const motionScale = '1'; // 0 = reduced motion, 1 = normal

export const motionDurations: Record<MotionDurationKey, string> = {
  fast: '150ms',
  base: '250ms',
  slow: '400ms',
};

export const motionEase = 'ease-in-out';

/** Component-level scaling hooks */
export type ComponentScalingKey =
  | 'tapTarget'
  | 'focusRing'
  | 'controlHeight';

export const componentScaling: Record<ComponentScalingKey, string> = {
  tapTarget: '1.25',   // increase padding for touch devices
  focusRing: '1',      // ring size adjustment
  controlHeight: '1',  // input/button height multiplier
};

/** Combined export if something expects a single object */
export const scalingTokens = {
  base: scalingBase,
  presets: scalingPresets,
  motion: {
    scale: motionScale,
    durations: motionDurations,
    ease: motionEase,
  },
  components: componentScaling,
};

