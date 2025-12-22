<script context="module" lang="ts">
  // Optional header semantics variant, in case you want to reuse as a toolbar.
</script>

<script lang="ts">
  type HeaderAs = 'header' | 'div' | 'nav';
  type HeaderWidth = 'full' | 'page' | 'prose';

  export let as: HeaderAs = 'header';
  export let sticky: boolean = false;
  export let bordered: boolean = false;
  export let elevated: boolean = true;
  export let maxWidth: HeaderWidth = 'page';
  export let className: string = '';

  const Tag = as as keyof HTMLElementTagNameMap;

  $: rootClasses = [
    'cl-header',
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
    <div class="cl-header__section cl-header__section--left">
      <div class="cl-header__slot cl-header__slot--left">
        <slot name="left" />
      </div>
    </div>

    <div class="cl-header__section cl-header__section--center">
      <div class="cl-header__slot cl-header__slot--center">
        <slot name="center" />
      </div>
    </div>

    <div class="cl-header__section cl-header__section--right">
      <div class="cl-header__slot cl-header__slot--right">
        <slot name="right" />
      </div>
    </div>
  </div>
</svelte:element>

<style>
  .cl-header {
    /* Theme-driven visual tokens (safe to override) */
    --cl-header-bg: var(--color-surface-100, #f8fafc);
    --cl-header-fg: var(--base-font-color, #020617);
    --cl-header-border: var(--color-surface-300, #cbd5f5);
    --cl-header-shadow: var(--shadow-sm, 0 1px 0 rgba(15, 23, 42, 0.08));

    position: relative;
    z-index: var(--z-sticky-header, 500);

    display: block;
    width: 100%;
    color: var(--cl-header-fg);
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--cl-header-bg) 90%, transparent),
      var(--cl-header-bg)
    );
  }

  :global(html[data-mode="dark"]) .cl-header {
    --cl-header-bg: var(--color-surface-900, #020617);
    --cl-header-fg: var(--base-font-color-dark, #e2e8f0);
    --cl-header-border: var(--color-surface-700, #1e293b);
    --cl-header-shadow: 0 1px 0 rgba(15, 23, 42, 0.9);
  }

  .cl-header--sticky {
    position: sticky;
    top: 0;
  }

  .cl-header--bordered {
    border-bottom: var(--border-width-divider, 1px) solid var(--cl-header-border);
  }

  .cl-header--elevated {
    box-shadow: var(--cl-header-shadow);
  }

  /**
   * Hard layout constraints (resistant to slot content).
   * - grid prevents overlap by construction
   * - minmax(0,1fr) allows center to shrink
   */
  .cl-header__inner {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;

    gap: var(--spacing-3, 0.75rem);
    padding-inline: var(--spacing-7, 1.5rem);
    padding-block: var(--spacing-3, 0.75rem);

    margin-inline: auto;
    width: 100%;
  }

  /**
   * Use YOUR container scale tokens (no magic px).
   * - page uses layout-container-max (defaults to xl in your foundations)
   * - prose uses md
   */
  .cl-header--page .cl-header__inner {
    max-width: var(--layout-container-max, var(--layout-container-xl, 72rem));
  }

  .cl-header--prose .cl-header__inner {
    max-width: var(--layout-container-md, 48rem);
  }

  /**
   * Sections are "boxes" that must not allow children to paint over siblings.
   * The critical rule: overflow hidden.
   */
  .cl-header__section {
    min-width: 0;
    overflow: hidden;
  }

  .cl-header__section--left {
    justify-self: start;
  }

  .cl-header__section--center {
    justify-self: stretch;
  }

  .cl-header__section--right {
    justify-self: end;
  }

  /**
   * Slot wrappers:
   * - we control these even if the slotted element tries to be 100% wide or flex:1
   * - max-width:100% + overflow hidden forces clipping inside the column
   */
  .cl-header__slot {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .cl-header__slot--left,
  .cl-header__slot--right {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    white-space: nowrap; /* prevent accidental wrapping that causes height/overlap */
  }

  .cl-header__slot--center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2, 0.5rem);

    min-width: 0;
    max-width: 100%;
    overflow: hidden;

    /* center content can wrap if it wants, but won't paint over */
    white-space: nowrap;
  }

  /**
   * Last line of defense: if the slot root sets width:100%,
   * it can still fit within the center column (because the wrapper clips).
   * This keeps "full-width search bars" from overlapping left/right.
   */
  .cl-header__slot--center > :global(*) {
    min-width: 0;
    max-width: 100%;
  }
</style>

