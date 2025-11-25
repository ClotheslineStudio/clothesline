# Header

A flexible, theme-aware application header used for page chrome, app shells, layout framing, navigation, and toolbars.

The Clothesline `Header` component provides a simple, predictable structure with left, center, and right slot areas, controlled elevation and border options, and design-token-driven styling that adapts across themes, modes, and accessibility variants.

This component does **not** contain business logic (e.g., theme switching, auth menus, navigation logic). Instead, it acts as a *layout shell* that apps can compose with their own controls.

---

## ✨ Features

- Left / center / right slot layout  
- Optional sticky positioning  
- Optional border and elevation  
- Fully theme-aware using CSS custom properties  
- Works with all Clothesline theme modes (dark, light, high-contrast, etc.)  
- Adjustable max-width presets (`full`, `page`, `prose`)  
- Zero external dependencies  
- Ideal for app and documentation layouts  

---

## 📦 Import

```ts
import Header from '@clothesline/ui/layout/header';
```

Or via direct path:

```ts
import Header from '@clothesline/ui/src/components/layout/header/Header.svelte';
```

---

## 🧱 Usage

### Basic

```svelte
<Header>
  <div slot="left">Logo</div>
  <div slot="center">Search</div>
  <div slot="right">Actions</div>
</Header>
```

---

## 📐 Examples

### Sticky header

```svelte
<Header sticky>
  <div slot="left">Clothesline</div>
  <div slot="right"><ThemeToggle /></div>
</Header>
```

### Page-width constrained header

```svelte
<Header maxWidth="page">
  <div slot="left">Docs</div>
  <div slot="right"><Search /></div>
</Header>
```

### Toolbar / navigation use

```svelte
<Header as="nav" bordered={false} elevated={false}>
  <div slot="left"><Back /></div>
  <div slot="center">Users</div>
  <div slot="right"><Filter /></div>
</Header>
```

---

## 🎛 Props

| Prop         | Type                                 | Default    | Description |
|--------------|--------------------------------------|------------|-------------|
| `as`         | `'header' \| 'div' \| 'nav'`          | `'header'` | Tag used for semantic rendering. |
| `sticky`     | `boolean`                            | `false`    | Pins the header to the top of the viewport. |
| `bordered`   | `boolean`                            | `true`     | Shows a bottom border using theme tokens. |
| `elevated`   | `boolean`                            | `true`     | Adds a subtle shadow (token-driven). |
| `maxWidth`   | `'full' \| 'page' \| 'prose'`         | `'page'`   | Controls horizontal constraints of inner content. |
| `className`  | `string`                             | `''`       | Appends additional classes to the root element. |

---

## 🔌 Slots

### `left`

Left side of the header (logo, breadcrumbs, nav trigger).

### `center`

Centered content (titles, search bars, tabs).  
Automatically flexes unless empty.

### `right`

Right-aligned actions (menus, avatar, theme toggles, links).

---

## 🎨 Styling & Tokens

The Header uses **component-scoped tokens** to remain theme-safe and override-friendly:

| Token | Purpose |
|-------|----------|
| `--cl-header-bg` | Background color / gradient source |
| `--cl-header-fg` | Text + icon color |
| `--cl-header-border` | Bottom border color |
| `--cl-header-shadow` | Elevation shadow |

Themes (e.g., `tidal-glass`, `milkyway`, `night-market`) can override these tokens cleanly:

```css
html[data-theme="tidal-glass"] .cl-header {
  --cl-header-bg: var(--glass-surface);
  --cl-header-border: var(--glass-border);
}
```

Spacing and layout are driven by global scale tokens:

- `--spacing-*`
- `--radius-*`
- `--shadow-*`
- `--color-surface-*`
- `--base-font-color`, `--base-font-color-dark`

No hard-coded colors exist in the component.

---

## ♿ Accessibility

- `as="header"` provides correct landmark semantics.  
- Keyboard users can navigate inside the header via app-provided content.  
- High-contrast mode (`data-contrast="high"`) automatically adjusts via theme tokens.  
- Component does not trap focus or alter keyboard flow.

Ensure any slotted actions (e.g., buttons, menus) follow WCAG 2.2 guidelines.

---

## 🧪 Testing

Recommended tests:

- Renders with all default props
- Slot content renders correctly
- Sticky + bordered + elevated combinations
- Dark/light/HC modes via global attributes
- Snapshot for Storybook visual regression

Example test structure:

Header.test.ts

Use Vitest + @testing-library/svelte.

---

## 📚 Storybook

Include stories demonstrating:

- Default
- Sticky header
- No border / no elevation
- Themed header variants
- With a full app shell layout

Placed in:

Header.stories.svelte

---

## ✔ Do & Don’t

### Do

- Use slots for composition
- Override tokens for theme variations
- Keep the header lightweight and layout-focused
- Use `maxWidth="page"` for most apps

### Don’t

- Put theme-switching logic inside this component
- Hard-code icon libraries
- Embed business logic (auth, routing, API calls)

---

## 🗂 Folder Structure

header/
  Header.svelte
  HeaderSection.svelte   (optional)
  Header.test.ts
  Header.stories.svelte
  README.md
  index.ts
