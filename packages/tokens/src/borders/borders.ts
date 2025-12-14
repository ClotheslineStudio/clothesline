/**
 * Border width tokens for the Clothesline UI system.
 *
 * Contract:
 * - borderScale: raw widths only (no var(), no colors)
 * - borderSemantic: intent aliases mapping to borderScale keys
 * - All semantic keys are kebab-case and emitted as CSS vars via the build step
 *
 * Emits (examples):
 *   --border-1: 1px;
 *   --border-width-default: var(--border-1);
 *   --border-width-strong: var(--border-2);
 */

export type BorderScaleKey = '0' | '1' | '2' | '4';

export const borderScale: Record<BorderScaleKey, string> = {
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px'
};

/**
 * Semantic aliases for border *widths*.
 * These are geometry-only (still no colors).
 */
export type BorderSemanticKey =
  | 'border-width-default'
  | 'border-width-divider'
  | 'border-width-subtle'
  | 'border-width-strong'
  | 'border-width-accent'
  | 'border-width-interactive'
  | 'border-width-card'
  | 'border-width-emphasis'
 

export const borderSemantic: Record<BorderSemanticKey, BorderScaleKey> = {
  // system defaults
  'border-width-default': '1',
  'border-width-divider': '1',

  // intent tiers
  'border-width-subtle': '1',
  'border-width-strong': '2',
  'border-width-emphasis': '4',

  // usage hints (still just widths)
  'border-width-interactive': '1',
  'border-width-card': '1',
  'border-width-accent': '2',

 
};

export const borderTokens = {
  scale: borderScale,
  semantic: borderSemantic
};



