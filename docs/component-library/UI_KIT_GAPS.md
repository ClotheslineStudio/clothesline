# UI Kit Gaps and Priorities

Generated: 2026-03-05
Source inputs: `docs/component-library/UI_KIT_INVENTORY.md`, `docs/component-library/UI_KIT_EXPORT_MAP.md`, `packages/ui/src/index.ts`

## Progress Update (2026-03-05)

Completed in this branch:
- Promoted from apps and added to `@clothesline/ui`: `CodeBlock`, `Textarea`, `Field`, `HelpText`, `ErrorText`.
- Added missing baseline primitives: `Container`, `Stack`, `Grid`, `Fieldset`, `Skeleton`, `Dialog`, `Popover`.
- Exposed existing-but-unexported components in root exports: typography (`Text`, `Heading`, `Paragraph`, `Label`), navigation (`Link`, `Tabs`, `TableOfContents`, `Breadcrumbs`, `Pagination`), and `Table`.
- Added `Input` export alias to existing `TextField`.

Remaining high-priority gaps:
- Overlay/menu depth (`Dropdown`/Menu API parity and richer keyboard behaviors).
- Potential SideNav primitive standardization (currently can be app-level).

## Baseline Checklist Comparison

Status legend:
- `available`: publicly exported from `@clothesline/ui`
- `exists-unexported`: component file exists but not publicly exported from root package
- `missing`: not currently present in `packages/ui/src/components`

| Category | Baseline item | Status | Notes |
|---|---|---|---|
| Core | Button | available | `Button` exported |
| Core | Icon | available | `Icon` exported |
| Core | Text/Heading | exists-unexported | `Text`, `Heading`, `Paragraph` exist in `typography/` but not exported from root index |
| Core | Link | exists-unexported | `navigation/Link/Link.svelte` exists, not exported |
| Layout | Card | available | `Card` exported |
| Layout | Divider | available | `Divider` exported |
| Layout | Container | missing | No `Container` primitive found |
| Layout | Stack | missing | No `Stack` primitive found |
| Layout | Grid | missing | No `Grid` primitive found |
| Forms | Label | exists-unexported | `typography/Label/Label.svelte` exists, not exported |
| Forms | Input | partial | `TextField` exists/exported; naming and API not aligned to baseline `Input` |
| Forms | Textarea | missing | No `Textarea` component found |
| Forms | Select | available | `Select` exported |
| Forms | Checkbox | available | `Checkbox` exported |
| Forms | Radio | available | `Radio` exported |
| Forms | Switch | available | `Switch` exported |
| Forms | Field/Fieldset | missing | No field composition primitives found |
| Forms | HelpText/ErrorText | missing | No dedicated helper/error text primitives found |
| Feedback | Badge | available | `Badge` exported |
| Feedback | Alert | available | `Alert` exported |
| Feedback | Toast | available | `ToastHost` + `toasts` store exported |
| Feedback | Tooltip | available | `Tooltip` exported |
| Feedback | Progress/Spinner | available | `Progress` + `Spinner` exported |
| Feedback | Skeleton | missing | No skeleton/loading placeholder primitive |
| Overlay | Dialog/Modal | missing | No dialog component found |
| Overlay | Popover/Dropdown/Menu | missing | No popover/menu primitives found |
| Navigation | Tabs | exists-unexported | `navigation/Tabs/Tabs.svelte` exists, not exported |
| Navigation | Breadcrumbs | exists-unexported | `navigation/Breadcrumbs/Breadcrumbs.svelte` exists, not exported |
| Navigation | Pagination | exists-unexported | `navigation/Pagination/Pagination.svelte` exists, not exported |
| Navigation | SideNav | missing | No dedicated SideNav primitive found (can be app-local initially) |
| Data display | Table (basic) | exists-unexported | `data/Table/Table.svelte` exists, not exported |
| Data display | CodeBlock (docs) | missing | No docs-friendly code block component in `@clothesline/ui` |

## Priority Plan

### P0 (must-have to ship component-library app + usable docs)

1. Root export surface completion for docs-critical existing components:
- `Text`, `Heading`, `Paragraph`, `Label`
- `Link`, `Tabs`, `TableOfContents`
- `Table`

2. New `CodeBlock` component in `@clothesline/ui` (docs preview and usage snippets).

3. New form baseline primitives:
- `Textarea`
- `Field` and `HelpText`/`ErrorText` (minimal composition layer for clean examples)

4. Introduce `Input` alias or wrapper API (can forward to existing `TextField`) so docs and consumers have conventional naming.

### P1 (next)

1. Layout primitives:
- `Container`, `Stack`, `Grid`

2. Overlay baseline:
- `Dialog`
- `Popover` or `Menu` (at least one anchored overlay primitive)

3. Navigation completion:
- Export existing `Breadcrumbs`, `Pagination`
- Add minimal `SideNav` primitive if app-level implementation proves reusable

4. Feedback completion:
- `Skeleton`

5. Form completion:
- `Fieldset`

### P2 (later)

1. Media/data components currently unexported (`Chart`, `Metric`, `StatBlock`, media players/viewers) after API hardening.
2. Advanced overlays/menus (`Dropdown`, richer menu semantics, nested menus).
3. Additional typography primitives (`Caption`, `Overline`, inline code) and docs automation for prop extraction.

## Spec Blocks (P0/P1 gaps)

