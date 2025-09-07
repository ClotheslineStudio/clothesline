<script lang="ts">
  export let id: string = '';
  export let label: string = '';
  export let options: { label: string; value: string }[] = [];
  export let value: string = '';
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let onChange: (val: string) => void = () => {};

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;
    onChange(value);
  }
</script>

<label class="cl-select-wrapper" for={id}>
  {#if label}
    <span class="cl-select-label">{label}</span>
  {/if}
  <select
    id={id}
    bind:value
    disabled={disabled}
    required={required}
    on:change={handleChange}
    class="cl-select"
  >
    {#each options as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
</label>

<style>
  .cl-select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cl-select-label {
    font-size: 0.875rem;
    color: var(--text-muted-color, #666);
  }

  .cl-select {
    appearance: none;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    border-radius: var(--radius-sm, 0.25rem);
    border: 1px solid var(--border-default-color, #ccc);
    background-color: var(--background-input, #fff);
    color: var(--text-default-color, #111);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg fill='%23333' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
  }

  .cl-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
