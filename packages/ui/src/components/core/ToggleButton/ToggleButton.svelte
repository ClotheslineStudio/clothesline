<script lang="ts">
  export let on = false;
  export let label = 'Toggle';
  export let onChange: (value: boolean) => void = () => {};

  function toggle() {
    on = !on;          // ✅ update local state
    onChange(on);      // ✅ notify parent
  }
</script>

<button
  type="button"
  class="toggle-btn"
  role="switch"
  aria-checked={on}
  on:click={toggle}
>
  {label}: {on ? 'On' : 'Off'}
</button>

<style>
  .toggle-btn {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm, 0.25rem);
    font-weight: 600;
    border: 1px solid var(--border-default-color, #ccc);
    background-color: var(--color-primary-50, #eef);
    color: var(--color-primary-900, #113);
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .toggle-btn[aria-checked='true'] {
    background-color: var(--color-primary-200, #cce);
  }

  .toggle-btn:focus {
    outline: 2px solid var(--color-primary-500, #99f);
    outline-offset: 2px;
  }
</style>

