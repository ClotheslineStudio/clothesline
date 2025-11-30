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
      <g id="Property 1=filled"><path id="body" fill="currentColor" d="M12 2a1 1 0 0 1 .743.331l5.54 6.154a1 1 0 0 1-.745 1.67h-.46l2.491 3.322a1.001 1.001 0 0 1-.8 1.6h-.461L20.8 18.4A1 1 0 0 1 20 20H4a1 1 0 0 1-.8-1.6l2.492-3.323H5.23a1 1 0 0 1-.8-1.6l2.493-3.323h-.461a1.001 1.001 0 0 1-.744-1.669l5.539-6.154.074-.075A1 1 0 0 1 12 2"/><path id="trunk" fill="currentColor" d="M11 22v-3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0"/></g>
    </g>

  {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M20 19H4l3.692-4.923H5.231l3.692-4.923H6.462L12 3l5.538 6.154h-2.461l3.692 4.923h-2.461z"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M12 19v3m-8-3h16l-3.692-4.923h2.461l-3.692-4.923h2.461L12 3 6.462 9.154h2.461l-3.692 4.923h2.461z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Vector 138" d="M20 19H4l3.692-4.923H5.231l3.692-4.923H6.462L12 3l5.538 6.154h-2.461l3.692 4.923h-2.461z"/><path id="Vector 139" d="M12 19v3"/></g>
    </g>
  {/if}
</svg>
