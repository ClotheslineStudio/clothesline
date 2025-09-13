/**
 * index.ts
 * Master export of all design tokens for the Clothesline system.
 * This file combines all token categories into a single object.
 */

// 🔁 Local imports so you can use the tokens in this file
import { backgroundTokens } from './backgrounds/backgrounds.ts';
import { borderTokens } from './borders/borders.ts';
import { radiusTokens } from './radius/radius.ts';
import { scalingTokens } from './scaling/scaling.ts';
import { spacingTokens } from './spacing/spacing.ts';
import { typographyTokens } from './typography/typography.ts';
import { avatarTokens } from './components/avatar.ts';
import { buttonTokens } from './components/button.ts';
import { dividerTokens } from './components/divider.ts';
import { cardTokens } from './components/card.ts';
import { sidebarTokens } from './components/sidebar.ts';
import { componentPreviewTokens } from './components/componentpreview.ts';
import { tooltipTokens } from './components/tooltip.ts';
import { dropdownTokens } from './components/dropdown.ts';
import { popoverTokens } from './components/popover.ts';
import { datepickerTokens } from './components/datepicker.ts';


// ✅ Named exports for others to import individually
export { backgroundTokens } from './backgrounds/backgrounds.ts';
export { borderTokens } from './borders/borders.ts';
export { radiusTokens } from './radius/radius.ts';
export { scalingTokens } from './scaling/scaling.ts';
export { spacingTokens } from './spacing/spacing.ts';
export { typographyTokens } from './typography/typography.ts';
export { avatarTokens } from './components/avatar.ts';
export { buttonTokens } from './components/button.ts';
export { dividerTokens } from './components/divider.ts';
export { cardTokens } from './components/card.ts';
export { sidebarTokens } from './components/sidebar.ts';
export { componentPreviewTokens } from './components/componentpreview.ts';
export { tooltipTokens } from './components/tooltip.ts';
export { dropdownTokens } from './components/dropdown.ts';
export { popoverTokens } from './components/popover.ts';
export { datepickerTokens } from './components/datepicker.ts';

// ✅ Grouped export for convenience
export const baseTokens = {
  ...backgroundTokens,
  ...borderTokens,
  ...radiusTokens,
  ...scalingTokens,
  ...spacingTokens,
  ...typographyTokens,
  ...avatarTokens,
  ...buttonTokens,
  ...dividerTokens,
  ...cardTokens,
  ...sidebarTokens,
  ...componentPreviewTokens,
  ...tooltipTokens,
  ...dropdownTokens,
  ...popoverTokens,
  ...datepickerTokens
};





