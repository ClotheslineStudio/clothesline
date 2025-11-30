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
      <path d="M12 4a1 1 0 1 0 0 2V4M8 7a1 1 0 0 0 0-2v2m10.947 10.894a1 1 0 1 0-.894-1.788L18.5 17zm1.507-4.732a1 1 0 0 0 1.092 1.676L21 14zm.839 7.545a1 1 0 0 0 1.414-1.414L22 20zM4.707 1.293a1 1 0 0 0-1.414 1.414L4 2zM12 15v-1a2 2 0 0 1-2-2H8a4 4 0 0 0 4 4zm2.83-2-.944-.333A2 2 0 0 1 12 14v2a4 4 0 0 0 3.772-2.667zM9 12h1c0-.87.555-1.611 1.333-1.886L11 9.17l-.333-.943A4 4 0 0 0 8 12zm3-7v1c3.205 0 5.463 1.286 6.928 2.711a9 9 0 0 1 1.615 2.104c.172.317.292.596.367.817q.055.165.075.268c.015.072.015.102.015.1h2c0-.593-.287-1.38-.7-2.14a11 11 0 0 0-1.978-2.582C18.537 5.54 15.795 4 12 4zm0 14v-1c-2.714 0-4.99-1.13-6.6-2.51-.803-.688-1.422-1.425-1.833-2.082C3.136 12.718 3 12.223 3 12H1c0 .777.364 1.657.87 2.467.527.843 1.283 1.731 2.23 2.542C5.99 18.631 8.713 20 12 20zM2 12h1c0-.216.129-.645.507-1.255.357-.578.868-1.205 1.45-1.788.583-.582 1.21-1.093 1.788-1.45C7.355 7.129 7.785 7 8 7V5c-.784 0-1.605.371-2.308.806-.734.455-1.482 1.07-2.15 1.737s-1.281 1.415-1.736 2.15C1.371 10.394 1 11.215 1 12zm16.5 5-.447-.894C16.005 17.129 14.582 18 12 18v2c3.138 0 4.995-1.13 6.947-2.106zm3.5-5h-1a1.46 1.46 0 0 1-.503 1.125l-.053.044-.005.003.005-.003.004-.003.003-.002h.001l.001-.001L21 14c.546.838.547.838.547.837l.002-.001.004-.003.008-.005.081-.058q.07-.051.173-.14A3.5 3.5 0 0 0 23 12zM4 2l-.707.707 18 18L22 20l.707-.707-18-18z"/>
    </g>
  {/if}
</svg>
