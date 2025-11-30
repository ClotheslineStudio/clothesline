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
  {#if variant === "filled" && false}
    <!-- FILLED -->
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      
    </g>

  {:else if variant === "duotone" && false}
    <!-- DUOTONE BACKGROUND -->
    

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M9.769 18H8a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4h-1.769M9.77 18a2.99 2.99 0 0 0 4.462 0M9.77 18a2.985 2.985 0 0 1 0-4m0 4H7a2 2 0 1 1 0-4h2.769m4.462 4H17a2 2 0 1 0 0-4h-2.769m0 4a2.985 2.985 0 0 0 0-4M9.77 14a2.99 2.99 0 0 1 4.462 0M9.77 14H5a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4h-4.769M8 6h8a2 2 0 1 0 0-4H8a2 2 0 1 0 0 4Zm-1 4h10a2 2 0 1 0 0-4H7a2 2 0 1 0 0 4Z"/>
    </g>
  {/if}
</svg>
