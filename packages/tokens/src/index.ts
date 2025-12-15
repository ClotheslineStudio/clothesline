/**
 * index.ts
 * Master export of all design tokens for the Clothesline system.
 * Combines all primitives + semantic tokens + component-level tokens.
 */

/* ---------------------------------------------
   PRIMITIVE TOKENS
---------------------------------------------- */
import { backgroundTokens } from './backgrounds/backgrounds.ts';
import { borderTokens } from './borders/borders.ts';
import { radiusTokens } from './radius/radius.ts';
import { scalingTokens } from './scaling/scaling.ts';
import { spacingTokens } from './spacing/spacing.ts';
import { typographyTokens } from './typography/typography.ts';
import { sizeTokens } from './sizes/sizes.ts';
import { opacityTokens } from './primitives/opacity.ts';
import { zIndexTokens } from './primitives/z-index.ts';

// Named exports for primitives
export { backgroundTokens } from './backgrounds/backgrounds.ts';
export { borderTokens } from './borders/borders.ts';
export { radiusTokens } from './radius/radius.ts';
export { scalingTokens } from './scaling/scaling.ts';
export { spacingTokens } from './spacing/spacing.ts';
export { typographyTokens } from './typography/typography.ts';
export { sizeTokens } from './sizes/sizes.ts';
export { opacityTokens } from './primitives/opacity.ts';
export { zIndexTokens } from './primitives/z-index.ts';

/* ---------------------------------------------
   SEMANTIC TOKENS
---------------------------------------------- */
import { textTokens } from './text/text.ts';
import { linkTokens } from './link/link.ts';
import { semanticColorTokens } from './colors/semantic.ts';

export { textTokens } from './text/text.ts';
export { linkTokens } from './link/link.ts';
export { semanticColorTokens } from './colors/semantic.ts';


/* ---------------------------------------------
   COMPONENT TOKENS
---------------------------------------------- */
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
import { alertTokens } from './components/alert.ts';
import { progressTokens } from './components/progress.ts';
import { spinnerTokens } from './components/spinner.ts';
import { toastTokens } from './components/toast.ts';
import { timelineTokens } from './components/timeline.ts';
import { switchTokens } from './components/switch.ts';
import { iconTokens } from './components/icons.ts';
import { focusTokens } from './focus/focus.ts';
import { borderStyleTokens } from './borders/border-styles.ts';
import { focusStyleTokens } from './focus/focus-styles.ts';


// Named exports for components
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
export { alertTokens } from './components/alert.ts';
export { progressTokens } from './components/progress.ts';
export { spinnerTokens } from './components/spinner.ts';
export { toastTokens } from './components/toast.ts';
export { timelineTokens } from './components/timeline.ts';
export { switchTokens } from './components/switch.ts';
export { iconTokens } from './components/icons.ts';
export { focusTokens } from './focus/focus.ts';
export { borderStyleTokens } from './borders/border-styles.ts';
export { focusStyleTokens } from './focus/focus-styles.ts';


/* ---------------------------------------------
   BASE TOKENS (for theme builder)
   IMPORTANT: baseTokens should be CSS-ready style tokens only.
   Do NOT spread { scale, semantic } packs here.
---------------------------------------------- */
export const baseTokens = {
  // style-level tokens
  ...borderStyleTokens,
  ...focusStyleTokens,

  // ✅ backgrounds are CSS-ready style tokens too
  ...backgroundTokens,

  // semantic style tokens
  ...textTokens,
  ...linkTokens,

  // components
  ...avatarTokens,
  ...buttonTokens,
  ...dividerTokens,
  ...cardTokens,
  ...sidebarTokens,
  ...componentPreviewTokens,
  ...tooltipTokens,
  ...dropdownTokens,
  ...popoverTokens,
  ...datepickerTokens,
  ...alertTokens,
  ...progressTokens,
  ...spinnerTokens,
  ...toastTokens,
  ...timelineTokens,
  ...switchTokens,
  ...iconTokens
};



