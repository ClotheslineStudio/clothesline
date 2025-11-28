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
      <g id="Property 1=filled"><g id="Vector"><path fill="currentColor" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5"/><path fill="currentColor" d="m7 17.586 3.94-3.94.114-.102a1.5 1.5 0 0 1 1.892 0l.114.102 3.94 3.94V5H7zm12 1.207c0 1.336-1.616 2.005-2.56 1.06L12 15.415l-4.44 4.44c-.944.944-2.56.275-2.56-1.061V4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5z"/></g></g>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M17.5 4h-11a.5.5 0 0 0-.5.5v14.293a.5.5 0 0 0 .854.353l4.792-4.792a.5.5 0 0 1 .708 0l4.792 4.792a.5.5 0 0 0 .854-.353V4.5a.5.5 0 0 0-.5-.5Z"/>
    </g>
  {/if}
</svg>
