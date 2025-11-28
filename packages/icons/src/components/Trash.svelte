<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  // PUBLIC PROPS
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
  export let secondaryColor: string = "currentColor";

  export let variant: "stroke" | "filled" | "duotone" | "animated" = "stroke";
  export let ariaLabel: string | undefined = undefined;

  // DERIVED
  $: svgSize = typeof size === "number" ? size : parseFloat(size);

  // Lucide-style stroke math
  $: resolvedStroke =
    absoluteStrokeWidth
      ? strokeWidth
      : (strokeWidth / 24) * svgSize;

  const LINECAP = "round";
  const LINEJOIN = "round";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={svgSize}
  height={svgSize}
  viewBox="0 0 24 24"
  fill="none"
  stroke-linecap={LINECAP}
  stroke-linejoin={LINEJOIN}
  aria-label={ariaLabel}
  aria-hidden={ariaLabel ? undefined : "true"}
  shape-rendering="geometricPrecision"
>
  {#if variant === "filled"}
    <!-- FILLED -->
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      <g id="Property 1=filled"><g id="Vector"><path fill="currentColor" d="M17 8H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6zm2 1h3a1 1 0 1 1 0 2h-1v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8H4a1 1 0 0 1 0-2h3V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3z"/><path fill="currentColor" d="M20 6a1 1 0 1 1 0 2h-1v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8H4a1 1 0 0 1 0-2zm-10 4a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1m4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1"/></g></g>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M6 19V7h2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"/>
    </g>

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M6 7H4m2 0h2m10 0h2m-2 0h-2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 7h8m-6 10v-6m4 6v-6"/>
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M6 7H4m2 0h2m10 0h2m-2 0h-2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M8 7h8"/><path d="M10 17v-6"/><path d="M14 17v-6"/>
    </g>
  {/if}
</svg>
