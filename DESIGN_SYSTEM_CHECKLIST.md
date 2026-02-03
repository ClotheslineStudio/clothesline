# Design System Maintenance Checklist

## 1. Exports & API

- [x] Use canonical export names for all token utilities (e.g., `generateColorRampFromSeed`, `colorShades`).
- [x] Re-export key utilities from main entry points for easy access.

## 2. Test Coverage

- [x] Unit tests for all token generation utilities.
- [ ] Integration tests for theme output (CSS, variables).
- [ ] Visual regression tests (Storybook, Playwright, or similar).

## 3. Documentation

- [x] README in each package with structure and usage.
- [x] JSDoc or inline comments for all exports.
- [ ] Storybook Docs or similar for visual tokens and themes.

## 4. CSS Cascade

- [x] Use data attributes for mode, vision, and accessibility.
- [x] Document the cascade and override strategy.

## 5. Automation

- [ ] CI runs build and tests for all packages.
- [ ] Linting (ESLint) and formatting (Prettier) enforced in CI.

## 6. File Organization

- [x] Group tokens by type (color, spacing, etc.).
- [x] Keep utilities, tests, and docs in dedicated folders.

---

## Automation Suggestions

- **CI/CD:**
  - Use GitHub Actions, GitLab CI, or similar to run `pnpm build` and `pnpm test` on every PR.
  - Add linting and formatting checks (`pnpm lint`, `pnpm format:check`).
  - Optionally, run visual regression tests and publish Storybook previews.

- **Pre-commit Hooks:**
  - Use `lint-staged` and `husky` to auto-format and lint code before commits.

- **Docs Automation:**
  - Use Storybook Docs for live token/theme documentation.
  - Optionally, auto-generate token docs from source using tools like Style Dictionary or custom scripts.

- **Release Automation:**
  - Use semantic-release or changesets for versioning and changelog generation.

---

_Review this checklist regularly to keep your design system robust and maintainable._
