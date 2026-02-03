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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" d="M10.602 2.836c.48-1.235 2.189-1.273 2.746-.115l.05.115 1.98 5.094h5.376c1.352 0 2.013 1.65 1.036 2.585l-4.333 4.143 1.292 5.852c.296 1.343-1.222 2.343-2.34 1.542L12 18.888l-4.409 3.164c-1.118.802-2.635-.199-2.339-1.542l1.29-5.852-4.332-4.143C1.233 9.58 1.894 7.93 3.246 7.93h5.376z"/></g>
    </g>

    {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Star 1" d="M11.534 3.199a.5.5 0 0 1 .932 0L14.57 8.61a.5.5 0 0 0 .466.32h5.718a.5.5 0 0 1 .345.86l-4.536 4.339a.5.5 0 0 0-.143.47l1.352 6.125a.5.5 0 0 1-.78.514l-4.7-3.372a.5.5 0 0 0-.583 0L7.008 21.24a.5.5 0 0 1-.78-.514l1.352-6.126a.5.5 0 0 0-.142-.469L2.9 9.791a.5.5 0 0 1 .345-.86h5.718a.5.5 0 0 0 .466-.32z"/></g>
    </g>
  {/if}
</svg>
