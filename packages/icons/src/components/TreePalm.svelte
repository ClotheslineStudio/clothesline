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
      <g id="Property 1=filled"><g id="Vector 130"><path fill="currentColor" d="M14 21h-4c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/><path fill="currentColor" d="M8 21h2m6 0h-2m-4 0h4m-4 0c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/></g><path id="Vector 131" fill="currentColor" d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/><path id="Vector 132" fill="currentColor" d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/><path id="Vector 133" fill="currentColor" d="m8.41 6.796 3.766 1.01s-.753-4.771-4.215-5.789S2 5 2 5l3 1 2.314-1.568z"/></g>
    </g>

    {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path d="M14 21.009h-4c-.533-5.306.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/>
<path d="m8.46 7.07 3.765 1.01s-.753-4.77-4.214-5.788-5.962 2.982-5.962 2.982l3 1 2.315-1.567z"/>
<path d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/>
<path d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Vector 130" d="M8 21h2m6 0h-2m-4 0h4m-4 0c-.533-5.305.182-10.27 1-13 0 0 2-.02 2 0 0 4.5-.132 9.972 1 13"/><path id="Vector 131" d="m11.777 7.856-8.581 6.586S1.954 10.84 5.29 8.289c3.338-2.552 6.486-.433 6.486-.433"/><path id="Vector 132" d="M16 8h-4s1-4 5-4 5 4 5 4h-3l-1.5-1.5z"/><path id="Vector 133" d="m8.41 6.796 3.766 1.01s-.753-4.771-4.215-5.789S2 5 2 5l3 1 2.314-1.568z"/></g>
    </g>
  {/if}
</svg>
