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
  {#if variant === "filled"}
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M11.66 5.381c2.23-2.333 5.82-2.309 8.023.075 2.183 2.363 2.183 6.166 0 8.53l-8.023 8.686-8.023-8.686c-2.183-2.364-2.183-6.167 0-8.53 2.202-2.384 5.791-2.408 8.022-.075"/></g>
    </g>

    {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Union" d="M12.323 6.134c1.83-1.98 4.796-1.98 6.626 0s1.83 5.192 0 7.173l-7.288 7.89-7.29-7.89c-1.829-1.98-1.829-5.192 0-7.173 1.83-1.98 4.797-1.98 6.627 0l.662.717z"/></g>
    </g>
  {/if}
</svg>
