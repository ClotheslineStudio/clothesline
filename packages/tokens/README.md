# 🧵 @clothesline/tokens

A robust, flexible design token system for the Clothesline UI platform — providing consistent values for color, radius, spacing, typography, borders, scaling, and more. Built with accessibility, modularity, and customization in mind.

## ✨ Features

- 🎨 Color ramps powered by `oklch()` with an opt-in **gamut-safe** builder  
- 📐 Radius, spacing, and scaling tokens designed for adaptable UIs  
- 🖋️ Typography system with extensible font settings and responsive scaling  
- 💅 Structured for theming, bundling, and CSS variable output  
- 🧱 Built for SvelteKit apps, component libraries, and static theme builds

## 📁 Structure (key files)

```plaintext
packages/tokens/
├── colors/
│   ├── index.ts        # Public colors API door (re-exports the good stuff)
│   └── oklch.ts        # Ramp math: rampSteps, rampNames, generateOklchRamp()
├── src/
│   ├── backgrounds/
│   ├── borders/
│   ├── radius/
│   ├── scaling/
│   ├── spacing/
│   ├── typography/
│   └── index.ts        # Main non-color exports (base tokens, etc.)
├── utils/
│   ├── colorEngine.ts  # culori wiring + converters
│   ├── snapToGamut.ts  # sRGB/P3 snapping helpers
│   ├── toCssColor.ts   # OKLCH → CSS string
│   └── generateRamps.ts# seed → gamut-safe step-keyed ramp
├── dist/
│   ├── index.js / .d.ts
│   └── colors/index.js / .d.ts
├── tsup.config.ts
└── tsconfig.json
```

## 🚀 Quick start

### Base tokens

```ts
import { baseTokens } from '@clothesline/tokens';

console.log(baseTokens.radius.md); // "0.5rem"
```

### Colors API (the “colors door”)

```ts
import {
  rampNames,                   // [50,100,200,300,400,500,600,700,800,900,950]
  generateColorRampFromSeed,   // ✅ gamut-safe: seed → { 50: 'oklch(...)', ... }
  generateOklchRamp,           // simple: (hue, chroma, lighten?) → string[11]
  buildColorRamps,             // simple: per-role hue/chroma → { role: string[11] }
  type Step,                   // 50 | 100 | ... | 950
  type ColorRole               // 'primary' | 'secondary' | ...
} from '@clothesline/tokens/colors';
```

> `rampNames` is the **single source of truth** for shade steps. Don’t hard-code `[50..950]`.

---

## ❓ Do I need the **themes** package?

**No — tokens is useful on its own.**  
`@clothesline/themes` is a convenience layer that *uses* tokens to prebuild CSS (plus extras like vision modes and a themes manifest).

Use **tokens only** if you want to:
- generate a small CSS file yourself, or
- use the builders inline with Tailwind/CSS-in-JS/custom pipelines.

Use **themes** if you want:
- ready-made CSS per theme (light/dark blocks, contrast mixing, vision modes),
- a JSON manifest of available themes.

### Option A — Build your own CSS from tokens (no themes)

Create a tiny script to emit CSS variables:

```ts
// build-tokens.css.ts (run with tsx or ts-node)
import { writeFileSync } from 'node:fs';
import { rampNames, generateColorRampFromSeed } from '@clothesline/tokens/colors';
import { baseTokens } from '@clothesline/tokens';

const seed = { mode: 'oklch', l: 0.64, c: 0.12, h: 145 }; // your brand color
const ramp = generateColorRampFromSeed(seed); // gamut-safe

let css = `:root{\n`;
for (const step of rampNames) {
  css += `  --color-primary-\${step}: \${ramp[step]};\n`;
}
css += `  --radius-md: \${baseTokens.radius.md};\n`;
css += `  --spacing-4: \${baseTokens.spacing[4]};\n`;
css += `}\n`;

writeFileSync('src/tokens.css', css);
console.log('wrote src/tokens.css');
```

Then in your app:
```ts
// main.ts / layout.svelte / _app.tsx
import './tokens.css';
```

Use the vars:
```css
.button {
  background: var(--color-primary-500);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}
```

### Option B — Use the simple builders inline (no generated file)

```ts
import { generateOklchRamp, rampNames } from '@clothesline/tokens/colors';

const arr = generateOklchRamp(145, 0.12); // 11 values, no gamut work
const byStep = Object.fromEntries(rampNames.map((s, i) => [s, arr[i]]));

// byStep[500] → 'oklch(...)'
```

---

## ⚙️ Build

```bash
pnpm -C packages/tokens build
```

Generates:

- `dist/index.js`, `dist/index.d.ts`  
- `dist/colors/index.js`, `dist/colors/index.d.ts` (subpath export)

## 🧪 Tests

Small checks ensure the shade steps and ramp builders stay sane:

```bash
pnpm -C packages/tokens test
```

## 📝 Notes

- This package is **ESM**. Local imports inside the package use `.js` specifiers so emitted files resolve correctly at runtime.
- The **gamut-safe** path uses `culori` to snap colors into sRGB, returning OKLCH CSS strings keyed by `rampNames`.

## 📄 License

MIT