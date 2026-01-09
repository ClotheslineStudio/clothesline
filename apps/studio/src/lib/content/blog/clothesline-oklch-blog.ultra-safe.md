---
title: "Why Clothesline Uses OKLCH for Color"
description: "A practical look at OKLCH, perceptual color, and how our token + theme engine uses it."
date: 2025-12-21
tags: [design-tokens, theming, accessibility, oklch, css]
---

# Why Clothesline Uses OKLCH for Color

Color is one of the hardest things to “get right” in a design system—especially when you need multiple themes, multiple modes (light/dark/high-contrast), and accessibility guarantees that hold up across an entire component library.

In Clothesline, we chose **OKLCH** as the foundational color space for our tokens and theme engine because it gives us **predictability**, **control**, and **better accessibility outcomes** than RGB/HSL workflows.

This post covers:

- What OKLCH is (in practical terms)
- Why we selected it over HSL/HEX
- How OKLCH works in CSS and in token systems
- How our **token → theme → component** pipeline is structured
- How our theme/color engine generates ramps and supports modes

---

## What is OKLCH?

**OKLCH** is a modern, perceptual color space designed so numeric changes more closely match what the human eye perceives.

OKLCH is made of three main components:

- **L (Lightness)**: `0%` (black) → `100%` (white)
- **C (Chroma)**: how intense/saturated the color is (higher = more vivid)
- **H (Hue)**: the hue angle (e.g., `0deg` ≈ red, `120deg` ≈ green, `240deg` ≈ blue)

In CSS, it looks like this:

```css
/* oklch(L C H / alpha) */
color: oklch(65% 0.18 250deg);
background: oklch(25% 0.08 250deg / 0.9);
```

---

## Why we chose OKLCH

### 1) HSL is convenient, but misleading

HSL is common because it’s easy to understand and tweak. The problem is that it isn’t perceptual. A change of “10% lightness” does not consistently *look* like a uniform change across different hues. The same values can produce wildly different perceived brightness, contrast, and saturation.

In a token system, that inconsistency becomes a compounding problem:

- Your blue “500” might feel darker than your green “500”
- Your light theme ramp may behave very differently than your dark theme ramp
- Contrast targets become difficult to meet reliably

### 2) OKLCH is far more predictable

With OKLCH:

- Adjusting **L** mostly affects perceived brightness in a consistent way
- Adjusting **C** mostly affects vividness
- Keeping **H** stable keeps the hue identity stable

This makes color ramps (50–950) and semantic tokens (primary/secondary/etc.) behave far more consistently across themes.

### 3) Accessibility and contrast are easier to engineer

Accessibility is not “pick a bright color and hope.” It’s measurable, testable, and can be automated.

Using OKLCH enables a more systematic approach:

- Define a ramp in L/C for each semantic hue
- Clamp / correct out-of-gamut colors before output
- Evaluate contrast for intended text/background pairs
- Enforce `on-*` tokens (foregrounds) that reliably pass contrast thresholds

### 4) Theme scaling becomes a real engineering system

We are not building “a palette.” We are building a **palette factory**:

- multiple themes (BigSky, MilkyWay, Timberline, etc.)
- multiple modes (light/dark/high-contrast)
- optional overlays (vision modes like color-blind assistance)
- semantic consistency across all themes

OKLCH makes that scalable.

---

## OKLCH in CSS today

Modern browsers support `oklch()` directly. That means we can ship **CSS variables as OKLCH** and stay in a high-quality color space end-to-end.

Example:

```css
:root &#123;
  --primary-500: oklch(62% 0.18 250deg);
  --surface-50:  oklch(98% 0.01 250deg);
  --surface-900: oklch(20% 0.02 250deg);
&#125;
```

Then components use semantic tokens (more on that below):

```css
.button &#123;
  background: var(--primary);
  color: var(--on-primary);
&#125;
```

---

## How we structure color in Clothesline

We treat color as layered contracts, not a single blob of values.

### Layer 1: Primitives (ramps)

We generate **ramps** like:

- `--color-primary-50 … --color-primary-950`
- `--color-surface-50 … --color-surface-950`
- `--color-success-*`, `--color-warning-*`, etc.

