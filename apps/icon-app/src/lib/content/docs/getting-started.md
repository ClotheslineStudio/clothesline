---
title: Getting Started
section: Get Started
sectionOrder: 1
subsection: Quickstart setup
order: 1
icon: Home
description: Run the icon app, understand layout, and start customizing quickly.
lastUpdated: 2026-03-02
---

# Getting Started

Use this guide to run the icon app and understand the core layout.

:::success
If this is your first time in the monorepo, run `pnpm install` at the repository root before launching the app.
:::

## Run the app

From the repo root:

```bash
pnpm --filter icon-app dev
```

Then open the local URL from Vite in your browser.

:::details Troubleshooting startup
- If port `5173` is already in use, Vite will pick the next available port.
- If icons do not render, verify the build output for `@clothesline/icons` exists.
- If theme variables look missing, ensure `packages/themes/dist/css` is available in the app import path.
:::

## App layout

The app has three major sections:

- `Customizer` on the left for rendering controls
- `Icon Explorer` in the center for browsing/search
- `Icon Detail` modal for copy/export workflows

### Style filtering

The style buttons in the customizer filter the explorer list to icons that support the selected variant.

### Detail modal controls

The detail modal has its own customizer state so edits there do not mutate the entire grid behind it.

### Keyboard and accessibility

- `Escape` closes the detail modal.
- Focus stays trapped in the modal while it is open.
- Focus returns to the previously selected icon card when the modal closes.

## Theme controls

The header includes:

- Light/dark mode toggle
- Theme picker
- `Apps` dropdown links to related development apps

:::note
The docs pages are markdown-driven and rendered with a custom parser, including callouts and collapsible details blocks.
:::

## Quick verification flow

1. Open the grid and switch between `Stroke`, `Filled`, and `Duotone`.
2. Open an icon detail modal and change `size` and `strokeWidth`.
3. Click `Copy SVG` and `Copy Svelte`, then paste into a scratch file.
4. Switch theme and mode, then confirm docs/app colors update via semantic tokens.

### Useful links

- [Customizer reference](/docs/customizer-reference)
- [Theme token reference](/docs/theme-token-reference)
