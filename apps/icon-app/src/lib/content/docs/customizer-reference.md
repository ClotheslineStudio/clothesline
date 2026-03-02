---
title: Customizer Reference
section: Get Started
sectionOrder: 1
subsection: Styling and color controls
order: 2
icon: Settings
description: Detailed reference for style, color, stroke, size, and duotone behavior.
lastUpdated: 2026-03-02
---

# Customizer Reference

This page documents the icon rendering controls available in the customizer.

:::info
Use **Style** first, then tune size and stroke settings. Controls update icon rendering immediately.
:::

## Style

Choose one icon variant:

- `stroke`
- `filled`
- `duotone`
- `animated` (displayed but currently filtered out of the main grid)

Styles without support for the selected icon are disabled in detail mode.

:::warning
Not every icon supports every variant. Disabled buttons indicate missing source variants and should not be forced active.
:::

## Colors

Primary and secondary colors are available by variant:

- Stroke and filled use `primaryColor`
- Duotone uses both `primaryColor` and `secondaryColor`

### Color picker modes

The color picker supports:

- OKLCH
- HSL
- RGB
- HEX

Each mode updates the same active color value.

:::details Why is Tokens disabled?
`TOKENS` is reserved for theme-system integration. It will map to semantic token names
instead of raw color values, so icon styles can stay in sync with active app themes.
:::

### Secondary color behavior

- `Stroke` and `Filled` use `primaryColor`.
- `Duotone` uses both `primaryColor` and `secondaryColor`.
- `secondaryColor` can be initialized from theme accent/secondary semantic tokens.

### Color value formatting

```ts
// Copy Svelte output should reflect current controls
<Folder
  size={32}
  strokeWidth={2}
  absoluteStrokeWidth={false}
  variant="duotone"
  primaryColor="#00A6FF"
  secondaryColor="#A6CAE0"
/>
```

## Stroke width

`strokeWidth` controls line thickness for variants that use strokes.

:::details Stroke width notes
- With `absoluteStrokeWidth=true`, stroke width remains visually stable as size changes.
- With `absoluteStrokeWidth=false`, stroke width scales with icon size.
:::

## Size

`size` controls icon render size in preview and in the generated Svelte usage snippet.

## Absolute stroke width

When enabled, stroke width scales independently from icon size (using the icon component prop `absoluteStrokeWidth`).

## Copy actions

- `Copy SVG` copies the current rendered variant markup.
- `Copy Svelte` copies a usage snippet for `@clothesline/icons`.
- Both buttons provide temporary success feedback.
