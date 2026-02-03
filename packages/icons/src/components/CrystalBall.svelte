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
      <path d="M12 3c3 0 7 3 7 7s-3 7-7 7-7-2-7-6m2.63 10a1 1 0 0 1-.892-1.453l1.016-2A1 1 0 0 1 8.646 17h6.764a1 1 0 0 1 .897.558l.984 2A1 1 0 0 1 16.394 21zM2.035 5.035l2.93 2.93c.02.02.05.02.07 0l2.93-2.93a.05.05 0 0 0 0-.07l-2.93-2.93a.05.05 0 0 0-.07 0l-2.93 2.93a.05.05 0 0 0 0 .07Zm7.319 5.348 2.322 2.322a.5.5 0 0 0 .707 0l2.322-2.322a.5.5 0 0 0 0-.707l-2.322-2.322a.5.5 0 0 0-.707 0L9.354 9.676a.5.5 0 0 0 0 .707Z"/>
    </g>
  {/if}
</svg>
