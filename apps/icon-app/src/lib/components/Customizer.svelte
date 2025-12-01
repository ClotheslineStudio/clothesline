<script lang="ts">
  import type { IconStyle } from '$lib/types/icon';

  export let style: IconStyle = 'stroke';
  export let color = '#6381F8';
  export let secondaryColor = '#6381F8'; // for duotone
  export let strokeWidth = 2;
  export let size = 16;
  export let absolute = false;

  // local primary color value so we can bind to <input type="color">
  let primaryColorValue = color;

  // whenever the picker changes, update the exported color
  $: color = primaryColorValue;

  function setStyle(newStyle: IconStyle) {
    if (newStyle === 'animated') return; // disabled for now
    style = newStyle;
  }
</script>

<div
  class="
    w-full space-y-4
    rounded-[var(--radius-card,0.75rem)]
    border border-[color:var(--border-default-color,var(--color-surface-300))]
    bg-[color:var(--card-bg,var(--color-surface-50))]
    shadow-[var(--card-shadow,var(--elevation-card,0_8px_20px_rgba(15,23,42,0.12)))]
    p-[var(--spacing-4,1rem)]
  "
>
  <div class="space-y-1">
    <h2 class="text-sm font-semibold text-[color:var(--base-font-color,var(--on-surface))]">
      Customizer
    </h2>
    <p class="text-sm text-[color:var(--text-muted,var(--color-surface-700))]">
      Adjust how icons are rendered in the grid.
    </p>
  </div>

  <!-- Style -->
  <section class="space-y-2">
    <h3 class="text-xs font-medium text-[color:var(--text-muted,var(--color-surface-700))]">
      Style
    </h3>

    <div class="grid grid-cols-2 gap-2">
      {#each ['stroke','filled','duotone','animated'] as opt}
        <button
          type="button"
          disabled={opt === 'animated'}
          on:click={() => setStyle(opt as IconStyle)}
          class={`
            px-3 py-1.5 text-xs
            rounded-[var(--radius-interactive,0.5rem)]
            border text-center w-full
            disabled:opacity-40 disabled:cursor-not-allowed
            ${
              style === opt
                // SELECTED: fill with primary-500, on-primary text, stronger border
                ? 'bg-[color:var(--color-primary-500-vis)] text-[color:var(--on-primary)] border-[color:var(--color-primary-600-vis)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary-500-vis)_40%,transparent)]'
                // UNSELECTED: surface bg + subtle hover
                : 'bg-[color:var(--color-surface-0)] border-[color:var(--border-default-color,var(--color-surface-300))] hover:bg-[color:var(--color-surface-100)]'
            }
          `}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      {/each}
    </div>
  </section>

  <!-- Colors -->
  <section class="space-y-2">
    <h3 class="text-xs font-medium text-[color:var(--text-muted,var(--color-surface-700))]">
      Colors
    </h3>

    <div class="grid grid-cols-[auto,1fr] items-center gap-2">
      <label
        for="primary-color"
        class="text-xs text-[color:var(--text-muted,var(--color-surface-700))]"
      >
        Primary
      </label>
      <input
        id="primary-color"
        type="color"
        bind:value={primaryColorValue}
        class="
          h-7 w-full rounded-sm
          border border-[color:var(--border-default-color,var(--color-surface-300))]
          bg-[color:var(--color-surface-0)]
          cursor-pointer
        "
      />

      {#if style === 'duotone'}
        <label
          for="secondary-color"
          class="text-xs text-[color:var(--text-muted,var(--color-surface-700))]"
        >
          Secondary
        </label>
        <input
          id="secondary-color"
          type="color"
          bind:value={secondaryColor}
          class="
            h-7 w-full rounded-sm
            border border-[color:var(--border-default-color,var(--color-surface-300))]
            bg-[color:var(--color-surface-0)]
            cursor-pointer
          "
        />
      {/if}
    </div>
  </section>

  <!-- Stroke Width -->
  <section class="space-y-1 pt-1">
    <label
      for="stroke-width"
      class="
        flex justify-between items-center
        text-xs font-medium
        text-[color:var(--text-muted,var(--color-surface-700))]
      "
    >
      <span>Stroke width</span>
      <span>{strokeWidth}px</span>
    </label>
    <input
      id="stroke-width"
      type="range"
      min="1"
      max="3"
      step=".5"
      bind:value={strokeWidth}
      class="w-full"
    />
  </section>

  <!-- Size -->
  <section class="space-y-1">
    <label
      for="size"
      class="
        flex justify-between items-center
        text-xs font-medium
        text-[color:var(--text-muted,var(--color-surface-700))]
      "
    >
      <span>Size</span>
      <span>{size}px</span>
    </label>
    <input
      id="size"
      type="range"
      min="12"
      max="48"
      step="2"
      bind:value={size}
      class="w-full"
    />
  </section>

  <!-- Absolute Stroke Width -->
  <section class="flex items-center justify-between pt-1">
    <span class="text-xs font-medium text-[color:var(--text-muted,var(--color-surface-500))]">
      Absolute stroke width
    </span>

    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        bind:checked={absolute}
        class="sr-only peer"
      />
      <div
        class="
          w-10 h-5 rounded-full
          bg-[color:var(--color-surface-500-vis)]
          peer-checked:bg-[color:var(--color-primary-500-vis)]
          transition-colors duration-150
          after:content-['']
          after:absolute after:h-4 after:w-4
          after:bg-[color:var(--color-surface-0)]
          after:rounded-full
          after:top-0.5 after:left-0.5
          after:transition-transform after:duration-150
          peer-checked:after:translate-x-5
          shadow-[0_1px_2px_rgba(0,0,0,0.25)]
        "
      ></div>
    </label>
  </section>
</div>
