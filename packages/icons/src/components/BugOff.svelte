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
      <path d="M12.167 8c.46 0 .833-.373.833-.833 0-1.4-.69-2.638-1.748-3.393M12.167 8H11.5m.667 0H13m-1.748-4.226A4.15 4.15 0 0 0 8.833 3a2 2 0 0 1-1.422-.59L6 1m5.252 2.774L14 1M5 12v1c0 1.126.372 2.164 1 3m-1-4v-2a2 2 0 0 1 1.707-1.979M5 12H1m9 6h.879c1.358 0 2.744-.617 3.705-1.578M10 18a5 5 0 0 1-4-2m4 2v-6m-4 4c-1.334 0-4 0-4 3m12.584-2.578-7.877-8.4m7.877 8.4L17 19M6.707 8.021 2 3m11 5c1.667 0 5 0 5-3m-5 3a2 2 0 0 1 2 2 2 2 0 0 0 2 2h2"/>
    </g>
  {/if}
</svg>
