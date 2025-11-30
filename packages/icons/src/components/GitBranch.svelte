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

  {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path d="M19 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
<path d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
<path d="M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0v6m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10-5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c0 4-5.5 4-10 4"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0v6m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10-5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c0 4-5.5 4-10 4"/>
    </g>
  {/if}
</svg>
