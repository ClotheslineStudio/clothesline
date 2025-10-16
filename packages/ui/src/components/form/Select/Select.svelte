<script context="module" lang="ts">
  export type SelectItem = { value: string | number; label: string; disabled?: boolean };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  /**
   * Select – accessible, token-friendly native <select>
   * - Single select with bind:value
   * - Items: Array<{ value: string | number; label: string; disabled?: boolean }>
   * - Optional placeholder (rendered as a disabled hidden option)
   * - Emits `commit` on change (with { value })
   * - Sizes: sm | md | lg
   * - Works inside your Field/Label wrappers; no built-in label
   * - Tokens used: --surface, --on-surface, --border-default-color, --radius-*, --focus-ring*
   */

  // Value (string by default because HTML select returns string)
  export let value: string | number | undefined;
  export let items: SelectItem[] = [];

  // UI
  export let placeholder: string | undefined; // shows when value is undefined or ''
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let invalid = false; // style state only

  // Form / a11y
  export let id: string | undefined;
  export let name: string | undefined;
  export let ariaLabel: string | undefined;         // when no external label
  export let ariaDescribedby: string | undefined;   // id of help/error text

  const dispatch = createEventDispatcher<{ commit: { value: string | number | undefined } }>();

  $: _id = id ?? `sel-${Math.random().toString(36).slice(2)}`;

  function onChange(e: Event) {
    const el = e.currentTarget as HTMLSelectElement;
    // HTML always yields string; keep number values if items specify numbers exactly
    const raw = el.value;
    const match = items.find(i => String(i.value) === raw);
    value = match ? match.value : raw;
    dispatch('commit', { value });
  }

  // Inline CSS vars
  $: styleVars = '';
</script>

<div class="sel" data-size={size} data-invalid={invalid} aria-disabled={disabled}>
  <select
    id={_id}
    class="sel__control"
    bind:value
    {name}
    {disabled}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedby}
    on:change={onChange}
    style={styleVars}
  >
    {#if placeholder}
      <!-- Hidden placeholder when a value is not set -->
      <option value="" disabled selected={value === undefined || value === ''} hidden>{placeholder}</option>
    {/if}
    {#each items as it (String(it.value))}
      <option value={String(it.value)} disabled={it.disabled}>{it.label}</option>
    {/each}
  </select>
</div>

<style>
  .sel { display: inline-grid; }
  .sel[data-size='sm'] { --pad-y: .375rem; --pad-x: .625rem; --rad: var(--radius-sm, 8px); --text: .9rem; }
  .sel[data-size='md'] { --pad-y: .5rem;   --pad-x: .75rem;  --rad: var(--radius-md, 10px); --text: 1rem; }
  .sel[data-size='lg'] { --pad-y: .625rem; --pad-x: .875rem; --rad: var(--radius-lg, 12px); --text: 1.05rem; }

  .sel__control {
    appearance: none;
    font: inherit;
    font-size: var(--text);
    color: var(--on-surface, currentColor);
    background: var(--surface, color-mix(in oklab, currentColor 6%, transparent));
    border: var(--border-w, 1px) solid var(--border-default-color, color-mix(in oklab, currentColor 15%, transparent));
    border-radius: var(--rad);
    padding: var(--pad-y) calc(var(--pad-x) + 1.25rem) var(--pad-y) var(--pad-x);
    min-width: 10ch;
    line-height: 1.2;
    outline: none;
    background-image:
      linear-gradient(45deg, transparent 50%, currentColor 50%),
      linear-gradient(135deg, currentColor 50%, transparent 50%),
      linear-gradient(to right, transparent, transparent);
    background-position:
      calc(100% - .8rem) calc(50% - 3px),
      calc(100% - .5rem) calc(50% - 3px),
      calc(100% - 2rem) 0.5rem;
    background-size: 6px 6px, 6px 6px, 1px 1.4em;
    background-repeat: no-repeat;
  }
  .sel__control:focus-visible {
    box-shadow:
      0 0 0 var(--focus-ring-offset, 2px) white,
      0 0 0 calc(var(--focus-ring-w, 2px) + var(--focus-ring-offset, 2px)) var(--focus-ring, oklch(82% 0.25 230));
  }
  .sel[data-invalid='true'] .sel__control {
    border-color: var(--color-error-500, oklch(60% 0.15 27));
  }

  /* High-contrast mode: ensure arrow indicator is visible */
  @media (forced-colors: active) {
    .sel__control { background-image: none; padding-right: calc(var(--pad-x) + .75rem); }
  }
</style>

<!--
USAGE

<script lang="ts">
  import Select from '$lib/components/form/Select.svelte';
  let vision = 'none';
  const items = [
    { value: 'none', label: 'Vision' },
    { value: 'mono', label: 'Mono' },
    { value: 'protan', label: 'Protan' },
    { value: 'deutan', label: 'Deutan' },
    { value: 'tritan', label: 'Tritan' },
  ];
</script>

<Select bind:value={vision} {items} placeholder="Vision" />

Events:
  <Select bind:value={v} {items} on:commit={(e)=> console.log('value', e.detail.value)} />
-->