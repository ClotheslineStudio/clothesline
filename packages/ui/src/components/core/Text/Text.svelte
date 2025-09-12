<script lang="ts">
  export let variant:
    | 'body'
    | 'heading'
    | 'subheading'
    | 'caption'
    | 'overline'
    | 'code'
    | 'lead' = 'body';

  export let as: keyof HTMLElementTagNameMap = 'span';
  export let className = '';
</script>

<svelte:element
  this={as}
  class={`cl-text cl-text-${variant} ${className}`}
>
  <slot />
</svelte:element>

<style>
  .cl-text {
    color: var(--base-font-color, #111);
    line-height: var(--line-height-base, 1.5);
  }

  .cl-text-body {
    font-size: var(--text-base, 1rem);
    font-weight: 400;
  }

  .cl-text-heading {
    font-size: var(--text-xl, 1.25rem);
    font-weight: 700;
  }

  .cl-text-subheading {
    font-size: var(--text-lg, 1.125rem);
    font-weight: 600;
  }

  .cl-text-caption {
    font-size: var(--text-sm, 0.875rem);
    color: var(--muted-font-color, #666);
  }

  .cl-text-overline {
    font-size: var(--text-xs, 0.75rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-font-color, #666);
  }

  .cl-text-code {
    font-family: var(--font-mono, monospace);
    background: var(--color-surface-100, #f4f4f4);
    padding: 0.125rem 0.25rem;
    border-radius: var(--radius-sm, 0.25rem);
    font-size: var(--text-sm, 0.875rem);
  }

  .cl-text-lead {
    font-size: var(--text-lg, 1.125rem);
    font-weight: 400;
    color: var(--base-font-color, #333);
  }
</style>