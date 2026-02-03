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
      <path d="M12.926 16h-1.852a1 1 0 0 1-.863-.496l-2.334-4A1 1 0 0 1 8.741 10h6.518a1 1 0 0 1 .864 1.504l-2.334 4a1 1 0 0 1-.863.496Z"/><path d="M16.905 10h-9.81a1 1 0 0 0-.996 1.09l.818 9a1 1 0 0 0 .996.91h8.174a1 1 0 0 0 .996-.91l.818-9a1 1 0 0 0-.996-1.09Z"/><path d="M14.334 7.6v-1zM16 9.1h1zm-8 0H7zm2.334-1.5v-1zm1.333-.6V6zm-3.02 2.941-.323.947zm6.707 0-.323-.946zm-.188-1.938-.806.593zM13 7v1q.027.002.035.006.008.005-.003-.004l.748-.664.747-.664A2.04 2.04 0 0 0 13 6zm1.334.6v1q.029.002.035.006c.006.003 0 .002-.008-.01l.805-.593.805-.593a2.03 2.03 0 0 0-1.637-.81zm1.201.74-.496.868c.004.002-.004 0-.015-.018A.2.2 0 0 1 15 9.1h2c0-.728-.423-1.317-.97-1.629zM16 9.1h-1q0-.033.01-.061A.1.1 0 0 1 15.03 9c.011-.014.015-.01.001-.006l.323.946.322.947C16.391 10.644 17 9.98 17 9.1zm-.697.9V9H8.697v2h6.606zm-6.657-.059.323-.946c-.014-.005-.01-.008 0 .006q.01.01.02.038t.011.06H7c0 .88.609 1.545 1.324 1.789zM8 9.1h1a.2.2 0 0 1-.016.075.1.1 0 0 1-.022.032c-.006.005.005-.007.038-.007v-2c-1.002 0-2 .753-2 1.9zm1.553-1.162.748.664q-.011.01-.002.004a.1.1 0 0 1 .035-.006v-2c-.594 0-1.151.249-1.53.675zm1.332-.599.749.663q-.011.01-.003.004A.1.1 0 0 1 11.667 8V6a2.04 2.04 0 0 0-1.53.676zM11.667 7v1q.018 0 .027.004l.284-.96.283-.958A2.1 2.1 0 0 0 11.667 6zm1.021.045.283.959A.1.1 0 0 1 13 8V6a2.1 2.1 0 0 0-.595.086zm-.71 0-.284.959c.411.12.867.12 1.277 0l-.283-.96-.283-.958a.3.3 0 0 1-.144 0zm-1.644.555v1c.528 0 1-.26 1.3-.598l-.749-.663-.748-.663a.2.2 0 0 1 .064-.05.3.3 0 0 1 .133-.026zM9 8.2v1c.531 0 1.004-.263 1.3-.598l-.747-.664-.748-.663a.2.2 0 0 1 .061-.048A.3.3 0 0 1 9 7.2zm-.333 1.77h1a1.03 1.03 0 0 0-.698-.975l-.323.946-.322.947a.97.97 0 0 1-.657-.918zm.03.03V9a.97.97 0 0 1 .97.97h-2c0 .569.461 1.03 1.03 1.03zm6.657-.059-.323-.946a1.03 1.03 0 0 0-.698.975h2a.97.97 0 0 1-.657.918zm-.188-1.938-.806.593c.167.226.393.449.68.612l.495-.868.496-.869q0 0-.005-.003l-.015-.012a.3.3 0 0 1-.04-.046zm.167 1.967h-1a.97.97 0 0 1 .97-.97v2a1.03 1.03 0 0 0 1.03-1.03zM13.78 7.338l-.748.664c.299.336.772.598 1.302.598v-2c.07 0 .113.017.132.026.018.009.039.022.061.048z"/><path d="m12 7 1-4.5"/><path d="m15 8 2-5"/><path d="m6 11-2 4"/><path d="m18 11 2 4"/>
    </g>
  {/if}
</svg>
