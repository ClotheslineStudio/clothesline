/**
 * Layout container tokens for the Clothesline UI system.
 * containerScale: atomic values (raw)
 * containerSemantic: usage-based mapping for the active max container
 *
 * Start small:
 * - --layout-container-(xs..3xl)  → scale
 * - --layout-container-max        → semantic "current selection"
 */

export type LayoutContainerScaleKey =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export const layoutContainerScale: Record<LayoutContainerScaleKey, string> = {
  xs: '20rem',  // 320px  - small forms, auth
  sm: '32rem',  // 512px  - narrow pages
  md: '48rem',  // 768px  - settings/docs narrow
  lg: '64rem',  // 1024px - standard content
  xl: '72rem',  // 1152px - wide content
  '2xl': '80rem', // 1280px - large screens
  '3xl': '90rem', // 1440px - very wide dashboards
};

export type LayoutContainerSemanticKey = 'max';

/**
 * Semantic mapping:
 * - max = the "active" container max width selection
 *
 * Default: xl (you can change later without touching the scale).
 */
export const layoutContainerSemantic: Record<
  LayoutContainerSemanticKey,
  LayoutContainerScaleKey
> = {
  max: 'xl',
};

export const layoutTokens = {
  scale: layoutContainerScale,
  semantic: layoutContainerSemantic,
};
