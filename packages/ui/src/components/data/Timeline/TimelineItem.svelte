<script lang="ts">
  export let id: string | undefined = undefined;
  export let status: 'active' | 'complete' | 'pending' | 'error' | 'custom' = 'pending';
  export let gap: string = '1.25rem'; // vertical rhythm
</script>

<div
  class="cl-timeline-item"
  role="listitem"
  data-status={status}
  {id}
  style={`--tl-item-gap:${gap};`}
>
  <!-- rail column: node goes here -->
  <div class="cl-timeline-item__rail">
    <slot name="node" />
  </div>

  <!-- content column: card goes here -->
  <div class="cl-timeline-item__card">
    <slot name="card" />
  </div>
</div>

<style>
  .cl-timeline-item {
    display: contents; /* let children occupy the 2 columns of Timeline grid */
  }

  /* rail cell (col 1) */
  .cl-timeline-item__rail {
    grid-column: 1 / 2;
    display: grid;
    place-items: center;       /* node perfectly centered on rail */
    padding-block: .25rem;     /* slight breathing room so line doesn’t touch node halo */
    margin-block: calc(var(--tl-item-gap) / 2);
    position: relative;
    z-index: 1;                /* keep node above the track */
  }

  /* card cell (col 2) */
  .cl-timeline-item__card {
    grid-column: 2 / 3;
    margin-block: calc(var(--tl-item-gap) / 2);
  }
</style>

