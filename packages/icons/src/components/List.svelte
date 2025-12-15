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
      <circle cx="3" cy="5" r=".5"/><path d="M3 11.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z"/><path d="M3 18.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z"/><path d="M7 5h14"/><path d="M7 12h14"/><path d="M7 19h14"/>
    </g>
  {/if}
</svg>
