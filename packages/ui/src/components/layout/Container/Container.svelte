<script lang="ts">
  export let as: 'div' | 'section' | 'main' | 'article' = 'div';
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';
  export let center = true;
  export let padded = true;
  export let className = '';
</script>

<svelte:element
  this={as}
  class={`cl-container cl-container--${size} ${center ? 'cl-container--center' : ''} ${padded ? 'cl-container--padded' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
>
  <slot />
</svelte:element>

<style>
  .cl-container {
    width: 100%;
  }

  .cl-container--center {
    margin-inline: auto;
  }

  .cl-container--padded {
    padding-inline: var(--page-gutter-x, var(--spacing-6, 1.5rem));
  }

  .cl-container--sm {
    max-width: var(--layout-container-sm, 40rem);
  }

  .cl-container--md {
    max-width: var(--layout-container-md, 48rem);
  }

  .cl-container--lg {
    max-width: var(--layout-container-lg, 64rem);
  }

  .cl-container--xl {
    max-width: var(--layout-container-xl, 72rem);
  }

  .cl-container--full {
    max-width: 100%;
  }
</style>
