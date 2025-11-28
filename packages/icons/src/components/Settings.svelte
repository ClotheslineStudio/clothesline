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
      <g id="Property 1=stroke"><path id="Settings" fill-rule="evenodd" d="M12 3q.863.001 1.682.144c.515.088.815.567.936 1.048.156.625.574 1.19 1.208 1.537a2.67 2.67 0 0 0 2.007.22c.5-.142 1.088-.135 1.426.242.724.81 1.3 1.742 1.687 2.76.178.466-.11.951-.492 1.29A2.35 2.35 0 0 0 19.651 12c0 .693.309 1.319.803 1.759.381.339.67.825.492 1.29a8.9 8.9 0 0 1-1.685 2.758c-.338.378-.926.385-1.427.243a2.67 2.67 0 0 0-2.008.22 2.42 2.42 0 0 0-1.208 1.538c-.12.482-.42.962-.936 1.05a10 10 0 0 1-3.363 0c-.515-.088-.816-.568-.936-1.05a2.42 2.42 0 0 0-1.207-1.538 2.67 2.67 0 0 0-2.01-.22c-.501.142-1.089.136-1.427-.242a8.9 8.9 0 0 1-1.685-2.758c-.178-.466.111-.952.493-1.291A2.35 2.35 0 0 0 4.352 12c0-.694-.31-1.32-.805-1.76-.382-.339-.67-.825-.493-1.29A8.9 8.9 0 0 1 4.74 6.191c.338-.377.926-.385 1.427-.243.65.185 1.376.126 2.01-.22A2.42 2.42 0 0 0 9.381 4.19c.12-.482.421-.96.936-1.048A10 10 0 0 1 12.001 3Zm0 6c-1.75 0-3 1.343-3 3s1.25 3 3 3 3-1.343 3-3-1.25-3-3-3Z" clip-rule="evenodd"/></g>
    </g>
  {/if}
</svg>
