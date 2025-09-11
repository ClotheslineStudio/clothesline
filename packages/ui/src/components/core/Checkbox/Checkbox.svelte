<script lang="ts">
  export let id = '';
  export let name = '';
  export let value = '';
  export let label = 'Checkbox';
  export let checked = false;
  export let disabled = false;

  // 👇 Add this: enables <Checkbox bind:group={arr} .../>
  export let group: string[] | undefined = undefined;
</script>

<label class="checkbox">
  {#if group !== undefined}
    <!-- When used in a group (arrays), bind to `group` -->
    <input
      id={id}
      type="checkbox"
      name={name}
      value={value}
      bind:group={group}
      disabled={disabled}
    />
  {:else}
    <!-- Otherwise, normal single checkbox with bind:checked -->
    <input
      id={id}
      type="checkbox"
      name={name}
      value={value}
      bind:checked
      disabled={disabled}
    />
  {/if}

  <span class="box">
    <svg class="check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  </span>
  <span class="label-text">{label}</span>
</label>

<style>
  .checkbox {
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

  .box {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-primary-700, #4c51bf);
    background-color: var(--color-primary-50, #edf2f7);
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, border-color 0.2s;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .check {
    width: 0.75rem;
    height: 0.75rem;
    stroke: var(--color-primary-800, #2a4365);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  input:checked + .box .check {
    opacity: 1;
    transform: scale(1);
  }

  input:focus + .box {
    outline: 2px solid var(--color-primary-400, #a3bffa);
    outline-offset: 2px;
  }

  input:disabled + .box {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .label-text {
    color: var(--color-primary-900, #1a202c);
  }
</style>