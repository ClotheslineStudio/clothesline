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
  {#if variant === "filled" && false}
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      
    </g>

    {:else if variant === "duotone" && false}
    

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M3 14v-4a1 1 0 0 1 1-1h4.638a1 1 0 0 0 .64-.232l4.082-3.401a1 1 0 0 1 1.64.768v11.73a1 1 0 0 1-1.64.768l-4.082-3.401a1 1 0 0 0-.64-.232H4a1 1 0 0 1-1-1Z"/><path d="M18 9a4.243 4.243 0 0 1 0 6"/><path d="M21 7a9.72 9.72 0 0 1 0 10"/>
    </g>
  {/if}
</svg>
