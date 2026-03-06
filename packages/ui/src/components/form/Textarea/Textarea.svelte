<script lang="ts">
  export let id = '';
  export let name = '';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let required = false;
  export let readonly = false;
  export let invalid = false;
  export let rows = 4;
  export let ariaDescribedby: string | undefined = undefined;
  export let className = '';
</script>

<textarea
  id={id}
  name={name}
  rows={rows}
  placeholder={placeholder}
  class={`cl-textarea ${className}`.trim()}
  bind:value
  {disabled}
  {required}
  {readonly}
  aria-invalid={invalid ? 'true' : undefined}
  aria-describedby={ariaDescribedby}
></textarea>

<style>
  .cl-textarea {
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    border-radius: var(--radius-interactive, var(--radius-sm, 0.375rem));
    background-color: var(--background-input, var(--background-surface, #fff));
    color: var(--base-font-color, var(--color-surface-950));
    font-size: var(--type-scale-sm, 0.875rem);
    width: 100%;
    resize: vertical;
    transition: border-color 0.16s ease, box-shadow 0.16s ease;
  }

  .cl-textarea:focus-visible {
    outline: none;
    border-color: var(--focus-color, var(--color-primary-500));
    box-shadow: 0 0 0 var(--focus-width, 2px)
      color-mix(in oklab, var(--focus-color, var(--color-primary-500)) 26%, transparent);
  }

  .cl-textarea[aria-invalid='true'] {
    border-color: var(--text-error, var(--color-error-600));
  }

  .cl-textarea:disabled {
    background-color: var(--surface-disabled, var(--color-surface-200));
    cursor: not-allowed;
    opacity: var(--opacity-disabled, 0.5);
  }
</style>
