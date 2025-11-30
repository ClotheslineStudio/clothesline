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
      <path d="M12 10C6.477 10 2 8.433 2 6.5S6.477 3 12 3s10 1.567 10 3.5S17.523 10 12 10Zm0 0c-3.314 0-6-.672-6-1.5S8.686 7 12 7s6 .672 6 1.5-2.686 1.5-6 1.5Zm0 11c-5.523 0-10-.895-10-2s4.477-2 10-2 10 .895 10 2-4.477 2-10 2ZM8.732 10h6.536c.352 0 .593.355.478.688-.737 2.127-.719 3.551 0 5.626a.514.514 0 0 1-.477.686H8.73a.514.514 0 0 1-.478-.686c.72-2.075.738-3.5.001-5.626A.515.515 0 0 1 8.732 10Z"/>
    </g>
  {/if}
</svg>
