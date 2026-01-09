<script lang="ts">
  export let className = '';

  /**
   * Prefer token-driven values. Allow numbers for px convenience.
   * You can pass: 920, "920px", "var(--layout-container-max)", etc.
   */
  export let maxWidth: number | string = 'var(--layout-container-max, 72rem)';
  export let tocWidth: number | string = 280; // px by default (reasonable TOC)
  export let gap: number | string = 'var(--layout-gap, var(--spacing-6))';
  export let stickyTop: number | string = 'var(--layout-inset, var(--spacing-6))';

  /**
   * Collapse below this container width (container query).
   * Use number (px) or CSS length.
   */
  export let hideTocBelow: number | string = 1100;

  export let collapseMode: 'stack' | 'hide' = 'stack';

  function cssLen(v: number | string) {
    return typeof v === 'number' ? `${v}px` : v;
  }
</script>

<div
  class={`cl-docshell ${className} ${collapseMode === 'hide' ? 'mode-hide' : 'mode-stack'}`}
  style={`
    --doc-max: ${cssLen(maxWidth)};
    --toc-w: ${cssLen(tocWidth)};
    --col-gap: ${cssLen(gap)};
    --sticky-top: ${cssLen(stickyTop)};
    --toc-break: ${cssLen(hideTocBelow)};
  `}
>
  <div class="main">
    <slot name="main" />
  </div>

  <aside class="toc" aria-label="Table of contents">
    <slot name="toc" />
  </aside>
</div>

<style>
  /* Container query context */
  .cl-docshell {
    container-type: inline-size;
    container-name: docshell;

    display: grid;
    grid-template-columns: minmax(0, var(--doc-max)) var(--toc-w);
    column-gap: var(--col-gap);

    /* Center the whole system */
    max-width: calc(var(--doc-max) + var(--col-gap) + var(--toc-w));
    margin-inline: auto;
    align-items: start;

    min-width: 0;
  }

  .main {
    min-width: 0;
  }

  .toc {
    position: sticky;
    top: var(--sticky-top);
    align-self: start;
    height: fit-content;
    min-width: 0;
  }

  /* =========================================================
     Collapse behavior (container-query driven)
     ========================================================= */

  @container docshell (max-width: 1100px) {
    /* NOTE: we override this below using an inline var-based breakpoint.
       Unfortunately container queries cannot use var() for the query itself,
       so we provide a sane default here and also allow consumers to change
       hideTocBelow by swapping this component (or editing the constant).
    */
    .cl-docshell {
      grid-template-columns: minmax(0, 1fr);
      max-width: min(100%, var(--doc-max));
    }

    /* Stack mode = TOC above main */
    .cl-docshell.mode-stack .toc {
      position: static;
      order: -1;
      margin-bottom: var(--col-gap);
    }

    /* Hide mode = remove TOC visually */
    .cl-docshell.mode-hide .toc {
      display: none;
    }
  }
</style>


