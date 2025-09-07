<script lang="ts">
  export let id = '';
  export let name = '';
  export let value = '';
  export let label = 'Option';
  export let checked = false;
  export let disabled = false;
</script>

<label class="radio">
  <input
    id={id}
    type="radio"
    name={name}
    value={value}
    checked={checked}
    on:change={(e) => checked = !!(e.target && (e.target as HTMLInputElement).checked)}
    disabled={disabled}
  />
  <span class="outer">
    <span class="inner"></span>
  </span>
  <span class="label-text">{label}</span>
</label>

<style>
  .radio {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    user-select: none;
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .outer {
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    border: 2px solid var(--color-primary-700, #4c51bf);
    background-color: var(--color-primary-50, #edf2f7);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .inner {
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--color-primary-700, #4c51bf);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.15s ease-in-out;
  }

  input:checked + .outer .inner {
    transform: scale(1);
  }

  input:focus + .outer {
    outline: 2px solid var(--color-primary-400, #a3bffa);
    outline-offset: 2px;
  }

  input:disabled + .outer {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .label-text {
    color: var(--color-primary-900, #1a202c);
  }
</style>

