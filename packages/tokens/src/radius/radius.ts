/**
 * Border radius tokens for the Clothesline UI system.
 * radiusScale: atomic values (raw)
 * radiusSemantic: usage-based mappings (names → scale keys)
 */

export type RadiusScaleKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '6'
  | '8'
  | '12'
  | 'full';

export const radiusScale: Record<RadiusScaleKey, string> = {
  '0': '0rem',
  '1': '0.125rem',   // 2px
  '2': '0.25rem',    // 4px
  '3': '0.375rem',   // 6px
  '4': '0.5rem',     // 8px
  '6': '0.75rem',    // 12px
  '8': '1rem',       // 16px
  '12': '1.5rem',    // 24px
  'full': '9999rem'  // pill / circle
};

export type RadiusSemanticKey =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
  | 'base'
  | 'container'
  | 'interactive'
  | 'avatar'
  | 'badge'
  | 'card'
  | 'tooltip'
  | 'focus-ring'
  | 'touch-target';

export const radiusSemantic: Record<RadiusSemanticKey, RadiusScaleKey> = {
  // general scale
  sm: '2',        // 4px
  md: '4',        // 8px
  lg: '6',        // 12px
  xl: '8',        // 16px
  full: 'full',

  // usage based
  base: '4',        // default rounding
  container: '6',   // modals, surfaces
  interactive: '3', // buttons, inputs
  avatar: 'full',
  badge: 'full',
  card: '6',
  tooltip: '2',

  // accessibility
  'focus-ring': '1',     // 2px → good for outlines
  'touch-target': '8'    // larger rounding for big tap areas
};

export const radiusTokens = {
  scale: radiusScale,
  semantic: radiusSemantic,
};


