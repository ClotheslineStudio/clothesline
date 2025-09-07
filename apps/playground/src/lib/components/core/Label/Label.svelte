<script lang="ts">
  export let forId: string | undefined = undefined;
  export let required = false;
  export let visuallyHidden = false;
  export let className = '';
</script>

<label
  for={forId}
  class={`cl-label ${visuallyHidden ? 'cl-sr-only' : ''} ${className}`}
>
  <slot />
  {#if required}
    <span aria-hidden="true" class="cl-label-required">*</span>
  {/if}
</label>

<style>
  .cl-label {
    display: inline-block;
    font-weight: 500;
    font-size: var(--text-sm, 0.875rem);
    margin-bottom: var(--spacing-1, 0.25rem);
    color: var(--label-font-color, #222);
  }

  .cl-label-required {
    color: var(--color-error-500, red);
    margin-left: 0.25em;
  }

  .cl-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
