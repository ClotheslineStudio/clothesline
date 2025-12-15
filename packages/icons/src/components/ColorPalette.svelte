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
      <path d="M18 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M14 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M9 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M7 13.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/><path d="M22 12c0 2.748-1.962 4-4 4h-3c-1.104 0-2.02.918-1.656 1.96.29.829.656 1.434.656 2.04 0 1-.74 2-2 2-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10Z"/>
    </g>
  {/if}
</svg>
