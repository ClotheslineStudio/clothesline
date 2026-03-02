---
title: Theme Token Reference
section: Theming
sectionOrder: 2
subsection: Semantic token wiring
order: 1
icon: Layers
description: How icon-app surfaces map to generated semantic and theme tokens.
lastUpdated: 2026-03-02
---

# Theme Token Reference

This page describes how the icon app consumes generated theme token CSS.

:::info
Theme switching should update semantic aliases first, then component-level surfaces and interactive colors.
:::

## Token files

Core generated CSS files:

- `packages/themes/dist/css/semantic.css`
- `packages/themes/dist/css/semantic-colors.css`
- `packages/themes/dist/css/modes.css`
- `packages/themes/dist/css/themes/*.css`

## Surface mapping

Use semantic surface variables for layout shells and cards:

- Page/background: `--surface-bg`
- Panel/card: `--surface-panel` and `--fill-surface`
- Borders: `--border-color-default` and `--border-color-strong`

### Interactive mapping

Use semantic interaction variables:

- Primary button and active states: `--color-primary-500-vis`
- Focus ring: `--focus-ring-color`
- Hover fills: `--opacity-interactive-hover`

:::details Why semantic tokens instead of theme-specific ones?
Semantic tokens let components stay stable while themes swap underneath.  
Components reference intent (`primary`, `surface`, `muted`) instead of a specific palette value.
:::

## Docs theming checklist

1. Sidebar text remains readable in light and dark mode.
2. Active nav and TOC highlight use primary semantic color.
3. Code blocks use panel surfaces and readable contrast.
4. Callouts inherit info/success/warning semantic palettes.
5. Borders and dividers remain visible without harsh contrast.

:::success
If this checklist passes on `Clothesline`, `Big Sky`, and `Night Market`, token wiring is usually correct.
:::
