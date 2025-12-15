<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
   

  export let variant: "stroke" | "filled" | "duotone" | "animated" = "stroke";
  export let ariaLabel: string | undefined = undefined;

  $: svgSize = typeof size === "number" ? size : parseFloat(size as any);

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
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      <g id="Property 1=filled"><path id="Vector 36 (Stroke)" fill="currentColor" d="M18.083 5.602a1 1 0 0 1 1.834.796l-6.17 14.224-.007.013-.005.012c-.69 1.48-2.768 1.553-3.561.125l-4.048-7.287a1 1 0 1 1 1.748-.97l4.048 7.285z"/></g>
    </g>

    {:else if variant === "duotone" && false}
    

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Vector 36" d="m19 6-6.171 14.224a1 1 0 0 1-1.78.063L7 13"/></g>
    </g>
  {/if}
</svg>
