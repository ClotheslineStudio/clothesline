<script context="module" lang="ts">
  // Optional header semantics variant, in case you want to reuse as a toolbar.
  export type HeaderAs = 'header' | 'div' | 'nav';

  /**
   * Controls the max-width of the inner content.
   * - 'full'   : spans the full viewport width.
   * - 'page'   : constrained to a typical app/page width.
   * - 'prose'  : narrower, good for docs/blog headers.
   */
  export type HeaderWidth = 'full' | 'page' | 'prose';
</script>

<script lang="ts">
  /**
   * Clothesline Header
   *
   * A generic app/page header shell.
   * - Uses left / center / right named slots for flexible composition.
   * - Visual styling is driven by design tokens (colors, spacing, shadows).
   * - Does NOT own theme/mode/vision logic. That belongs to the consuming app.
   *
   * Example usage:
   *
   * <Header sticky elevated>
   *   <div slot="left">Clothesline Icons</div>
   *   <div slot="center">Search / breadcrumbs</div>
   *   <div slot="right">
   *     <ThemeToggle />
   *     <a href="https://github.com/...">GitHub</a>
   *   </div>
   * </Header>
   */

  /**
   * Which HTML element should be used.
   * Default: 'header' for semantic page/app headers.
   */
  export let as: HeaderAs = 'header';

  /**
   * When true, the header is positioned sticky at the top.
   * This is for app shells, docks, or persistent toolbars.
   */
  export let sticky: boolean = false;

  /**
   * When true, adds a bottom border to the header.
   */
  export let bordered: boolean = false;

  /**
   * When true, adds elevation shadow to the header.
   */
  export let elevated: boolean = true;

  /**
   * Controls the max-width of the inner content.
   * - 'full'   : spans the full viewport width.
   * - 'page'   : constrained to a typical app/page width.
   * - 'prose'  : narrower, good for docs/blog headers.
   */
  export let maxWidth: HeaderWidth = 'page';

  /**
   * Additional classes to append to the root element.
   * Allows apps to add layout tweaks without forking the component.
   */
  export let className: string = '';

  // Internal decision for the HTML tag via svelte:element
  const Tag = as as keyof HTMLElementTagNameMap;

  /**
   * Compute the full class string for the root element.
   * We keep this logic in script so Tailwind users can
   * swap these classes later if desired.
   */
  $: rootClasses = [
    'cl-header',                   // base identifier for theming/debugging
    sticky && 'cl-header--sticky',
    bordered && 'cl-header--bordered',
    elevated && 'cl-header--elevated',
    maxWidth === 'page' && 'cl-header--page',
    maxWidth === 'prose' && 'cl-header--prose',
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<svelte:element this={Tag} class={rootClasses}>
  <div class="cl-header__inner">
    <!--
      Left slot:
      Usually logo, app name, navigation trigger, or breadcrumbs.
    -->
    <div class="cl-header__section cl-header__section--left">
      <slot name="left" />
    </div>

    <!--
      Center slot:
      Ideal for search, tabs, or page title.
      This section flexes to fill available space.
    -->
    <div class="cl-header__section cl-header__section--center">
      <slot name="center" />
    </div>

    <!--
      Right slot:
      Commonly used for actions: theme toggles, profile menu, links.
    -->
    <div class="cl-header__section cl-header__section--right">
      <slot name="right" />
    </div>
  </div>
</svelte:element>

<style>
  /**
   * Core design tokens used:
   *
   * These should be defined by your theme system:
   * - --color-surface-100 / 900 : background ramp
   * - --color-surface-300 / 700 : borders
   * - --base-font-color / --base-font-color-dark : text
   * - --shadow-sm / --shadow-none : elevation
   * - --spacing-* : layout spacing
   *
   * We provide sensible fallbacks so the component
   * doesn't explode if tokens are missing.
   */

  .cl-header {
    /* Background + foreground depend on your theme tokens */
    --cl-header-bg: var(--color-surface-100, #f8fafc);
    --cl-header-fg: var(--base-font-color, #020617);
    --cl-header-border: var(--color-surface-300, #cbd5f5);
    --cl-header-shadow: var(--shadow-sm, 0 1px 0 rgba(15, 23, 42, 0.08));

    position: relative;
    z-index: 10;

    display: block;
    width: 100%;
    color: var(--cl-header-fg);
    background:
      linear-gradient(
        to bottom,
        color-mix(in oklab, var(--cl-header-bg) 90%, transparent),
        var(--cl-header-bg)
      );
  }

  /* Dark mode variant driven by html[data-mode="dark"] */
  :global(html[data-mode="dark"]) .cl-header {
    --cl-header-bg: var(--color-surface-900, #020617);
    --cl-header-fg: var(--base-font-color-dark, #e2e8f0);
    --cl-header-border: var(--color-surface-700, #1e293b);
    --cl-header-shadow: 0 1px 0 rgba(15, 23, 42, 0.9);
  }

  /* Optional sticky behavior */
  .cl-header--sticky {
    position: sticky;
    top: 0;
  }

  /* Optional border + elevation */
  .cl-header--bordered {
    border-bottom: 1px solid var(--cl-header-border);
  }

  .cl-header--elevated {
    box-shadow: var(--cl-header-shadow);
  }

  /* Inner layout: horizontal alignment and max-width options */
  .cl-header__inner {
    display: flex;
    align-items: center;
    gap: var(--spacing-3, 0.75rem);
    padding-inline: var(--spacing-7, 1.5rem);
    padding-block: var(--spacing-3, 0.75rem);
    margin-inline: auto;
  }

  /* Max-width presets */
  .cl-header--page .cl-header__inner {
    max-width: 1120px;
  }

  .cl-header--prose .cl-header__inner {
    max-width: 768px;
  }

  /* Sections */
  .cl-header__section {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    min-width: 0; /* helps keep slots from overflowing */
  }

  .cl-header__section--left {
    justify-content: flex-start;
  }

  .cl-header__section--center {
    flex: 1;
    justify-content: center;
  }

  .cl-header__section--right {
    justify-content: flex-end;
  }

  /* When center slot is empty, keep the layout balanced */
  .cl-header__section--center:empty {
    flex: 0;
  }

  /**
   * High contrast adjustment:
   * You can tune this further in your theme CSS.
   */
  :global(html[data-contrast="high"]) .cl-header {
    --cl-header-bg: color-mix(in oklab, var(--cl-header-bg) 85%, transparent);
    --cl-header-border: color-mix(in oklab, var(--cl-header-fg) 20%, var(--cl-header-border));
  }
</style>
