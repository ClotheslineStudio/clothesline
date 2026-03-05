---
title: "Export Output"
section: "Theme Generator"
sectionOrder: 2
subsection: "CSS + TypeScript"
order: 1
icon: "File"
description: "Understand generated CSS structure and TypeScript portability snippet."
lastUpdated: "2026-03-04"
---

# Export Output

## CSS Output

The generated CSS follows the same high-level structure as Clothesline theme files (for example `bigsky.css`):

- `html[data-theme='your-theme']` selector
- Foundation variables block
- Color ramps per role and step
- `-ct` and `-vis` companion variables
- `@supports (color: oklch(from white l c h))` visibility remap block

## TypeScript Snippet

The **Code** tab also generates a portable snippet with:

- `name`
- `seeds`
- `roleOrder`
- background/spacing/edge/typography settings

Use this snippet as a reference when creating a reusable theme config.
