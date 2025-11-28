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
      <path fill="currentColor" d="M11 20a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm-4-6a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2zm4-6a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zM7 2a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M11 9h10m0 12H11"/>
<path d="M7 3h14m0 12H7"/>
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M21 3H7m14 6H11m10 6H7m14 6H11"/>
    </g>
  {/if}
</svg>
