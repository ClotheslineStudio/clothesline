<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
  export let secondaryColor: string = "currentColor";

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
      <rect width="2" height="2" x="2" y="2"/><rect width="2" height="2" x="20" y="2"/><rect width="1" height="3" x="4" y="3"/><rect width="1" height="3" x="19" y="3"/><rect width="1" height="1" x="3" y="4"/><rect width="1" height="3" x="5" y="4"/><rect width="1" height="3" x="18" y="4"/><rect width="1" height="1" x="20" y="4"/><rect width="1" height="3" x="6" y="5"/><rect width="1" height="3" x="17" y="5"/><rect width="1" height="3" x="7" y="6"/><rect width="1" height="3" x="16" y="6"/><rect width="1" height="3" x="8" y="7"/><rect width="1" height="3" x="15" y="7"/><rect width="1" height="3" x="9" y="8"/><rect width="1" height="3" x="14" y="8"/><rect width="1" height="6" x="10" y="9"/><rect width="1" height="6" x="13" y="9"/><rect width="2" height="4" x="11" y="10"/><rect width="1" height="3" x="9" y="13"/><rect width="1" height="3" x="14" y="13"/><rect width="1" height="3" x="8" y="14"/><rect width="1" height="3" x="15" y="14"/><rect width="1" height="3" x="7" y="15"/><rect width="1" height="3" x="16" y="15"/><rect width="1" height="3" x="6" y="16"/><rect width="1" height="3" x="17" y="16"/><rect width="1" height="3" x="5" y="17"/><rect width="1" height="3" x="18" y="17"/><rect width="1" height="3" x="4" y="18"/><rect width="1" height="3" x="19" y="18"/><rect width="1" height="3" x="3" y="19"/><rect width="1" height="3" x="20" y="19"/><rect width="1" height="2" x="2" y="20"/><rect width="1" height="2" x="21" y="20"/>
    </g>
  {/if}
</svg>
