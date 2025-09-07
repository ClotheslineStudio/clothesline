<script lang="ts">
  export let id: string = '';
  export let name: string = '';
  export let type: string = 'text';
  export let value: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let className: string = '';
</script>

<input
  id={id}
  name={name}
  type={type}
  class="cl-input {className}"
  placeholder={placeholder}
  {value}
  {disabled}
  {required}
/>

<style>
  .cl-input {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-default-color, #ccc);
    border-radius: var(--radius-sm, 0.25rem);
    background-color: var(--background-input, #fff);
    color: var(--text-default-color, #111);
    font-size: 0.875rem;
    width: 100%;
    transition: border-color 0.2s ease;
  }

  .cl-input:focus {
    outline: none;
    border-color: var(--color-primary-500, #99f);
    box-shadow: 0 0 0 2px var(--color-primary-200, #cce);
  }

  .cl-input:disabled {
    background-color: var(--surface-muted, #f5f5f5);
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>
