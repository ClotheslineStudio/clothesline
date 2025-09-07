# 🧵 @clothesline/tokens

A robust, flexible design token system for the Clothesline UI platform — providing consistent values for color, radius, spacing, typography, borders, scaling, and more. Built with accessibility, modularity, and customization in mind.

## ✨ Features

- 🎨 Color ramps powered by `oklch()` for perceptual accuracy and contrast flexibility  
- 📐 Radius, spacing, and scaling tokens designed for adaptable UIs  
- 🖋️ Typography system with extensible font settings and responsive scaling  
- 💅 Structured for theming, bundling, and CSS variable output  
- 🧱 Built for use in SvelteKit apps, component libraries, and static theme builds

## 📁 Structure

```plaintext
packages/tokens/
├── src/
│   ├── backgrounds/
│   ├── borders/
│   ├── radius/
│   ├── scaling/
│   ├── spacing/
│   ├── typography/
│   └── index.ts         // Main export
├── colors/
│   ├── colors.ts         
│   └── oklch.ts
├── dist/
│   ├── index.js         // Bundled output
│   └── index.d.ts       // Type definitions
├── tsup.config.ts
└── tsconfig.json
```

## 🚀 Usage

Install via your workspace:

```ts
import { baseTokens } from '@clothesline/tokens';

console.log(baseTokens.radius.md); // "0.5rem"
```

Or access specific token groups:

```ts
import { spacingTokens } from '@clothesline/tokens';
```

## ⚙️ Build

To compile the token package:

```bash
pnpm build
```

This will generate:

- `dist/index.js`: bundled output
- `dist/index.d.ts`: type definitions

## 👀 Watch Mode (optional)

```bash
pnpm dev
```

Runs `tsup` in watch mode for fast rebuilds during development.

## 📐 Token Categories

| Category     | Purpose                                 |
|--------------|------------------------------------------|
| `colors`     | Role-based ramps (e.g. primary, error)   |
| `radius`     | Border radius sizes                      |
| `spacing`    | Margin/padding units                     |
| `borders`    | Widths and styles                        |
| `scaling`    | Element scaling multipliers              |
| `typography` | Font families, weights, and styles       |
| `backgrounds`| Themeable surface/background tokens      |

## 🔮 Future Plans

- Theme previewer & generator
- Live token editor
- Accessibility audits per token scale
- Token testing framework

## 📄 License

[MIT](./LICENSE)
