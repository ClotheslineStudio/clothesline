# Component Library Status

Updated: 2026-03-05

## Built

- New dedicated docs app: `apps/component-library`
- Icon-app based shell and theme wiring (`@clothesline/themes` + Tailwind v4 sources)
- Docs layout:
  - top header
  - left sidebar section nav
  - main docs content
  - right TOC on desktop
- Data-driven docs registry and dynamic routing:
  - `src/lib/docs/registry.ts`
  - `/components/[slug]` pages
- Shared preview pattern:
  - `ComponentPreview.svelte`
  - live preview + code snippet + copy
- Expanded component docs coverage with live demos:
  - Core: Button, Card, Badge
  - Layout: Container, Stack, Grid
  - Forms: Input, Textarea, Fieldset
  - Feedback: Alert, Spinner, Progress, Skeleton
  - Navigation: Tabs
  - Data: Table, CodeBlock
  - Overlay: Dialog, Popover
- Alignment and surface cleanup:
  - header/content alignment normalized to icon-app page width + gutters
  - sidebar/main/toc panel backgrounds removed where requested

## How To Run

1. `pnpm install --no-frozen-lockfile`
2. `pnpm --filter component-library run dev`
3. Open the app URL shown by Vite (typically `http://localhost:5173` or next available port)

## Verification

- `pnpm --filter component-library run build` passes.

## Next

- Add docs entries for remaining exported components (Link, Breadcrumbs, Pagination, Tooltip, ToastHost, Theme/Mode toggles).
- Improve overlay a11y behaviors (focus trap and keyboard nav depth).
- Add docs search and component filtering.
- Add screenshot/regression tests for docs page layout and previews.
