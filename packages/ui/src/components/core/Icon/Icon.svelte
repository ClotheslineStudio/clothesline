<script context="module" lang="ts">
  /** Public types (exported for consumers if they want to build a registry) */
  export type IconPathsDef = { viewBox?: string; paths: string[] };
  export type IconDef = IconPathsDef | any; // Svelte component is also supported

  /** Context key you can use with setContext/getContext in your app */
  export const ICON_REGISTRY_KEY = 'cl:icon-registry' as const;
</script>

<script lang="ts">
  import { getContext } from 'svelte';

  // --- Props ---
  /** Name to resolve from an injected registry */
  export let name: string | undefined = undefined;

  /** Either an SVG path 'd' string, or an external URL (/foo.svg or https://...) */
  export let src: string | undefined = undefined;

  /** Any CSS size (number -> px) */
  export let size: string | number = '1em';

  /** Any CSS color (tokens fine; 'currentColor' by default) */
  export let color: string = 'currentColor';

  /** A11y: provide if the icon conveys meaning; omit for decorative */
  export let ariaLabel: string | undefined = undefined;

  /** Optional class additions */
  export let className = '';

  /** Path stroke width when we draw <path> ourselves */
  export let strokeWidth: number = 1.5;

  /** Optional viewBox when using `src` as a path (defaults to 24) */
  export let viewBox: string = '0 0 24 24';

  // Pull an injected registry if your app provides one
  const registry: Map<string, IconDef> | undefined = getContext(ICON_REGISTRY_KEY);

  // Normalize size to a CSS string
  $: computedSize = typeof size === 'number' ? `${size}px` : size;

  // Resolve from registry (if present)
  $: regDef = name && registry ? registry.get(name) ?? null : null;

  function isExternalUrl(value?: string) {
    if (!value) return false;
    const v = value.toLowerCase().trim();
    return (
      v.startsWith('http://') ||
      v.startsWith('https://') ||
      v.endsWith('.svg') ||
      v.startsWith('/')
    );
  }
</script>

<!-- Container is purely layout; a11y is applied to the inner graphic element -->
<span
  class={`cl-icon ${className}`}
  style={`--icon-size:${computedSize};--icon-color:${color};`}
  data-name={name}
  part="icon"
>
  {#if regDef}
    {#if typeof regDef === 'function'}
      <!-- Svelte component icon (e.g. lucide-svelte) -->
      <svelte:component
        this={regDef}
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : 'true'}
        focusable="false"
        style="width:100%;height:100%;color:inherit;"
      />
    {:else}
      <!-- Paths definition from registry -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={regDef.viewBox ?? '0 0 24 24'}
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : 'true'}
        focusable="false"
        class="cl-icon-svg"
      >
        {#if ariaLabel}<title>{ariaLabel}</title>{/if}
        {#each regDef.paths as d}
          <path
            d={d}
            fill="currentColor"
            stroke="currentColor"
            stroke-width={strokeWidth}
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
        decoding="async"
        loading="lazy"
      />
    {:else}
      <!-- Treat `src` as a single SVG path 'd' string -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : 'true'}
        focusable="false"
        class="cl-icon-svg"
      >
        {#if ariaLabel}<title>{ariaLabel}</title>{/if}
        <path
          d={src}
          fill="currentColor"
          stroke="currentColor"
          stroke-width={strokeWidth}
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
