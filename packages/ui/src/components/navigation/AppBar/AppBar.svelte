<!-- AppBar.svelte -->
<script context="module" lang="ts">
  export type Density = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  /** Semantics */
  export let as: keyof HTMLElementTagNameMap = 'header';
  export let roleAttr: 'banner' | 'toolbar' | 'navigation' | 'none' = 'banner';
  export let ariaLabel = 'Application bar';

  /** Behavior & surface */
  export let sticky = true;
  export let elevated = true;
  export let border = true;
  export let glass = false;

  /** Sizing */
  export let density: Density = 'md';
  export let height: string | null = null;        // e.g. '56px' overrides density
  export let zIndex: string | number | null = null;

  /** Layout options */
  export let scrollX = false;                     // allow horizontal scroll if crowded
  export let bleed = false;                       // cancel parent gutters (for preview pages)

  // data-* for styling
  $: dataSticky = sticky ? 'true' : 'false';
  $: dataElevated = elevated ? 'true' : 'false';
  $: dataBorder = border ? 'true' : 'false';
  $: dataGlass = glass ? 'true' : 'false';
  $: dataScroll = scrollX ? 'true' : 'false';
  $: dataBleed = bleed ? 'true' : 'false';
</script>

<svelte:element
  this={as}
  class="appbar"
  {...(roleAttr !== 'none' ? { role: roleAttr } : {})}
  aria-label={ariaLabel}
  data-sticky={dataSticky}
  data-elevated={dataElevated}
  data-border={dataBorder}
  data-glass={dataGlass}
  data-density={density}
  data-scroll={dataScroll}
  data-bleed={dataBleed}
  style={`${height ? `--appbar-height:${height};` : ''}${zIndex != null ? `--appbar-z:${zIndex};` : ''}`}
>
  <div class="appbar__row">
    <div class="appbar__left"><slot name="left" /></div>
    <div class="appbar__center"><slot name="center" /></div>
    <div class="appbar__right"><slot name="right" /></div>
  </div>

  <div class="appbar__subbar">
    <slot name="subbar" />
  </div>
</svelte:element>

<style>
  /* AppBar reads semantic surface + on-surface tokens.
     Override hooks (optional): --topbar-bg/fg/border/shadow/px/gap/z/height */
  .appbar {
    /* Defaults: prefer semantic aliases, fall back to surface ramp */
    --ab-bg:     var(--topbar-bg, var(--background-panel, var(--color-surface-50)));
    --ab-fg:     var(--topbar-fg, var(--on-surface, var(--color-surface-950)));
    --ab-border: var(--topbar-border, var(--border-color-default,
                   color-mix(in oklab, var(--color-surface-950) calc(var(--opacity-divider) * 100%), transparent)));

    /* Shadow: use elevation token first */
    --ab-shadow: var(--topbar-shadow, var(--elevation-navbar, var(--elevation-2)));

    /* Layout knobs (all token-driven) */
    --ab-px:  var(--topbar-px, var(--page-gutter-x, var(--spacing-md)));
    --ab-gap: var(--topbar-gap, var(--spacing-2));
    --ab-z:   var(--topbar-z, var(--z-sticky-header));

    /* Density heights (tokenized via size) */
    --ab-h-sm: var(--size-control-sm);
    --ab-h-md: var(--size-control-md);
    --ab-h-lg: var(--size-control-lg);

    /* Density paddings (tokenized via spacing) */
    --ab-py-sm: var(--spacing-2);
    --ab-py-md: var(--spacing-3);
    --ab-py-lg: var(--spacing-4);

    background: var(--ab-bg);
    color: var(--ab-fg);

    border-bottom: var(--border-width-divider) solid transparent;
    position: relative;
    width: 100%;

    /* Safe-area aware paddings (used by bleed calc too) */
    --ab-pad-left:  max(var(--ab-px), env(safe-area-inset-left));
    --ab-pad-right: max(var(--ab-px), env(safe-area-inset-right));
    padding-left: var(--ab-pad-left);
    padding-right: var(--ab-pad-right);
  }

  .appbar[data-density="sm"] { --ab-h: var(--appbar-height, var(--ab-h-sm)); --ab-py: var(--ab-py-sm); }
  .appbar[data-density="md"] { --ab-h: var(--appbar-height, var(--ab-h-md)); --ab-py: var(--ab-py-md); }
  .appbar[data-density="lg"] { --ab-h: var(--appbar-height, var(--ab-h-lg)); --ab-py: var(--ab-py-lg); }
  .appbar[style*="--appbar-height"] { --ab-h: var(--appbar-height); }

  .appbar[data-sticky="true"] { position: sticky; top: 0; z-index: var(--ab-z); }
  .appbar[data-border="true"] { border-bottom-color: var(--ab-border); }
  .appbar[data-elevated="true"][data-sticky="true"] { box-shadow: var(--ab-shadow); }

  .appbar[data-glass="true"] {
    background: color-mix(
      in oklab,
      var(--ab-bg) calc((1 - var(--opacity-surface-overlay)) * 100%),
      transparent
    );
    backdrop-filter: saturate(1.1) blur(8px);
  }

  @media (prefers-reduced-motion: reduce) {
    .appbar[data-glass="true"] { backdrop-filter: none; }
  }

  /* Optional: go edge-to-edge inside padded containers (e.g., preview) */
  .appbar[data-bleed="true"] {
    margin-left: calc(-1 * var(--ab-pad-left));
    margin-right: calc(-1 * var(--ab-pad-right));
  }

  /* Layout: left / center / right */
  .appbar__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: var(--ab-gap);
    padding-block: var(--ab-py);
    min-height: var(--ab-h);
  }

  .appbar__left,
  .appbar__right {
    display: flex;
    align-items: center;
    gap: var(--ab-gap);
    min-width: 0;
  }

  .appbar__center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--ab-gap);
    min-width: 0;
  }

  .appbar__right { justify-content: flex-end; }

  /* Horizontal scroll for crowded toolbars */
  .appbar[data-scroll="true"] .appbar__row {
    overflow-x: auto;
    scrollbar-gutter: stable;
  }

  /* Subbar */
  .appbar__subbar:empty { display: none; }

  .appbar__subbar {
    display: flex;
    align-items: center;
    gap: var(--ab-gap);
    padding-block: calc(var(--ab-py) * 0.75);
    border-top: var(--border-width-divider) solid var(--ab-border);
  }
</style>



