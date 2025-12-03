<script lang="ts">
  import type { IconStyle } from '$lib/types/icon';

  import { Switch, Button } from '@clothesline/ui';

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
    rounded-(--radius-card,0.75rem)
    border border-(--border-default-color,var(--color-surface-300))
    bg-(--card-bg,var(--color-surface-50))
    shadow-(--card-shadow,var(--elevation-card,0_8px_20px_rgba(15,23,42,0.12)))
    p-(--spacing-4,1rem)
  "
>
  <div class="space-y-1">
    <h2 class="text-sm font-semibold text-(--base-font-color,var(--on-surface))">
      Customizer
    </h2>
    <p class="text-sm text-(--text-muted,var(--color-surface-700))">
      Adjust how icons are rendered in the grid.
    </p>
  </div>

  <!-- Style -->
  <section class="space-y-2">
    <h3 class="text-xs font-medium text-(--text-muted,var(--color-surface-700))">
      Style
    </h3>

    <div class="grid grid-cols-2 gap-2">
      {#each ['stroke','filled','duotone','animated'] as opt}
        <Button
          type="button"
          size="sm"
          variant={style === opt ? 'solid' : 'outline'}
          color={style === opt ? 'primary' : 'neutral'}
          disabled={opt === 'animated'}
          ariaLabel={`Use ${opt} icon style`}
          aria-pressed={style === opt}
          class="w-full justify-center text-xs"
          on:click={() => setStyle(opt as IconStyle)}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </Button>
      {/each}
    </div>
  </section>

  <!-- Colors -->
  <section class="space-y-2">
    <h3 class="text-xs font-medium text-(--text-muted,var(--color-surface-700))">
      Colors
    </h3>

    <div class="grid grid-cols-[auto,1fr] items-center gap-2">
      <label
        for="primary-color"
        class="text-xs text-(--text-muted,var(--color-surface-700))"
      >
        Primary
      </label>
      <input
        id="primary-color"
        type="color"
        bind:value={primaryColorValue}
        class="
          h-7 w-full rounded-sm
          border border-(--border-default-color,var(--color-surface-300))
          bg-(--color-surface-0)
          cursor-pointer
        "
      />

      {#if style === 'duotone'}
        <label
          for="secondary-color"
          class="text-xs text-(--text-muted,var(--color-surface-700))"
        >
          Secondary
        </label>
        <input
          id="secondary-color"
          type="color"
          bind:value={secondaryColor}
          class="
            h-7 w-full rounded-sm
            border border-(--border-default-color,var(--color-surface-300))
            bg-(--color-surface-0)
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
        text-(--text-muted,var(--color-surface-700))
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
        text-(--text-muted,var(--color-surface-700))
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
  <section class="flex items-center justify-between gap-2 pt-[var(--spacing-1)]">
    <span
      class="
        text-[length:var(--type-label-size)]
        leading-[var(--type-label-leading)]
        font-[var(--type-label-weight)]
        tracking-[var(--type-label-tracking)]
        uppercase
        text-[color:var(--text-muted)]
      "
    >
      Absolute stroke width
    </span>

    <Switch
      bind:checked={absolute}
      ariaLabel="Use absolute stroke width"
      name="absolute-stroke-width"
    />
  </section>
</div>
