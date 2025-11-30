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
      <path d="M10 5 8 3m6 2 2-2M9 14h6m-6 4h6m-7.876-2.882A2.987 2.987 0 0 1 5 16a3 3 0 1 1 0-6h7m-4.876 5.118.02-.02m-.02.02-.003.003m.003-.003.02-.02m0 0 4.927-4.926m4.876 4.946q.279.28.624.48a3 3 0 1 0 1.5-5.599l-.039.001h-6.961m4.876 5.118-.02-.02m.02.02.003.003m-.003-.003-.02-.02m0 0L12 10.172M10 10h4a1 1 0 0 0 1-1V8a3 3 0 1 0-6 0v1a1 1 0 0 0 1 1Zm1.464.4C10.374 11.267 8 13.448 8 16s2.373 4.733 3.464 5.6a.854.854 0 0 0 1.072 0C13.626 20.733 16 18.552 16 16s-2.373-4.732-3.464-5.6a.854.854 0 0 0-1.072 0Z"/>
    </g>
  {/if}
</svg>