### P0: Typography Root Exports (`Text`, `Heading`, `Paragraph`, `Label`)
- Intended API: preserve existing props; add root exports from `src/index.ts` via `components/typography/index.ts`.
- A11y: `Heading` must render valid semantic heading levels; `Label` should map `for`/`id` correctly and support required state text.
- Token hooks: continue `--type-*`, color semantic variables (`--base-font-color`, tone variables), spacing scale tokens.
- Tests needed: smoke import test from `@clothesline/ui`; render + semantic assertions for heading level and label association.

### P0: Navigation Root Exports (`Link`, `Tabs`, `TableOfContents`, `Table`)
- Intended API: preserve existing component APIs, expose from root.
- A11y: `Link` keyboard/focus-visible and external rel safety; `Tabs` roving tab index + aria roles; TOC anchor discoverability and active section state.
- Token hooks: interactive tokens (`--focus-*`, `--border-*`, `--surface-*`, `--primary-*`).
- Tests needed: import coverage; tabs keyboard interaction; TOC heading parsing/anchor linking; table semantic markup checks.

### P0: `CodeBlock`
- Intended API: `code`, `language?`, `filename?`, `showLineNumbers?`, `wrap?`, `highlightLines?`, `copyable?`.
- A11y: copy button with clear label; non-color-only feedback for copy success; preserve readable contrast and horizontal scroll behavior.
- Token hooks: `--surface-*`, `--border-*`, `--radius-card`, `--shadow-*`, monospace type tokens if available.
- Tests needed: copy action behavior, optional line number rendering, long-line overflow behavior.

### P0: `Textarea`
- Intended API: `value`, `id`, `name`, `rows`, `placeholder`, `disabled`, `readonly`, `invalid`, `required`, `ariaDescribedby`.
- A11y: supports label association, invalid semantics (`aria-invalid`), and described-by helper/error text.
- Token hooks: input tokens aligned with `TextField` (focus ring, border, surface, text color tokens).
- Tests needed: value binding, disabled/readonly, invalid aria state, focus-visible styles not regressed.

### P0: `Field`, `HelpText`, `ErrorText`
- Intended API:
  - `Field`: slot-based wrapper with `label`, `hint`, `error`, `required`, `forId`.
  - `HelpText`: `id`, `tone='muted'`.
  - `ErrorText`: `id`, `role='alert'`.
- A11y: generate/preserve predictable ids for `aria-describedby`; error text should be announced appropriately.
- Token hooks: muted/error semantic text tokens, spacing and typography scale tokens.
- Tests needed: described-by wiring and error announcement semantics.

### P0: `Input` Naming Alignment
- Intended API: `Input` exported alias/wrapper over existing `TextField` API, with path for gradual API normalization.
- A11y: parity with `TextField` behavior and keyboard semantics.
- Token hooks: same as `TextField`.
- Tests needed: import + render parity and event forwarding parity with `TextField`.

### P1: `Container`
- Intended API: `size='sm|md|lg|xl|full'`, `as='div|section|main'`, `center=true`.
- A11y: semantic tag support only; no interactive semantics.
- Token hooks: layout width tokens (`--layout-container-*`), page gutter tokens.
- Tests needed: class/token application and width variant snapshots.

### P1: `Stack`
- Intended API: `gap`, `direction`, `align`, `justify`, `wrap`.
- A11y: non-interactive layout primitive; no ARIA by default.
- Token hooks: spacing scale tokens.
- Tests needed: style/class mapping for direction and spacing.

### P1: `Grid`
- Intended API: `cols`, `gap`, `minItemWidth`, responsive props later.
- A11y: non-interactive layout primitive.
- Token hooks: spacing and layout tokens.
- Tests needed: column/minmax behavior and responsive class mapping.

### P1: `Dialog`
- Intended API: controlled `open`, `onOpenChange`, slots for `title`, `description`, body/footer actions.
- A11y: focus trap, escape to close, aria-modal semantics, labelledby/describedby wiring.
- Token hooks: surface/elevation/border/radius/backdrop tokens.
- Tests needed: focus management, escape handling, background inertness.

### P1: `Popover` or `Menu`
- Intended API: anchor + open state + placement, trigger/content slots.
- A11y: keyboard navigation, dismiss on outside click/escape, roles based on variant.
- Token hooks: elevation, border, radius, motion tokens.
- Tests needed: positioning state transitions and keyboard close/navigation behavior.

### P1: `Skeleton`
- Intended API: `width`, `height`, `radius`, `animated=true`.
- A11y: `aria-hidden=true` by default, reduce-motion support.
- Token hooks: surface contrast tokens and motion duration tokens.
- Tests needed: reduced-motion behavior and token-driven style rendering.

### P1: `Fieldset`
- Intended API: `legend`, `description`, slot for grouped controls.
- A11y: semantic `<fieldset>/<legend>` markup and described-by support.
- Token hooks: border/radius/spacing/type tokens.
- Tests needed: legend rendering and grouping semantics.

## Immediate Implementation Scope for Next Phase

Start PHASE 3+5 implementation with these first P0 items only:
1. Export-surface fixes for typography/navigation/table.
2. `CodeBlock` in `@clothesline/ui`.
3. `Textarea` and minimal `Field` + `HelpText` + `ErrorText`.
4. `Input` alias for `TextField`.

This set unblocks docs shell content, component pages, and real form examples without large refactors.
