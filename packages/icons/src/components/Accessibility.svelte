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
      <circle cx="8" cy="16" r="5"/><path d="m6 7 1.734-1.734a2 2 0 0 1 2.664-.148l2.845 2.277a1 1 0 0 1 .175 1.38L11 12"/><path d="m11 12 5.704-.815a1 1 0 0 1 1.134 1.114L17 19"/><circle cx="16" cy="4" r="1"/>
    </g>
  {/if}
</svg>
