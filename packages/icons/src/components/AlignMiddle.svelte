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
      <path fill="currentColor" d="M7 20a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm-2-6a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2zm2-6a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zM5 2a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/>
    </g>

    {:else if variant === "duotone"}
    

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M7 9h10m0 12H7"/>
<path d="M5 3h14m0 12H5"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M7 9h10m0 12H7M5 3h14m0 12H5"/>
    </g>
  {/if}
</svg>
