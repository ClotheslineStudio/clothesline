<!-- AUTO-GENERATED. DO NOT EDIT. -->
<script lang="ts">
  export let size: number = 24;
  export let absoluteStrokeWidth: boolean = false;
  export let strokeWidth: number = 2;

  export let primaryColor: string = "currentColor";
   

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
      <path d="M10 21h4"/><path d="M3.254 13.98C4.271 17.78 8.171 20 12 20s7.729-2.22 8.746-6.02C21.03 12.911 20.105 12 19 12H5c-1.105 0-2.03.912-1.746 1.98Z"/><path d="m4 3 4 5m0-6 4 5"/><path d="m12.127 7.138-.42.907zm.746 0-.42-.907zM7.506 9l-.004 1zm.79-.394-.802-.597zM6.966 11.9l-.357.934zm10.068 0 .357.934zm-.2-3.083.89-.456zm.349.347-.456.89zm-2.48-1.558-.803.596zM13.5 7v1c.163 0 .307.077.4.202l.803-.596.803-.597A2.5 2.5 0 0 0 13.5 6zm1.993 1 .005 1h.002V7h-.012zm.007 0v1c.192 0 .36.108.444.273l.89-.456.89-.456A2.5 2.5 0 0 0 15.5 7zm1.683 1.164-.456.89A.5.5 0 0 1 17 10.5h2a2.5 2.5 0 0 0-1.362-2.226zM18 10.5h-1c0 .21-.13.392-.322.465l.356.934.357.935A2.5 2.5 0 0 0 19 10.5zM16.948 12v-1H7.052v2h9.897zm-9.982-.1.356-.935A.5.5 0 0 1 7 10.5H5c0 1.07.673 1.976 1.61 2.334zM6 10.5h1a.5.5 0 0 1 .5-.5V8A2.5 2.5 0 0 0 5 10.5zM7.5 9v1h.002l.004-1 .005-1H7.5zm.796-.394.803.596A.5.5 0 0 1 9.5 9V7c-.823 0-1.553.399-2.006 1.01zM9.5 8v1h.002l.004-1 .005-1H9.5zm.796-.394.803.596A.5.5 0 0 1 11.5 8V6c-.823 0-1.553.399-2.006 1.01zM11.5 7v1q.112 0 .207.045l.42-.907.42-.907A2.5 2.5 0 0 0 11.5 6zm1.373.138.42.907A.5.5 0 0 1 13.5 8V6c-.373 0-.729.083-1.048.23zm-.746 0-.42.907c.498.231 1.088.231 1.586 0l-.42-.907-.42-.907a.1.1 0 0 1 .047-.013q.012-.002.048.013zM9.507 8l-.005 1a2.02 2.02 0 0 0 1.597-.798l-.803-.596-.802-.597.013-.015-.012.007h-.003.005L9.51 7zm-2 1-.005 1A2.01 2.01 0 0 0 9.1 9.202l-.803-.596-.802-.597.013-.015-.012.007h-.003.005L7.51 8zM7 11.948h1c0-.45-.284-.832-.678-.983l-.356.934-.357.935A.95.95 0 0 1 6 11.948zm.051.052v-1c.524 0 .949.425.949.948H6C6 12.53 6.47 13 7.051 13zm9.983-.1-.356-.935c-.395.15-.678.532-.678.983h2c0 .408-.256.751-.61.886zm-.2-3.083-.89.456c.172.335.447.61.783.782l.456-.89.455-.89q.057.029.086.086zM17 11.948h-1c0-.523.425-.948.948-.948v2C17.53 13 18 12.53 18 11.948zm-2.297-4.342-.803.596c.368.496.982.8 1.598.798l-.005-1-.005-1h.014l.005.001h-.002l-.013-.007.004.004.01.011z"/>
    </g>
  {/if}
</svg>
