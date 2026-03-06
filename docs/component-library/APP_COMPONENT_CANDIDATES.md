# App Component Migration Candidates

Generated: 2026-03-05

## Scan Scope

Scanned `.svelte` components across:
- `apps/gravity`
- `apps/icon-app`
- `apps/playground`
- `apps/studio`
- `apps/theme-gen`
- `apps/theme-generator`

Ignored route files and app-specific page sections when they were not reusable UI primitives.

## High-Value Candidates Found

| Candidate | Source app path | Gap it maps to | Action |
|---|---|---|---|
| CodeBlock | `apps/theme-generator/src/lib/components/CodeBlock.svelte` | Data display: CodeBlock | Promoted to `@clothesline/ui` as `components/data/CodeBlock/CodeBlock.svelte` |
| Textarea | `apps/playground/src/lib/components/form/Textarea/Textarea.svelte` | Forms: Textarea | Promoted/adapted to `@clothesline/ui` as `components/form/Textarea/Textarea.svelte` |
| FormGroup pattern | `apps/playground/src/lib/components/form/FormGroup/FormGroup.svelte` | Forms: Field + HelpText/ErrorText | Split into `Field`, `HelpText`, `ErrorText` in `@clothesline/ui` |
| Navigation primitives already in UI source | `apps/playground/src/lib/components/navigation/*` mirrored under `packages/ui/src/components/navigation/*` | Navigation export gaps | Exposed via root exports (no copy needed) |
| Table + typography primitives already in UI source | mirrored equivalents in `packages/ui/src/components/data` + `typography` | Data/Core export gaps | Exposed via root exports (no copy needed) |

## Not Promoted (App-Specific)

| Component family | Reason |
|---|---|
| `apps/studio/src/lib/components/home/*` | Marketing/portfolio-specific composition, not generic kit primitives |
| `apps/gravity/src/lib/components/detail/*` | Domain-specific requirements UI |
| `apps/icon-app/src/lib/components/Icon*` layouts | Product-specific explorer patterns |
| `apps/theme-generator/src/lib/components/*` (aside from CodeBlock) | Theme-generator-specific shell/workflow components |

## Gaps Filled by This Pass

- `CodeBlock` added to UI kit and exported.
- `Textarea` added to UI kit and exported.
- `Field`, `HelpText`, `ErrorText` added to UI kit and exported.
- `Input` alias added in form exports (mapped to existing `TextField`).
- Existing but hidden primitives now publicly exported from root:
  - Typography: `Text`, `Heading`, `Paragraph`, `Label`
  - Navigation: `Link`, `Tabs`, `TableOfContents`, `Breadcrumbs`, `Pagination`
  - Data: `Table`

## Remaining Major Gaps (still open)

- Layout primitives: `Container`, `Stack`, `Grid`
- Overlay primitives: `Dialog`, `Popover/Menu`
- Feedback: `Skeleton`
- Forms: `Fieldset`
