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
  {#if variant === "filled"}
    <!-- FILLED -->
    <g fill="currentColor" stroke="none" style={"color:" + primaryColor}>
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M8.91 2.095c.897-.293 1.675.125 2.093.713.395.557.534 1.322.305 2.032a6 6 0 0 0-.29 1.841l.008.31a6 6 0 0 0 7.767 5.423 2.32 2.32 0 0 1 2.028.328c.583.425.992 1.207.689 2.102-1.342 3.95-5.08 6.796-9.489 6.797-5.361 0-9.74-4.211-10.008-9.506L2 11.619c0-4.45 2.9-8.216 6.91-9.524"/></g>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574"/>
    </g>

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574Z"/>
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="outline" d="M9.22 3.045c.806-.263 1.396.68 1.136 1.487a7 7 0 0 0 8.734 8.837c.81-.25 1.746.35 1.473 1.154A9.022 9.022 0 0 1 3 11.619a9.02 9.02 0 0 1 6.22-8.574Z"/></g>
    </g>
  {/if}
</svg>
