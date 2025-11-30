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
      <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414L17 17zM7.707 6.293a1 1 0 0 0-1.414 1.414L7 7zm4.086 12.914a1 1 0 0 0 1.414-1.414l-.707.707zM4.707 9.293a1 1 0 0 0-1.414 1.414L4 10zM2 12h1c0-.223.136-.718.567-1.408.41-.657 1.03-1.394 1.834-2.083C7.009 7.131 9.286 6 12 6V4C8.714 4 5.99 5.37 4.1 6.99c-.947.812-1.703 1.7-2.23 2.543-.506.81-.87 1.69-.87 2.467zm10-7v1c2.714 0 4.99 1.13 6.6 2.51.803.688 1.422 1.425 1.833 2.082.431.69.567 1.185.567 1.408h2c0-.777-.364-1.657-.87-2.467-.527-.843-1.283-1.731-2.23-2.542C18.01 5.369 15.287 4 12 4zm10 7h-1c0 .223-.136.718-.567 1.408-.41.657-1.03 1.394-1.834 2.083C16.991 16.869 14.714 18 12 18v2c3.286 0 6.01-1.37 7.9-2.99.947-.812 1.703-1.7 2.23-2.543.506-.81.87-1.69.87-2.467zm-10 7v-1c-2.714 0-4.99-1.13-6.6-2.51-.803-.688-1.422-1.425-1.833-2.082C3.136 12.718 3 12.223 3 12H1c0 .777.364 1.657.87 2.467.527.843 1.283 1.731 2.23 2.542C5.99 18.631 8.713 20 12 20zm1.131-10v1a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4zm3 3h-1c0 .55-.22 1.045-.58 1.408l.711.703.71.704A4 4 0 0 0 17.133 12zM11 9.888l.71.704A2 2 0 0 1 13.131 10V8a4 4 0 0 0-2.841 1.185zM7 7l-.707.707 10 10L17 17l.707-.707-10-10zm-3 3-.707.707 8.5 8.5.707-.707.707-.707-8.5-8.5z"/>
    </g>
  {/if}
</svg>
