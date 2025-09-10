# Clothesline

A monorepo for **Clothesline UI** — a Svelte component library with design tokens, themes, and demo apps.

This repo is the development home for Clothesline Studio’s UI system and supporting tools.

---

## Structure

This project uses a **monorepo** layout managed with [pnpm workspaces](https://pnpm.io/workspaces).

```
apps/            → apps that use or demo the UI system
  ├─ docs        → documentation site (in progress)
  └─ playground  → component demo / testing environment

packages/        → reusable libraries
  ├─ ui          → Svelte component library (@clotheslinestudio/ui)
  ├─ tokens      → design tokens (@clotheslinestudio/tokens)
  └─ themes      → theme configs & generator (@clotheslinestudio/themes)
```

## Goals

- **Reusable UI kit** built with accessibility and theming in mind  
- **Design tokens + themes** for consistency across apps  
- **Docs + showcase** to make components easy to use  
- **Block engine (future)** for structured content workflows  

---

## Status

This project is **under active development**.  
Expect breaking changes until the first stable release (`v1.0.0`).

---

## License

[MIT](LICENSE)

---

Maintained by [Clothesline Studio](https://clotheslinestudio.com).  
Reviewed by Ripley 🐾
