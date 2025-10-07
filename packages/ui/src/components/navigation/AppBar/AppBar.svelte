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
  /* AppBar reads SURFACE + ON-SURFACE tokens; no hard-coded colors.
     Override hooks: --topbar-bg/fg/border if you need per-page tweaks. */
  .appbar {
    /* Surface defaults (flip automatically after your ramp fix) */
    --ab-bg:     var(--topbar-bg, var(--color-surface-100));
    --ab-fg:     var(--topbar-fg, var(--on-surface));
    --ab-border: var(--topbar-border, var(--color-surface-300));
    --ab-shadow: var(--topbar-shadow, 0 1px 2px rgba(0,0,0,.06));

    /* Gutters: consume shared page gutter when present */
    --ab-px: var(--topbar-px, var(--page-gutter-x, 1rem));
    --ab-gap: var(--topbar-gap, .5rem);
    --ab-z: var(--topbar-z, 90);

    /* Density heights */
    --ab-h-sm: 40px;
    --ab-h-md: 48px;
    --ab-h-lg: 56px;

    /* Region paints its own surface; children inherit text color */
    background: var(--ab-bg);
    color: var(--ab-fg);
    border-bottom: 1px solid transparent;
    position: relative;
    width: 100%;

    /* Safe-area aware paddings (used by bleed calc too) */
    --ab-pad-left:  max(var(--ab-px), env(safe-area-inset-left));
    --ab-pad-right: max(var(--ab-px), env(safe-area-inset-right));
    padding-left: var(--ab-pad-left);
    padding-right: var(--ab-pad-right);
  }

  .appbar[data-density="sm"] { --ab-h: var(--appbar-height, var(--ab-h-sm)); --ab-py: .375rem; }
  .appbar[data-density="md"] { --ab-h: var(--appbar-height, var(--ab-h-md)); --ab-py: .5rem;   }
  .appbar[data-density="lg"] { --ab-h: var(--appbar-height, var(--ab-h-lg)); --ab-py: .75rem;  }
  .appbar[style*="--appbar-height"] { --ab-h: var(--appbar-height); }

  .appbar[data-sticky="true"] { position: sticky; top: 0; z-index: var(--ab-z); }
  .appbar[data-border="true"] { border-bottom-color: var(--ab-border); }
  .appbar[data-elevated="true"][data-sticky="true"] { box-shadow: var(--ab-shadow); }

  .appbar[data-glass="true"] {
    background: color-mix(in oklab, var(--ab-bg) 72%, transparent);
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

  /* Layout: left / center / right with true right alignment */
  .appbar__row {
    display: grid;
    grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
    align-items: center;
    gap: var(--ab-gap);
    padding-block: var(--ab-py);
    min-height: var(--ab-h);
  }
  .appbar__left,
  .appbar__right { display:flex; align-items:center; gap:var(--ab-gap); min-width:0; }
  .appbar__center { display:flex; align-items:center; justify-content:center; gap:var(--ab-gap); min-width:0; }
  .appbar__right { justify-content:flex-end; }

  /* Horizontal scroll for crowded toolbars (grid container) */
  .appbar[data-scroll="true"] .appbar__row {
    overflow-x: auto;
    scrollbar-gutter: stable;
  }

  /* Subbar for tabs/filters; inherits region color */
  .appbar__subbar:empty { display: none; }
  .appbar__subbar {
    display:flex; align-items:center; gap:var(--ab-gap);
    padding-block: calc(var(--ab-py) * .75);
    border-top: 1px solid var(--ab-border);
  }

  /* Recommendation: inside slots, keep icons using currentColor so they follow text */
  /* e.g., .icon { stroke: currentColor; fill: currentColor; } */
</style>


