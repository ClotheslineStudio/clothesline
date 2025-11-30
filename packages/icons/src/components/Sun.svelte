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
      <circle cx="12" cy="12" r="4.998" fill="currentColor" transform="rotate(90.027 12 12)"/><path fill="currentColor" d="M20 11.004h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2"/><path fill="currentColor" d="m16.953 5.638 1.415-1.413A1 1 0 1 1 19.78 5.64l-1.415 1.413a1 1 0 1 1-1.413-1.415"/><path fill="currentColor" d="m2 10.995 2 .001a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2"/><path fill="currentColor" d="m4.219 18.36 1.415-1.413a1 1 0 1 1 1.413 1.415l-1.414 1.413a1 1 0 0 1-1.414-1.415"/><path fill="currentColor" d="M11 4V2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0"/><path fill="currentColor" d="M5.636 7.05 4.222 5.636a1 1 0 1 1 1.414-1.414L7.05 5.636A1 1 0 1 1 5.636 7.05"/><path fill="currentColor" d="M11 22v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0"/><path fill="currentColor" d="m18.364 19.778-1.415-1.414a1 1 0 0 1 1.415-1.414l1.414 1.414a1 1 0 0 1-1.414 1.414"/>
    </g>

  {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <circle id="tone2" cx="12" cy="12" r="3.998" transform="rotate(90.027 12 12)"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="m22 12.005-2-.001m-.925-7.072L17.66 6.346M4 11.996H2m4.34 5.658-1.414 1.414M12 2v2m-7.071.929 1.414 1.414M12 22v-2m7.071-.929-1.414-1.414m-5.655-1.651a4.002 4.002 0 1 1 .004-8.004 4.002 4.002 0 0 1-.004 8.004Z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <circle cx="12" cy="12" r="4.002" transform="rotate(90.027 12 12)"/><path d="m22 12.005-2-.001"/><path d="M19.075 4.932 17.66 6.346"/><path d="M4 11.996H2"/><path d="m6.34 17.654-1.414 1.414"/><path d="M12 2v2"/><path d="m4.929 4.929 1.414 1.414"/><path d="M12 22v-2"/><path d="m19.071 19.071-1.414-1.414"/>
    </g>
  {/if}
</svg>
