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
      <g id="Property 1=filled"><path fill="currentColor" id="Vector 128" d="M8.5 12.5c1.5 1.5 6 2.5 7.5 3s5 2.7 5 5.5"/><path id="Subtract" fill="currentColor" fill-rule="evenodd" d="M2 3.546c0-1.09 1.228-1.516 1.958-.948l.139.127.31.323c.82.834 2.31 2.193 4.04 3.058.365.182.873.32 1.523.423.643.102 1.355.162 2.113.225.742.062 1.53.127 2.262.243.725.116 1.467.291 2.102.609 1.12.56 2.056 1.303 2.688 2.393.626 1.082.893 2.404.865 4.019-.019 1.074-.24 2.044-.627 2.897l-.07-.062c-1.115-.991-2.434-1.7-3.292-1.98-.387-.126-.96-.282-1.571-.454a50 50 0 0 1-2.03-.604c-.7-.23-1.378-.48-1.957-.75-.593-.277-1.013-.544-1.253-.779a1 1 0 0 0-1.4 1.428c.48.47 1.141.852 1.807 1.163.681.318 1.443.597 2.182.838.741.242 1.479.454 2.111.63.649.183 1.156.32 1.49.43.581.19 1.662.753 2.586 1.573q.14.126.271.257a6.5 6.5 0 0 1-.68.637C16.095 20.432 14.121 21 12 21c-2.515 0-5.016-.24-6.898-1.398C3.108 18.375 2 16.252 2 13z" clip-rule="evenodd"/></g>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M19 14c-.069 3.905-3.095 6-7 6-5 0-9-1-9-7V3.545c0-.186.239-.274.366-.137C4.1 4.193 5.862 5.93 8 7c2 1 6 .5 8 1.5s3.053 2.5 3 5.5"/>
    </g>

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M8.5 12.5c1.5 1.5 6 2.5 7.5 3s5 2.7 5 5.5m-9-1c3.905 0 6.932-2.095 7-6 .053-3-1-4.5-3-5.5S10 8 8 7C5.862 5.93 4.1 4.193 3.366 3.408 3.24 3.27 3 3.358 3 3.545V13c0 6 4 7 9 7Z"/>
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Vector 127" d="M19 14c-.069 3.905-3.095 6-7 6-5 0-9-1-9-7V3.545c0-.186.239-.274.366-.137C4.1 4.193 5.862 5.93 8 7c2 1 6 .5 8 1.5s3.053 2.5 3 5.5Z"/><path id="Vector 128" d="M8.5 12.5c1.5 1.5 6 2.5 7.5 3s5 2.7 5 5.5"/></g>
    </g>
  {/if}
</svg>
