<script lang="ts">
  export let legend = '';
  export let description = '';
  export let disabled = false;
  export let className = '';
</script>

<fieldset class={`cl-fieldset ${className}`.trim()} {disabled}>
  {#if legend}
    <legend class="cl-fieldset__legend">{legend}</legend>
  {/if}
  {#if description}
    <p class="cl-fieldset__description">{description}</p>
  {/if}
  <div class="cl-fieldset__content">
    <slot />
  </div>
</fieldset>

<style>
  .cl-fieldset {
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    border-radius: var(--radius-card, var(--radius-md, 0.75rem));
    padding: var(--spacing-4, 1rem);
    margin: 0;
    min-width: 0;
  }

  .cl-fieldset__legend {
    padding-inline: var(--spacing-2, 0.5rem);
    font-size: var(--type-scale-sm, 0.875rem);
    font-weight: var(--type-weight-semibold, 600);
    color: var(--base-font-color, var(--color-surface-950));
  }

  .cl-fieldset__description {
    margin: 0 0 var(--spacing-3, 0.75rem);
    font-size: var(--type-scale-xs, 0.75rem);
    color: var(--on-surface-muted, var(--color-surface-700));
  }

  .cl-fieldset__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3, 0.75rem);
  }
</style>
