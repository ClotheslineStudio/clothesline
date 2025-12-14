/**
 * Focus tokens (Clothesline UI)
 *
 * Split into:
 * - focusScale: raw sizes for focus indicators (width/offset/outline)
 * - focusSemantic: intent-based aliases referencing focusScale
 *
 * Rules:
 * - No var() usage in primitives (focusScale).
 * - Semantic values must reference a focusScale key.
 * - Semantic keys are kebab-case to match emitted CSS.
 * - Colors/effects (glow) live in focus-styles.ts, not here.
 */

export type FocusScaleKey =
  // ring / outline thickness
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  // offsets / gaps
  | 'offset-0'
  | 'offset-1'
  | 'offset-2'
  | 'offset-3'
  | 'offset-4';

export const focusScale: Record<FocusScaleKey, string> = {
  // thickness
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '3': '3px',
  '4': '4px',

  // offset distances (gap between element edge and focus indicator)
  'offset-0': '0px',
  'offset-1': '1px',
  'offset-2': '2px',
  'offset-3': '3px',
  'offset-4': '4px'
};

export type FocusSemanticKey =
  // defaults
  | 'focus-width'
  | 'focus-offset'
  // usage-based
  | 'focus-width-subtle'
  | 'focus-width-strong'
  | 'focus-offset-tight'
  | 'focus-offset-comfy';

export const focusSemantic: Record<FocusSemanticKey, FocusScaleKey> = {
  // defaults (designer-friendly)
  'focus-width': '2',
  'focus-offset': '2',

  // usage-based
  'focus-width-subtle': '1',
  'focus-width-strong': '3',

  'focus-offset-tight': '1',
  'focus-offset-comfy': '3'
};

export const focusTokens = {
  scale: focusScale,
  semantic: focusSemantic
};
