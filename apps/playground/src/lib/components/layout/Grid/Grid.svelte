<script lang="ts">
  export let columns: number | string = 12; // number or tailwind-style value like "repeat(auto-fit, minmax(200px, 1fr))"
  export let gap: string = 'var(--spacing-4, 1rem)';
  export let className: string = '';
  export let style: string = '';
</script>

<div
  class={`cl-grid ${className}`}
  style={`display: grid; grid-template-columns: ${typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns}; gap: ${gap}; ${style}`}
>
  <slot />
</div>

<style>
  .cl-grid {
    width: 100%;
  }
</style>