These ramps are theme-specific, but follow a shared structure so every theme exports the same keys.

This is what makes “swap theme, keep components” possible.

### Layer 2: Semantic roles

Components should not “know” about `primary-600`. They should know about meaning:

- `--primary`
- `--secondary`
- `--tertiary`
- `--surface`
- `--success`
- `--warning`
- `--error`
- `--info`
- `--neutral`
- `--accent`

And importantly, **foreground counterparts**:

- `--on-primary`
- `--on-surface`
- `--on-warning`
- etc.

This establishes a reliable contract: *if you use `--primary` as a background, use `--on-primary` for the text.*

### Layer 3: Component tokens (optional overrides)

Some components need their own internal surfaces, borders, and states. We support component-level tokens like:

- `--button-bg`
- `--button-bg-hover`
- `--button-text`
- `--card-bg`
- `--card-border`

These default to semantic roles, but can be overridden by themes or variants.

---

## How our themes work

At runtime, themes are applied using attributes on the `html` element (SvelteKit-friendly and SSR-safe when done correctly):

```text
&lt;html data-theme="bigsky" data-mode="light"&gt;
```

Theme CSS sets variables for that combination:

```css
html[data-theme="bigsky"][data-mode="light"] &#123;
  --color-primary-50:  oklch(...);
  --color-primary-500: oklch(...);
  --color-surface-50:  oklch(...);
  --color-surface-900: oklch(...);

  /* Semantic mapping */
  --primary: var(--color-primary-600);
  --surface: var(--color-surface-50);

  /* Foreground pairing */
  --on-primary: var(--color-surface-50);
  --on-surface: var(--color-surface-900);
&#125;
```

This keeps our component layer simple and stable. Components read semantic tokens, not theme files.

---

## The Clothesline color engine (how ramps are generated)

At a high level, our color engine does three things:

1. **Generate ramps** from a small set of theme inputs (hue anchors + target ranges)
2. **Correct for gamut** (so we don’t output impossible colors)
3. **Validate and map** those ramps into semantic roles + `on-*` roles

### 1) Ramps

A ramp is a set of color stops. We use a predictable scale like:

- `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`

Instead of “eyeballing” 11 random colors, we model them.

A simplified mental model:

- Light theme surfaces: high L, low C
- Dark theme surfaces: low L, slightly higher C (to avoid “dead” greys)
- Brand ramps: keep hue stable, vary L and C intentionally

### 2) Gamut clamping

OKLCH can represent colors that aren’t displayable in sRGB. Real UIs still need to render in actual device gamuts.

So our build pipeline includes a **gamut correction step**:

- Convert OKLCH → RGB
- If out of gamut, reduce chroma (or apply a smarter clamp)
- Export a valid `oklch()` value that will render consistently

In implementation we typically rely on a color library (for example, **Culori**) to handle conversions and gamut checks cleanly.

### 3) Contrast validation + `on-*` tokens

We treat readable text as a first-class output. For every semantic background token, we compute a matching `on-*` token that achieves the target contrast.

The result:

- `--primary` has a guaranteed foreground `--on-primary`
- `--surface` has `--on-surface`
- Warning colors can switch to dark text when needed

We also support a **contrast-factor** control for accessibility modes (e.g., high contrast), which modifies ramps and/or mapping selection:

```css
html[data-contrast="high"] &#123;
  --contrast-factor: 1.2;
&#125;
```

And in theme files we can incorporate it:

```css
/* Example: use a derived clamp to shift choices */
--k-ct: clamp(0%, calc((var(--contrast-factor, 1) - 1) * 120%), 25%);
```

(Exact formulas vary by theme/mode; the important part is that the system is parameterized and consistent.)

---

## How we use OKLCH in our codebase

Clothesline’s monorepo separates responsibilities:

- `@clothesline/tokens`: TypeScript-first source of truth for token definitions
- `@clothesline/themes`: build scripts + generated CSS theme files
- `@clothesline/ui`: components that consume semantic tokens

### Tokens package: TypeScript-first

We keep structured token definitions in TS so we can:

- validate shapes and keys
- generate CSS variables automatically
- keep the contract consistent across themes

