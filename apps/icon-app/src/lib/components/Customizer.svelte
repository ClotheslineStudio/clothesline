<script lang="ts">
  import type { IconStyle } from '$lib/types/icon';
  // Removed import of primaryColor because we cannot bind to imports in Svelte

  export let style: IconStyle = 'stroke';
  export let color = '#6381F8';
  export let secondaryColor = '#6381F8';   // for duotone
  export let strokeWidth = 2;
  export let size = 16;
  export let absolute = false;

  // Use a local variable for the primary color picker
  let primaryColorValue = color;

  // Update the exported color when the local value changes
  $: color = primaryColorValue;

  function setStyle(newStyle: IconStyle) {
    if (newStyle === 'animated') return; // disabled for now
    style = newStyle;
  }
</script>

<div class="p-4 bg-white border border-neutral-200 rounded-xl shadow-sm space-y-4 w-full">
  <h2 class="text-sm font-semibold">Customizer</h2>

  <!-- Style buttons -->
<div class="grid grid-cols-2 gap-2">
  {#each ['stroke','filled','duotone','animated'] as opt}
    <button
      disabled={opt === 'animated'}
      on:click={() => setStyle(opt as IconStyle)}
      class="
        px-3 py-1.5 text-xs rounded-md border text-center w-full
        disabled:opacity-40 disabled:cursor-not-allowed
        {style === opt
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white border-neutral-300 hover:bg-neutral-100'}
      "
    >
      {opt.charAt(0).toUpperCase() + opt.slice(1)}
    </button>
  {/each}
    <input
      id="primary-color"
      type="color"
      bind:value={primaryColorValue}
      class="h-7 w-full rounded border border-neutral-300 cursor-pointer"
    />

    {#if style === 'duotone'}
      <label for="secondary-color" class="text-xs font-medium text-neutral-700 pt-2">Secondary Color</label>
      <input
        id="secondary-color"
        type="color"
        bind:value={secondaryColor}
        class="h-7 w-full rounded border border-neutral-300 cursor-pointer"
      />
    {/if}
  </div>

  <!-- Stroke Width -->
  <div class="space-y-1 pt-2">
    <label for="stroke-width" class="flex justify-between text-xs font-medium text-neutral-700">
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
  </div>

  <!-- Size -->
  <div class="space-y-1">
    <label for="size" class="flex justify-between text-xs font-medium text-neutral-700">
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
  </div>

  <!-- Absolute Stroke Width -->
  <div class="flex items-center justify-between pt-2">
    <span class="text-xs font-medium text-neutral-700">Absolute Stroke Width</span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        bind:checked={absolute}
        class="sr-only peer"
      />
      <div class="
        w-10 h-5 bg-neutral-300 rounded-full peer
        peer-checked:bg-blue-600
        after:content-['']
        after:absolute after:h-4 after:w-4 after:bg-white after:rounded-full
        after:top-0.5 after:left-0.5 after:transition-all
        peer-checked:after:translate-x-5
      "></div>
    </label>
  </div>
</div>
