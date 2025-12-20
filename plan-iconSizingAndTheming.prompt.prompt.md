# Plan: Icon Sizing and Theming in About.svelte

## Problem
- The icons in the About.svelte component (Compass, Code, Layers) change size when switching themes.
- No explicit icon size token is defined in the current theme CSS (bigsky.css, retrograde.css, etc.).
- Icon size is currently set by class="h-6 w-6" (1.5rem), which is affected by the root font size or rem scaling in each theme.

## Theme Token Audit
- No --icon-size, --type-icon, or similar sizing tokens found in bigsky.css, retrograde.css, foundations.css, or components.css.
- Only color and stroke tokens for icons are defined (e.g., --icon, --icon-primary, --icon-stroke).
- The only relevant sizing tokens are for font/text, not icons.

## Visual Evidence
- Provided screenshots show icons are much larger in one theme (bigsky) than another (retrograde).
- This is likely due to rem or root font size scaling, not a direct icon token.

## Root Cause
- Icon size is indirectly controlled by rem/em scaling, not a dedicated icon size token.
- Theme CSS may set html { font-size: ... } or similar, affecting all rem-based sizing.

## Solution Options
1. **Explicit Sizing:**
   - Set icon size in px (e.g., style="width: 24px; height: 24px;") for About.svelte icons.
   - This will decouple icon size from theme font scaling.
2. **Introduce Icon Size Token:**
   - Add --icon-size (and variants) to theme/component tokens.
   - Use style="width: var(--icon-size); height: var(--icon-size);" in About.svelte.
   - Update all themes to define --icon-size for consistency.
3. **Document Current Behavior:**
   - Note that icon size is currently theme-dependent via rem scaling.
   - Accept this as a feature if desired.

## Recommendation
- For consistent icon sizing across themes, implement Option 2: introduce --icon-size in your theme/component tokens and use it in About.svelte.
- If you want icons to scale with text, keep current approach but document the dependency.

## Next Steps
- [ ] Decide if icon size should be theme-dependent or fixed.
- [ ] If fixed, add --icon-size to all theme CSS and update About.svelte to use it.
- [ ] If not, document the current scaling behavior for future reference.