Illustrative example:

```ts
// packages/tokens/src/colors/roles.ts
export const semanticRoles = &#123;
  primary:   &#123; ramp: "primary", default: 600 &#125;,
  secondary: &#123; ramp: "secondary", default: 600 &#125;,
  tertiary:  &#123; ramp: "tertiary", default: 600 &#125;,
  surface:   &#123; ramp: "surface", default: 50  &#125;,
  // ...
&#125; as const;
```

### Themes package: build → CSS export

Themes are produced as real CSS files so apps can import them directly (Tailwind v4 + SvelteKit friendly):

```ts
// packages/themes/build.ts (conceptual)
import &#123; buildThemeCss &#125; from "./engine/buildThemeCss";

const css = buildThemeCss(themeConfig);
writeFile("dist/css/themes/bigsky-light.css", css);
```

Apps then import:

```css
/* app.css */
@import "@clothesline/themes/css/foundations.css";
@import "@clothesline/themes/css/themes/bigsky-light.css";
@import "@clothesline/themes/css/themes/bigsky-dark.css";
```

### UI package: semantic-only consumption

Components do not depend on “BigSky” or “MilkyWay.” They depend on the semantic contract:

```text
&lt;!-- packages/ui/src/components/Button/Button.svelte --&gt;
&lt;button class="cl-button"&gt;
  &lt;slot /&gt;
&lt;/button&gt;

&lt;style&gt;
  .cl-button &amp;#123;
    background: var(--primary);
    color: var(--on-primary);
    border: 1px solid color-mix(in oklch, var(--primary) 70%, var(--surface));
  &amp;#125;
&lt;/style&gt;
```

This is one of the strongest benefits of OKLCH: even blending and mixing behaves more predictably than RGB mixing.

---

## Modes, overlays, and vision support

Our system is designed to support stacked “dimensions” of theming:

- **Theme**: BigSky / MilkyWay / Timberline / etc.
- **Mode**: light / dark
- **Contrast**: normal / high contrast
- **Vision**: default / color-blind assistance overlays

At the CSS level, that typically means:

- Theme+mode define the base variable set
- Contrast and vision apply controlled overrides (preferably in isolated layers)

Example shape:

```css
/* Base */
html[data-theme="milkyway"][data-mode="dark"] &#123; ... &#125;

/* Contrast overlay */
html[data-contrast="high"] &#123; ... &#125;

/* Vision overlay */
html[data-vision="cb"] &#123; ... &#125;
```

The key principle is **non-destructive stacking**:
overlays should not “wipe out” the theme; they should adjust it.

---

## Practical guidance for designers and developers

### If you are designing ramps

- Treat **L** as your primary knob for ramp steps.
- Increase **C** gradually toward midtones; reduce it toward extremes.
- Keep **H** stable unless you intentionally want a hue shift.

### If you are implementing tokens

- Export ramps as CSS variables in OKLCH.
- Map semantic tokens to ramp stops.
- Always define `on-*` pairs.

### If you are building components

- Consume semantic tokens only.
- Avoid “hardcoding” ramp keys inside components.
- Use OKLCH-aware tools (`color-mix(in oklch, …)`) for borders, hovers, and subtle blends.

---

## What’s next for our color system

Our roadmap for the color engine focuses on:

- More robust contrast automation (including state colors and overlays)
- Theme QA tooling (automated checks for contrast, gamut, and semantic mapping)
- A theme generator UI for editing ramps and seeing results live
- Better vision-mode strategies that adjust **semantics**, not just “filters”

---

## Summary

OKLCH is not a trend choice for us—it is an engineering choice.

It makes color:

- more predictable across themes
- more scalable across ramps and roles
- easier to validate for accessibility
- more maintainable across a growing component library

If you want a system where “tertiary-600” behaves consistently in every theme, you need a perceptual foundation and a real token contract. OKLCH gives us that foundation.

---

*If you are building your own system and want to compare OKLCH ramps across themes, start by generating one ramp with fixed hue and controlled L/C steps, then test the same ramp in both light and dark surfaces. The difference in predictability becomes obvious immediately.*
