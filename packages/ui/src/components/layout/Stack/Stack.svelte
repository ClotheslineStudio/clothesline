<script lang="ts">
  export let as: keyof HTMLElementTagNameMap = 'div';
  export let direction: 'row' | 'column' = 'column';
  export let gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let align: 'stretch' | 'start' | 'center' | 'end' = 'stretch';
  export let justify: 'start' | 'center' | 'end' | 'between' = 'start';
  export let wrap = false;
  export let className = '';
</script>

<svelte:element
  this={as}
  class={`cl-stack cl-stack--${direction} cl-stack--gap-${gap} cl-stack--align-${align} cl-stack--justify-${justify} ${wrap ? 'cl-stack--wrap' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
>
  <slot />
</svelte:element>

<style>
  .cl-stack {
    display: flex;
    min-width: 0;
  }

  .cl-stack--column {
    flex-direction: column;
  }

  .cl-stack--row {
    flex-direction: row;
  }

  .cl-stack--wrap {
    flex-wrap: wrap;
  }

  .cl-stack--gap-none { gap: 0; }
  .cl-stack--gap-xs { gap: var(--spacing-1, 0.25rem); }
  .cl-stack--gap-sm { gap: var(--spacing-2, 0.5rem); }
  .cl-stack--gap-md { gap: var(--spacing-3, 0.75rem); }
  .cl-stack--gap-lg { gap: var(--spacing-5, 1rem); }
  .cl-stack--gap-xl { gap: var(--spacing-7, 1.5rem); }

  .cl-stack--align-stretch { align-items: stretch; }
  .cl-stack--align-start { align-items: flex-start; }
  .cl-stack--align-center { align-items: center; }
  .cl-stack--align-end { align-items: flex-end; }

  .cl-stack--justify-start { justify-content: flex-start; }
  .cl-stack--justify-center { justify-content: center; }
  .cl-stack--justify-end { justify-content: flex-end; }
  .cl-stack--justify-between { justify-content: space-between; }
</style>
