<script lang="ts">
  export let id: string = '';
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let label: string = '';
  export let onChange: (val: boolean) => void = () => {};

  function toggle() {
    if (!disabled) {
      checked = !checked;
      onChange(checked);
    }
  }
</script>

<label class="cl-switch-wrapper">
  <input
    id={id}
    type="checkbox"
    role="switch"
    class="cl-switch-input"
    bind:checked
    {disabled}
    on:change={toggle}
  />
  <span class="cl-switch-slider"></span>
  {#if label}
    <span class="cl-switch-label">{label}</span>
  {/if}
</label>

<style>
  .cl-switch-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .cl-switch-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .cl-switch-slider {
    width: 2.25rem;
    height: 1.25rem;
    background-color: var(--surface-muted, #ccc);
    border-radius: 9999px;
    position: relative;
    transition: background-color 0.2s ease;
  }

  .cl-switch-slider::before {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 0.125rem;
    top: 0.125rem;
    border-radius: 50%;
    background-color: var(--color-primary-900, #fff);
    transition: transform 0.2s ease;
  }

  .cl-switch-input:checked + .cl-switch-slider {
    background-color: var(--color-primary-500, #99f);
  }

  .cl-switch-input:checked + .cl-switch-slider::before {
    transform: translateX(1rem);
  }

  .cl-switch-label {
    font-size: 0.875rem;
    color: var(--text-default-color, #111);
  }

  .cl-switch-input:disabled + .cl-switch-slider {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
