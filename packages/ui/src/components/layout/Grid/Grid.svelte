<script lang="ts">
  export let cols: number | undefined = undefined;
  export let minItemWidth: string | undefined = undefined;
  export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let className = '';

  $: template = minItemWidth
    ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
    : `repeat(${cols ?? 12}, minmax(0, 1fr))`;
</script>

<div
  class={`cl-grid cl-grid--gap-${gap} ${className}`.trim()}
  style={`grid-template-columns:${template};`}
>
  <slot />
</div>

<style>
  .cl-grid {
    display: grid;
    width: 100%;
    min-width: 0;
  }

  .cl-grid--gap-none { gap: 0; }
  .cl-grid--gap-xs { gap: var(--spacing-1, 0.25rem); }
  .cl-grid--gap-sm { gap: var(--spacing-2, 0.5rem); }
  .cl-grid--gap-md { gap: var(--spacing-3, 0.75rem); }
  .cl-grid--gap-lg { gap: var(--spacing-5, 1rem); }
  .cl-grid--gap-xl { gap: var(--spacing-7, 1.5rem); }
</style>
