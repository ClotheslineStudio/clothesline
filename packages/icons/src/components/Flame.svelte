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
      <path d="M19 15c0 4-3 7-7 7s-7-3-7-7c0-2.664.789-6.906 1.666-7.822.158-.166.374-.022.441.197C7.414 8.37 8.378 11 10 11c1.884 0-1.557-4.438 1.383-8.297.242-.317.73-.182.829.205C12.602 4.444 13.53 7.53 15 9c.45.568.9-2.315 1.714-2.898.154-.11.34.003.417.176C18.085 8.421 19 12.975 19 15Z"/><path d="M8 19.2C8 21 9.714 22 12 22s4-1 4-2.8c0-1.066 0-2.765-.702-3.13-.168-.087-.351.036-.446.2C14.539 16.818 13.77 18 13 18c-.831 0-.28-2.763-.645-3.697-.1-.257-.385-.074-.55.148C11.006 15.537 8 17.293 8 19.2Z"/>
    </g>
  {/if}
</svg>
