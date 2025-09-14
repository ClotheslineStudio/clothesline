<script context="module" lang="ts">
  export type SpinnerSize = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  export let size: SpinnerSize = 'md';
  export let label = 'Loading…';
</script>

<div class="cl-spinner" role="status" aria-live="polite" aria-label={label} data-size={size}>
  <div class="ring"></div>
</div>

<style>
  .cl-spinner{ display:inline-grid; place-items:center; }
  .ring{
    border-radius:50%;
    border-style: solid;
    border-width: var(--spinner-thickness);
    inline-size: var(--spinner-size-md);
    block-size:  var(--spinner-size-md);
    border-color: var(--spinner-track);
    border-top-color: var(--spinner-indicator);
    animation: spin .8s linear infinite;
  }
  .cl-spinner[data-size="sm"] .ring{ inline-size: var(--spinner-size-sm); block-size: var(--spinner-size-sm); }
  .cl-spinner[data-size="lg"] .ring{ inline-size: var(--spinner-size-lg); block-size: var(--spinner-size-lg); }
  @keyframes spin { to { transform: rotate(360deg) } }
</style>
