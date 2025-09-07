<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let className = '';
  export let maxWidth = 900;   // px
  export let tocWidth = 260;   // px
  export let gap = 64;         // px
  export let stickyTop = 16;   // px
  export let hideTocBelow = 1100; // px breakpoint
  export let collapseMode: 'stack' | 'hide' = 'stack';

  let isNarrow = false;

  function update() {
    if (!browser) return;
    isNarrow = window.innerWidth <= hideTocBelow;
  }

  onMount(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });
</script>

<div
  class={`cl-docshell ${className} ${isNarrow ? 'is-narrow' : ''} ${collapseMode === 'hide' ? 'mode-hide' : 'mode-stack'}`}
  style="
    --doc-max:{maxWidth}px;
    --toc-w:{tocWidth}px;
    --col-gap:{gap}px;
    --sticky-top:{stickyTop}px;
  "
>
  <div class="main"><slot name="main" /></div>

  {#if !(isNarrow && collapseMode === 'hide')}
    <aside class="toc" aria-label="Table of contents"><slot name="toc" /></aside>
  {/if}
</div>

<style>
  /* Wide: two columns, centered block */
  .cl-docshell {
    display: grid;
    grid-template-columns: minmax(0, var(--doc-max)) var(--toc-w);
    column-gap: var(--col-gap);
    max-width: calc(var(--doc-max) + var(--col-gap) + var(--toc-w));
    margin-inline: auto;
    align-items: start;
  }

  .main { min-width: 0; }

  .toc {
    position: sticky;
    top: var(--sticky-top);
    align-self: start;
    height: fit-content;
  }

  /* Narrow: single column */
  .cl-docshell.is-narrow {
    grid-template-columns: minmax(0, 1fr);
    max-width: min(100%, var(--doc-max));
  }

  /* Narrow behavior: stack mode = TOC above content */
  .cl-docshell.is-narrow.mode-stack .toc {
    position: static;
    order: -1;
    margin-bottom: var(--col-gap);
  }

  /* Narrow behavior: hide mode is handled by {#if} in markup */
</style>


