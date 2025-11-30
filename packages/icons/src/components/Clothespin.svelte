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
      <path d="M20.382 3a.5.5 0 0 1 .488.605l-3.642 17a.5.5 0 0 1-.49.395h-.831a3 3 0 0 1-2.758-1.818l-.69-1.61a.5.5 0 0 0-.919 0l-.69 1.61A3 3 0 0 1 8.094 21h-.832a.5.5 0 0 1-.489-.395l-3.642-17A.5.5 0 0 1 3.618 3h3.01a.5.5 0 0 1 .379.175l4.613 5.382a.5.5 0 0 0 .76 0l4.613-5.382a.5.5 0 0 1 .38-.175z"/><path d="M15 11.732a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </g>
  {/if}
</svg>
