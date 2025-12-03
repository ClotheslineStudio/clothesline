// packages/themes/src/index.ts

// Export everything from modes (including types + setTheme + getTheme)
export * from './modes.js';

// If you still need the *old* setTheme for back-compat,
// you can alias it instead of overriding:
export { setTheme as legacySetTheme } from './setTheme.js';
