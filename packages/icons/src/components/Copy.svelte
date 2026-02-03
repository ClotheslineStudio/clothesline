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
      <g id="Property 1=fillled"><g id="Vector"><path fill="currentColor" d="M3 19v-9a3 3 0 0 1 3-3 1 1 0 0 1 .103 1.995l-.206.01A1 1 0 0 0 5 10v9a1 1 0 0 0 1 1h6a1 1 0 0 0 .995-.898l.01-.204A1 1 0 0 1 15 19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3"/><path fill="currentColor" d="M14.834 2c.648 0 1.28.21 1.799.599l3.166 2.37A3 3 0 0 1 21 7.372V14a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"/></g></g>
    </g>

    {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" d="M9 14V5a2 2 0 0 1 2-2h3.834a2 2 0 0 1 1.199.4l3.166 2.37A2 2 0 0 1 20 7.371V14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="m19.199 5.77.6-.8zM16.033 3.4l-.6.8zM6 9a1 1 0 0 0 0-2v2m9 10a1 1 0 1 0-2 0h2m-4-3v1h7v-2h-7zm9-2h1V7.371h-2V14zm-.801-8.23.6-.8-3.166-2.371-.6.8-.6.8L18.6 6.572zM14.834 3V2H11v2h3.834zM11 3V2a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zm5.033.4.6-.801A3 3 0 0 0 14.834 2v2a1 1 0 0 1 .6.2zM20 7.37h1a3 3 0 0 0-1.202-2.401l-.6.8-.599.8a1 1 0 0 1 .401.801zM18 16v1a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1zm-9-2H8a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zm6-11h-1v4.5h2V3zm.5 5v1H20V7h-4.5zm-.5-.5h-1A1.5 1.5 0 0 0 15.5 9V7a.5.5 0 0 1 .5.5zM9 5H8v9h2V5zM6 21v1h6v-2H6zM6 8V7a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1zm6 13v1a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1zm-8-2H3a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1zm0-9H3v9h2v-9z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Vector 144" d="M9 14V5a2 2 0 0 1 2-2h3.834a2 2 0 0 1 1.199.4l3.166 2.37A2 2 0 0 1 20 7.371V14a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z"/><path id="Vector 146" d="M6 8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7.071a.93.93 0 0 0 .929-.929"/><path id="Vector 145" d="M15 3v4.5a.5.5 0 0 0 .5.5H20"/></g>
    </g>
  {/if}
</svg>
