<script lang="ts">
  import { getContext } from 'svelte';

  // --- Registry types (optional but supported) ---
  type IconPathsDef = { viewBox?: string; paths: string[] };
  type IconDef = IconPathsDef | any; // Svelte component is also supported

  const REGISTRY_KEY = 'cl:icon-registry';

  // --- Props ---
  export let name: string | undefined = undefined;       // registry name
  export let src: string | undefined = undefined;         // path 'd' string or external .svg URL
  export let size: string | number = '1em';               // maps to --icon-size
  export let color: string = 'currentColor';              // maps to --icon-color
  export let ariaLabel: string | undefined = undefined;   // for meaningful icons
  export let className = '';                              // optional utility

  // Pull an injected registry if your app provides one
  const registry: Map<string, IconDef> | undefined = getContext(REGISTRY_KEY);

  // Normalize size to a CSS string
  $: computedSize = typeof size === 'number' ? `${size}px` : size;

  // Resolve from registry (if present)
  $: regDef = name && registry ? registry.get(name) ?? null : null;

  function isExternalUrl(value?: string) {
    if (!value) return false;
    const v = value.toLowerCase().trim();
    return v.startsWith('http://') || v.startsWith('https://') || v.endsWith('.svg') || v.startsWith('/');
  }
</script>

<span
  class={`cl-icon ${className}`}
  role="img"
  aria-label={ariaLabel}
  aria-hidden={ariaLabel ? undefined : 'true'}
  style={`--icon-size:${computedSize};--icon-color:${color};`}
>
  {#if regDef}
    {#if typeof regDef === 'function'}
      <!-- Svelte component icon (e.g., lucide-svelte) -->
      <svelte:component this={regDef} style="width:100%;height:100%;color:inherit;" />
    {:else}
      <!-- Paths definition from registry -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={regDef.viewBox ?? '0 0 24 24'}
        fill="none"
        stroke="currentColor"
        class="cl-icon-svg"
      >
        {#if ariaLabel}<title>{ariaLabel}</title>{/if}
        {#each regDef.paths as d}
          <path
            d={d}
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        {/each}
      </svg>
    {/if}
  {:else if src}
    {#if isExternalUrl(src)}
      <!-- External SVG URL: theming color won't apply to <img> -->
      <img
        src={src}
        alt={ariaLabel ?? ''}
        aria-hidden={ariaLabel ? undefined : 'true'}
        class="cl-icon-img"
      />
    {:else}
      <!-- Treat src as a single SVG path 'd' string -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        class="cl-icon-svg"
      >
        {#if ariaLabel}<title>{ariaLabel}</title>{/if}
        <path
          d={src}
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {/if}
  {/if}
</span>

<style>
  .cl-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    width: var(--icon-size, 1em);
    height: var(--icon-size, 1em);
    color: var(--icon-color, currentColor);
  }

  /* Ensure child graphics inherit size and color */
  .cl-icon :global(svg),
  .cl-icon :global(img) {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>


