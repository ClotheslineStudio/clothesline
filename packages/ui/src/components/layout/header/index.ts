// packages/ui/src/components/layout/header/index.ts

/**
 * Public exports for the Clothesline Header component.
 *
 * This file keeps the import surface clean and allows you to
 * swap or refactor the internal implementation without breaking
 * consuming apps.
 */

import Header from './Header.svelte';

// Re-export the component as the default export
export { Header }; 
export default Header;

// Optionally re-export prop types if you want them available to consumers.
// Make sure these types are exported from Header.svelte via `export type`.
export type { HeaderAs, HeaderWidth } from './Header.svelte';
