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
      <path fill="currentColor" d="M8 7.571A3.57 3.57 0 0 1 11.571 4h.858A3.57 3.57 0 0 1 16 7.57a.43.43 0 0 1-.429.429H8.43A.43.43 0 0 1 8 7.57"/><path fill="currentColor" d="m8.429 8-.087-.009A.43.43 0 0 1 8 7.571 3.57 3.57 0 0 1 11.571 4h.858l.183.005A3.57 3.57 0 0 1 16 7.57a.43.43 0 0 1-.429.429z"/><path fill="currentColor" d="M7.293 2.293a1 1 0 0 1 1.414 0l2 2a1 1 0 1 1-1.414 1.414l-2-2a1 1 0 0 1 0-1.414"/><path fill="currentColor" d="M16.707 2.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414"/><path fill="currentColor" d="M19 7a1 1 0 1 1 2 0c0 .948-.268 1.739-.767 2.36-.487.608-1.134.977-1.77 1.205C17.23 11.01 15.802 11 15 11a1 1 0 1 1 0-2c.865 0 1.936-.01 2.786-.316.407-.146.697-.34.887-.576C18.85 7.886 19 7.552 19 7"/><path fill="currentColor" d="M5 7a1 1 0 0 0-2 0c0 .948.268 1.739.767 2.36.487.608 1.134.977 1.77 1.205C6.77 11.01 8.198 11 9 11a1 1 0 1 0 0-2c-.865 0-1.936-.01-2.786-.316-.407-.146-.697-.34-.887-.576C5.15 7.886 5 7.552 5 7"/><path fill="currentColor" d="M19 21a1 1 0 1 0 2 0q-.002-1.351-.596-2.274a3.4 3.4 0 0 0-1.494-1.263C17.85 16.986 16.63 17 16 17a1 1 0 1 0 0 2c.703 0 1.484.014 2.09.287.276.124.484.29.63.519.148.229.28.595.28 1.194"/><path fill="currentColor" d="M5 21a1 1 0 1 1-2 0q.002-1.351.596-2.274a3.4 3.4 0 0 1 1.494-1.263C6.15 16.986 7.37 17 8 17a1 1 0 1 1 0 2c-.702 0-1.484.014-2.09.287-.276.124-.484.29-.63.519C5.131 20.035 5 20.4 5 21"/><path fill="currentColor" d="M21 13a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2z"/><path fill="currentColor" d="M7 13a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2z"/><path fill="currentColor" fill-rule="evenodd" d="M15 9a3 3 0 0 1 3 3v3a6 6 0 0 1-12 0v-3a3 3 0 0 1 3-3zm-3 4c-.552 0-1 .28-1 .625v3.75c0 .345.448.625 1 .625s1-.28 1-.625v-3.75c0-.345-.448-.625-1-.625" clip-rule="evenodd"/>
    </g>

  {:else if variant === "duotone"}
    <!-- DUOTONE BACKGROUND -->
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path d="M7 12a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3a5 5 0 0 1-10 0z"/>
<path d="M9 8a3 3 0 1 1 6 0v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
<path d="M8.707 2.293a1 1 0 0 0-1.414 1.414L8 3zm8 1.414a1 1 0 0 0-1.414-1.414L16 3zM21 7a1 1 0 1 0-2 0h2M5 7a1 1 0 0 0-2 0h2m11 10a1 1 0 1 0 0 2v-2m3 4a1 1 0 1 0 2 0h-2M8 19a1 1 0 1 0 0-2v2m-5 2a1 1 0 1 0 2 0H3m14-8a1 1 0 1 0 0 2v-2m4 2a1 1 0 1 0 0-2v2M3 13a1 1 0 1 0 0 2v-2m4 2a1 1 0 1 0 0-2v2m6-1a1 1 0 1 0-2 0h2m-3-9 .707-.707-2-2L8 3l-.707.707 2 2zm4 0 .707.707 2-2L16 3l-.707-.707-2 2zm1 5v1c.801 0 2.23.01 3.464-.434.635-.229 1.282-.598 1.77-1.206C20.731 8.74 21 7.948 21 7h-2c0 .552-.148.886-.327 1.109-.19.236-.48.429-.887.575C16.936 8.99 15.866 9 15 9zm-6 0V9c-.865 0-1.936-.01-2.786-.316-.407-.146-.698-.34-.887-.575C5.148 7.886 5 7.552 5 7H3c0 .948.268 1.739.767 2.36.488.608 1.134.977 1.77 1.206C6.77 11.01 8.198 11 9 11zm7 8v1c.703 0 1.484.014 2.09.287.276.124.485.29.631.519S19 20.4 19 21h2c0-.9-.202-1.66-.596-2.275a3.4 3.4 0 0 0-1.494-1.262C17.85 16.986 16.63 17 16 17zm-8 0v-1c-.63 0-1.85-.014-2.91.463a3.4 3.4 0 0 0-1.494 1.262C3.202 19.34 3 20.1 3 21h2c0-.6.132-.965.279-1.194.146-.228.355-.395.631-.52C6.516 19.015 7.298 19 8 19zm9-4v1h4v-2h-4zM3 14v1h4v-2H3zm9 6h1v-6h-2v6zM9 10v1h6V9H9zm8 2h-1v3h2v-3zM7 15h1v-3H6v3zm5 5v-1a4 4 0 0 1-4-4H6a6 6 0 0 0 6 6zm5-5h-1a4 4 0 0 1-4 4v2a6 6 0 0 0 6-6zm-2-5v1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3zm-6 0V9a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zm6-2h-1v1h2V8zm-1 2V9h-4v2h4zM9 9h1V8H8v1zm1 1V9H8a2 2 0 0 0 2 2zm5-1h-1v2a2 2 0 0 0 2-2zm-3-4v1a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4zm0 0V4a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2z"/>
    </g>

    <!-- DUOTONE FOREGROUND -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <!-- STROKE -->
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path d="M10 5 8 3m6 2 2-2m-4 17a5 5 0 0 1-5-5v-3a2 2 0 0 1 2-2m3 10a5 5 0 0 0 5-5v-3a2 2 0 0 0-2-2m-3 10v-6m3-4H9m6 0c1.667 0 5 0 5-3M9 10c-1.667 0-5 0-5-3m12 11c1.333 0 4 0 4 3M8 18c-1.333 0-4 0-4 3m13-7h4M3 14h4m3-4h4a1 1 0 0 0 1-1V8a3 3 0 1 0-6 0v1a1 1 0 0 0 1 1Z"/>
    </g>
  {/if}
</svg>
