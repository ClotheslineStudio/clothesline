<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
  export const secondaryColor: string = "currentColor";

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
  {#if variant === "filled" && false}
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      
    </g>

  {:else if variant === "duotone" && false}
    

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <rect width="16" height="2" x="4" y="2"/><rect width="2" height="18" x="4" y="4"/><rect width="2" height="18" x="18" y="4"/><rect width="2" height="3" x="11" y="11"/><rect width="1" height="4" x="10" y="12"/><rect width="1" height="4" x="13" y="12"/><rect width="1" height="4" x="9" y="13"/><rect width="1" height="4" x="14" y="13"/><rect width="1" height="3" x="8" y="15"/><rect width="1" height="3" x="15" y="15"/><rect width="1" height="4" x="7" y="16"/><rect width="1" height="4" x="16" y="16"/><rect width="1" height="4" x="6" y="17"/><rect width="1" height="4" x="17" y="17"/>
    </g>
  {/if}
</svg>
