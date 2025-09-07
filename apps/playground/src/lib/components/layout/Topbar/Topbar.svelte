<script lang="ts">
  export let ariaLabel: string = 'Topbar';
  export let sticky: boolean = false;
  export let elevated: boolean = true;
  export let border: boolean = true;
  export let glass: boolean = false;
  export let density: 'sm' | 'md' | 'lg' = 'md';
  export let wrap: boolean = true;
  export let scrollOverflow: boolean = false;
  export let height: string = ''; // optional explicit height
  export let zIndex: string = ''; // optional override

  // Compute data attributes for styling
  $: dataSticky = sticky ? 'true' : 'false';
  $: dataElevated = elevated ? 'true' : 'false';
  $: dataBorder = border ? 'true' : 'false';
  $: dataGlass = glass ? 'true' : 'false';
  $: dataWrap = wrap ? 'wrap' : 'nowrap';
  $: dataScroll = scrollOverflow ? 'scroll' : 'auto';
</script>

<div
  class="cl-topbar"
  role="toolbar"
  aria-label={ariaLabel}
  data-sticky={dataSticky}
  data-elevated={dataElevated}
  data-border={dataBorder}
  data-glass={dataGlass}
  data-density={density}
  data-wrap={dataWrap}
  data-scroll={dataScroll}
  style={`
    ${height ? `--topbar-height:${height};` : ''}
    ${zIndex ? `--topbar-z:${zIndex};` : ''}
  `}
>
  <div class="cl-topbar-row">
    <div class="cl-topbar-left">
      <slot name="left" />
    </div>
    <div class="cl-topbar-center">
      <slot name="center" />
    </div>
    <div class="cl-topbar-right">
      <slot name="right" />
    </div>
  </div>

  <div class="cl-topbar-subbar">
    <slot name="subbar" />
  </div>
</div>

<style>
  .cl-topbar {
    --_bg: var(--topbar-bg, var(--color-surface-0, #fff));
    --_border: var(--topbar-border, rgba(0,0,0,0.08));
    --_shadow: var(--topbar-shadow, 0 1px 2px rgba(0,0,0,0.06));
    --_gap: var(--topbar-gap, 0.5rem);
    --_px: var(--topbar-px, 1rem);
    --_py: var(--topbar-py, 0.5rem);
    --_z: var(--topbar-z, 90);

    background: var(--_bg);
    border-bottom: 1px solid transparent;
    position: relative;
  }

  /* Density → height & padding */
  .cl-topbar[data-density="sm"] { --_py: 0.375rem; }
  .cl-topbar[data-density="md"] { --_py: 0.5rem; }
  .cl-topbar[data-density="lg"] { --_py: 0.75rem; }

  .cl-topbar[data-density="sm"] { --_height: var(--topbar-height-sm, 40px); }
  .cl-topbar[data-density="md"] { --_height: var(--topbar-height-md, 48px); }
  .cl-topbar[data-density="lg"] { --_height: var(--topbar-height-lg, 56px); }

  /* Explicit height overrides density token */
  .cl-topbar[style*="--topbar-height"] { --_height: var(--topbar-height); }

  /* Sticky support */
  .cl-topbar[data-sticky="true"] {
    position: sticky;
    top: 0;
    z-index: var(--_z);
  }

  /* Border & elevation */
  .cl-topbar[data-border="true"] {
    border-bottom-color: var(--_border);
  }
  .cl-topbar[data-elevated="true"][data-sticky="true"] {
    box-shadow: var(--_shadow);
  }

  /* Glass */
  .cl-topbar[data-glass="true"] {
    background: color-mix(in oklab, var(--_bg) 70%, transparent);
    backdrop-filter: saturate(1.1) blur(8px);
  }
  @media (prefers-reduced-motion: reduce) {
    .cl-topbar[data-glass="true"] {
      backdrop-filter: none;
    }
  }

  /* Primary row */
  .cl-topbar-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr; /* center can auto-size; sides flex */
    align-items: center;
    gap: var(--_gap);
    padding: var(--_py) var(--_px);
    min-height: var(--_height);
  }

  .cl-topbar-left,
  .cl-topbar-right {
    display: flex;
    align-items: center;
    gap: var(--_gap);
  }

  .cl-topbar-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--_gap);
    min-width: 0; /* allow truncation */
  }

  /* Subbar (tabs, filters) */
  .cl-topbar-subbar:empty { display: none; }
  .cl-topbar-subbar {
    display: flex;
    align-items: center;
    gap: var(--_gap);
    padding: calc(var(--_py) * 0.75) var(--_px);
    border-top: 1px solid var(--_border);
  }

  /* Wrapping vs horizontal scroll */
  .cl-topbar-row,
  .cl-topbar-subbar {
    flex-wrap: wrap;
  }
  .cl-topbar[data-wrap="nowrap"] .cl-topbar-row,
  .cl-topbar[data-wrap="nowrap"] .cl-topbar-subbar {
    flex-wrap: nowrap;
  }
  .cl-topbar[data-scroll="scroll"] .cl-topbar-row,
  .cl-topbar[data-scroll="scroll"] .cl-topbar-subbar {
    overflow-x: auto;
    scrollbar-gutter: stable;
  }
</style>
