<script lang="ts">
  import type { IconStyle } from '$lib/types/icon';
  import OklchColorPicker from '$lib/components/OklchColorPicker.svelte';

  import { Switch, Button } from '@clothesline/ui';

  export let style: IconStyle = 'stroke';
  export let color = '#6381F8';
  export let secondaryColor = '#6381F8'; // for duotone
  export let strokeWidth = 2;
  export let size = 16;
  export let absolute = false;
  export let availableStyles: IconStyle[] = ['stroke', 'filled', 'duotone'];
  export let onStyleChange: (style: IconStyle) => void = () => {};

  function setStyle(newStyle: IconStyle) {
    if (newStyle === 'animated') return; // disabled for now
    if (!availableStyles.includes(newStyle)) return;
    onStyleChange(newStyle);
  }

  function isStyleDisabled(opt: IconStyle) {
    if (opt === 'animated') return true;
    return !availableStyles.includes(opt);
  }
</script>

<div
  class="customizer-card w-full space-y-5"
>
  <div class="space-y-1.5">
    <h2 class="text-[20px] leading-none font-semibold text-(--base-font-color,var(--on-surface))">
      Customizer
    </h2>
    <p class="text-[14px] leading-snug text-(--text-muted,var(--color-surface-700))">
      Adjust how icons are rendered in the grid.
    </p>
  </div>

  <!-- Style -->
  <section class="space-y-2.5">
    <h3 class="section-label">
      Style
    </h3>

    <div class="grid grid-cols-2 gap-2">
      {#each ['stroke','filled','duotone','animated'] as opt}
        <Button
          type="button"
          size="sm"
          variant={style === opt ? 'solid' : 'outline'}
          color={style === opt ? 'primary' : 'neutral'}
          disabled={isStyleDisabled(opt as IconStyle)}
          ariaLabel={`Use ${opt} icon style`}
          aria-pressed={style === opt}
          class="w-full justify-center text-[16px] rounded-[12px]"
          style={style === opt
            ? '--button-radius: 12px; background: var(--primary, var(--color-primary-600-vis)); border-color: var(--primary, var(--color-primary-600-vis)); color: var(--on-primary, var(--color-surface-0)); box-shadow: 0 2px 8px color-mix(in oklab, var(--primary, #6381f8) 35%, transparent);'
            : '--button-radius: 12px; background: var(--background-panel, var(--color-surface-50)); border-color: var(--color-primary-400-vis, var(--primary, #6381f8)); color: var(--on-surface, var(--color-surface-900));'}
          onclick={() => setStyle(opt as IconStyle)}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </Button>
      {/each}
    </div>
  </section>

  <!-- Colors -->
  <section class="space-y-2.5">
    <h3 class="section-label">
      Colors
    </h3>

    <div class="space-y-2">
      <OklchColorPicker
        label="Primary Color"
        bind:value={color}
      />

      {#if style === 'duotone'}
        <OklchColorPicker
          label="Secondary Color"
          bind:value={secondaryColor}
        />
      {/if}
    </div>
  </section>

  <!-- Stroke Width -->
  <section class="space-y-1.5 pt-1">
    <label
      for="stroke-width"
      class="flex justify-between items-center text-[14px] font-medium text-(--text-muted,var(--color-surface-700))"
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
      class="w-full custom-range"
    />
  </section>

  <!-- Size -->
  <section class="space-y-1.5">
    <label
      for="size"
      class="flex justify-between items-center text-[14px] font-medium text-(--text-muted,var(--color-surface-700))"
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
      class="w-full custom-range"
    />
  </section>

  <!-- Absolute Stroke Width -->
  <section class="flex items-center justify-between gap-2 pt-(--spacing-1)">
    <span class="text-[16px] text-(--text-muted)">
      Absolute stroke width
    </span>

    <Switch
      bind:checked={absolute}
      ariaLabel="Use absolute stroke width"
      name="absolute-stroke-width"
    />
  </section>
</div>

<style>
  .customizer-card {
    border-radius: 0.72rem;
    border: 1px solid color-mix(in oklab, var(--on-surface) 10%, transparent);
    background: var(--card-bg, var(--color-surface-50));
    box-shadow: var(--card-shadow, 0 8px 20px rgba(15, 23, 42, 0.1));
    padding: 1rem;
  }

  .section-label {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-muted, var(--color-surface-700));
  }

  .custom-range {
    appearance: none;
    -webkit-appearance: none;
    height: 0.58rem;
    border-radius: 999px;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  }

  .custom-range::-webkit-slider-runnable-track {
    height: 0.58rem;
    border-radius: 999px;
    background-color: var(--customizer-range-track, var(--color-surface-300-vis, #c9ced8));
    border: 0;
  }

  .custom-range::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 1.42rem;
    height: 1.42rem;
    border-radius: 999px;
    border: 3px solid var(--background-panel, #f8f9ff);
    background: var(--primary, var(--color-primary-600-vis, #6381f8));
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
    margin-top: calc((0.58rem - 1.42rem) / 2);
  }

  .custom-range::-moz-range-track {
    height: 0.58rem;
    border-radius: 999px;
    background-color: var(--customizer-range-track, var(--color-surface-300-vis, #c9ced8));
    border: 0;
  }

  .custom-range::-moz-range-progress {
    height: 0.58rem;
    border-radius: 999px;
    background-color: var(--customizer-range-track, var(--color-surface-300-vis, #c9ced8));
  }

  .custom-range::-moz-range-thumb {
    width: 1.42rem;
    height: 1.42rem;
    border-radius: 999px;
    border: 3px solid var(--background-panel, #f8f9ff);
    background: var(--primary, var(--color-primary-600-vis, #6381f8));
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  }
</style>
