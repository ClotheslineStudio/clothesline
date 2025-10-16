<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Props
  export let value = 0;
  export let min = 0;
  export let max = 100;
  export let step = 1;

  export let label: string | undefined;
  export let help: string | undefined;
  export let suffix: string | undefined;
  export let showValue = true;

  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let disabled = false;

  export let id: string | undefined;
  export let name: string | undefined;
  export let ariaLabel: string | undefined;       // used when no visible label
  export let ariaDescribedby: string | undefined; // external description id

  export let marks: Array<number | { value: number; label?: string }> = [];
  export let color: string | undefined;                           // track fill color
  export let format: ((n: number) => string) | undefined;         // custom formatter

  const dispatch = createEventDispatcher<{ commit: { value: number } }>();

  // Derived
  $: _id = id ?? `rng-${Math.random().toString(36).slice(2)}`;
  $: v = clamp(value, min, max);
  $: pct = ((v - min) / Math.max(1, (max - min))) * 100; // 0..100

  function commit() {
    dispatch('commit', { value: v });
  }
  function clamp(n: number, lo: number, hi: number) {
    return Math.min(Math.max(n, lo), hi);
  }
  function round(n: number, d = 2) {
    return Math.round(n * 10 ** d) / 10 ** d;
  }
  function fmt(n: number) {
    const s = suffix ?? '';
    return typeof format === 'function' ? format(n) : `${round(n, step >= 1 ? 0 : 2)}${s}`;
  }
</script>

<div
  class="rng"
  data-size={size}
  data-orient={orientation}
  aria-disabled={disabled}
  style="--rng-fill: {color ?? 'var(--primary)'}; --rng-pct: {pct}%;">
  {#if label}
    <label class="rng__label" for={_id}>{label}</label>
  {/if}

  <div class="rng__ctrl">
    <input
      id={_id}
      class="rng__input"
      type="range"
      bind:value
      {name}
      {min}
      {max}
      {step}
      {disabled}
      aria-label={label ? undefined : ariaLabel}
      aria-describedby={ariaDescribedby}
      on:change={commit}
      on:keyup={(e) => (e.key === 'Enter' || e.key === 'Escape') && commit()} />

    {#if showValue}
      <output class="rng__value" for={_id} aria-live="polite">{fmt(v)}</output>
    {/if}
  </div>

  {#if help}
    <div class="rng__help" id={ariaDescribedby}>{help}</div>
  {/if}

  {#if marks && orientation === 'horizontal'}
    <div class="rng__marks" aria-hidden="true">
      {#each marks as m (typeof m === 'number' ? m : m.value)}
        {#if typeof m === 'number'}
          <span class="rng__mark" style="left: {((m - min) / (max - min)) * 100}%"></span>
        {:else}
          <span class="rng__mark" style="left: {((m.value - min) / (max - min)) * 100}%">
            {#if m.label}<em class="rng__mark-label">{m.label}</em>{/if}
          </span>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .rng { display: grid; gap: .375rem; }
  .rng[data-size='sm'] { --track-h: 4px; --thumb: 14px; font-size: .9rem; }
  .rng[data-size='md'] { --track-h: 6px; --thumb: 16px; font-size: 1rem; }
  .rng[data-size='lg'] { --track-h: 8px; --thumb: 18px; font-size: 1.05rem; }

  .rng__label { font-weight: 600; font-size: .85em; color: var(--on-surface-strong, currentColor); }
  .rng__help { font-size: .85em; color: color-mix(in oklab, currentColor 60%, transparent); }
  .rng__ctrl { display: grid; align-items: center; grid-template-columns: 1fr auto; gap: .5rem; }
  .rng__value { min-width: 3ch; text-align: right; font-variant-numeric: tabular-nums; }

  /* Base input */
  .rng__input { -webkit-appearance: none; appearance: none; width: 100%; background: transparent; height: var(--track-h); }

  /* Track (WebKit) */
  .rng__input::-webkit-slider-runnable-track {
    height: var(--track-h);
    border-radius: 9999px;
    background:
      linear-gradient(var(--rng-fill), var(--rng-fill)) left/var(--rng-pct) 100% no-repeat,
      color-mix(in oklab, var(--rng-fill) 25%, transparent);
  }
  /* Thumb (WebKit) */
  .rng__input::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: var(--thumb); height: var(--thumb); border-radius: 50%;
    background: var(--rng-fill);
    border: var(--border-w, 1px) solid color-mix(in oklab, black 15%, transparent);
    margin-top: calc((var(--track-h) - var(--thumb)) / 2);
  }
  .rng__input:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 var(--focus-ring-offset, 2px) white,
      0 0 0 calc(var(--focus-ring-w, 2px) + var(--focus-ring-offset, 2px)) var(--focus-ring, oklch(82% 0.25 230));
  }

  /* Firefox */
  .rng__input::-moz-range-track { height: var(--track-h); border-radius: 9999px; background: color-mix(in oklab, var(--rng-fill) 25%, transparent); }
  .rng__input::-moz-range-progress { height: var(--track-h); border-radius: 9999px; background: var(--rng-fill); }
  .rng__input::-moz-range-thumb { width: var(--thumb); height: var(--thumb); border-radius: 50%; background: var(--rng-fill); border: var(--border-w, 1px) solid color-mix(in oklab, black 15%, transparent); }

  /* Marks */
  .rng__marks { position: relative; height: .75rem; margin-top: .125rem; }
  .rng__mark { position: absolute; top: .25rem; width: 1px; height: .5rem; background: color-mix(in oklab, var(--rng-fill) 60%, transparent); transform: translateX(-.5px); }
  .rng__mark-label { position: absolute; top: .6rem; transform: translateX(-50%); font-size: .7em; }
</style>

