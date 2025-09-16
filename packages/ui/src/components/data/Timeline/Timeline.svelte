<script lang="ts">
  export let orientation: 'vertical' | 'horizontal' = 'vertical';
  export let ariaLabel = 'Timeline';
  // rail width controls node center; tweak once and everything aligns
  export let rail: string = '2.25rem';
</script>

<div
  class="cl-timeline"
  role="list"
  aria-label={ariaLabel}
  data-orientation={orientation}
  style={`--tl-rail:${rail}; --tl-track: var(--timeline-track-color, var(--color-surface-400-vis, hsl(240 5% 70%))); --tl-track-w: 2px;`}
>
  <slot />
</div>

<style>
  .cl-timeline {
    /* 2-column grid: rail (nodes) + content (cards) */
    display: grid;
    grid-template-columns: var(--tl-rail) 1fr;
    gap: 0;             /* items handle their own vertical gap */
    position: relative;
  }

  /* draw ONE continuous vertical rail track */
  .cl-timeline[data-orientation="vertical"]::before {
    content: "";
    position: absolute;
    left: calc(var(--tl-rail) / 2 - var(--tl-track-w) / 2);
    top: 0; bottom: 0;
    width: var(--tl-track-w);
    background: var(--tl-track);
    border-radius: 999px;
  }
</style>

