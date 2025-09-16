<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color:
    | 'primary' | 'secondary' | 'success' | 'warning'
    | 'error'   | 'info'      | 'neutral' = 'primary';
  import type { ComponentType } from 'svelte';
  export let icon: ComponentType | undefined = undefined;
  export let label: string = '';
</script>

<button
  class="cl-timeline-node"
  data-size={size}
  data-color={color}
  aria-label={label}
  type="button"
>
  {#if icon}
    <span class="cl-timeline-icon">
      <svelte:component this={icon} />
    </span>
  {/if}
  <slot />
</button>

<style>
  .cl-timeline-node {
    --node-bg: var(--timeline-node-bg, var(--color-surface-0, #fff));
    --node-ring: var(--timeline-node-ring, var(--color-surface-400-vis, #a3a3a3));
    --node-halo: var(--timeline-node-halo, var(--color-surface-0, #fff));

    display: inline-grid;
    place-items: center;
    width: 1.4rem; height: 1.4rem;
    border-radius: 999px;
    background: var(--node-bg);
    border: 2px solid var(--node-ring);
    box-shadow: 0 0 0 3px var(--node-halo); /* clean cutout on the rail */
    padding: 0;
  }
  .cl-timeline-node[data-size="sm"] { width: 1.1rem; height: 1.1rem; }
  .cl-timeline-node[data-size="lg"] { width: 1.75rem; height: 1.75rem; }

  /* semantic ring colors (map to your tokens) */
  .cl-timeline-node[data-color="success"]  { border-color: var(--color-success-500-vis, #16a34a); }
  .cl-timeline-node[data-color="info"]     { border-color: var(--color-info-500-vis, #0ea5e9); }
  .cl-timeline-node[data-color="warning"]  { border-color: var(--color-warning-500-vis, #f59e0b); }
  .cl-timeline-node[data-color="error"]    { border-color: var(--color-error-500-vis, #ef4444); }
  .cl-timeline-node[data-color="neutral"]  { border-color: var(--color-surface-500, #737373); }
  /* Removed unused selector: .cl-timeline-icon svg { width: .95rem; height: .95rem; } */
</style>


