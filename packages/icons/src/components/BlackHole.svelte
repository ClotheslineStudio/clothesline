<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  // PUBLIC PROPS
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
  export let secondaryColor: string = "currentColor";

  export let variant: "stroke" | "filled" | "duotone" | "animated" = "stroke";
  export let ariaLabel: string | undefined = undefined;

  // DERIVED
  $: svgSize = typeof size === "number" ? size : parseFloat(size);

  // Lucide-style stroke math
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
    <!-- FILLED -->
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      
    </g>

  {:else if variant === "duotone" && false}
    <!-- DUOTONE BACKGROUND -->
    

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="black_hole"><path id="Vector" d="M8.331 12a4 4 0 0 1 8 0m-8 0h8m-8 0a4 4 0 0 0 8 0m4 0a8 8 0 0 1-16 0zm1.826 0c.53 0 .724-.772.27-1.046-.977-.586-2.12-1.358-2.896-2.154-2.197-2.254-3.373-4.8-7.2-4.8-3.758 0-5 2.573-7.2 4.8-.797.807-1.918 1.568-2.876 2.146-.456.274-.261 1.054.27 1.054z"/></g>
    </g>
  {/if}
</svg>
