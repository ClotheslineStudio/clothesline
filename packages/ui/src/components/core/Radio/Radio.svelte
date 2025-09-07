<!-- Radio.svelte -->
<script lang="ts">
  export let id: string;
  export let name: string;
  export let value: string;
  export let label: string = '';
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let className: string = '';
  export let onChange = (event: Event) => {};

  function handleChange(event: Event) {
    onChange(event);
  }
</script>

<label class="radio-label {className}">
  <input
    id={id}
    name={name}
    type="radio"
    value={value}
    checked={checked}
    disabled={disabled}
    on:change={handleChange}
  />
  <span class="radio-custom"></span>
  {label}
</label>

<style>
  .radio-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    color: var(--base-font-color, #111);
  }

  input[type='radio'] {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .radio-custom {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--border-default-color, #888);
    border-radius: 50%;
    background: var(--background-panel, #fff);
    transition: all 0.2s ease;
    position: relative;
  }

  input[type='radio']:checked + .radio-custom {
    border-color: var(--color-primary-600, #55f);
    background-color: var(--color-primary-100, #eef);
  }

  input[type='radio']:checked + .radio-custom::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary-700, #113);
  }

  input[type='radio']:focus + .radio-custom {
    outline: 2px solid var(--color-primary-500, #99f);
    outline-offset: 2px;
  }

  .radio-label:has(input[disabled]) {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>

