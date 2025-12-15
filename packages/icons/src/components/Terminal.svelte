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
      <path fill="currentColor" d="M2.282 4.304a1 1 0 0 1 1.414-.022l6.85 6.647a1.49 1.49 0 0 1 0 2.142l-6.85 6.647a1 1 0 0 1-1.392-1.436L8.776 12 2.304 5.718a1 1 0 0 1-.022-1.414"/><path fill="currentColor" d="m21 20 .102.005a1 1 0 0 1 0 1.99L21 22h-9a1 1 0 0 1 0-2z"/>
    </g>

    {:else if variant === "duotone" && false}
    

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="m3 19 6.85-6.646a.49.49 0 0 0 0-.708L3 5m9 16h9"/>
    </g>
  {/if}
</svg>
