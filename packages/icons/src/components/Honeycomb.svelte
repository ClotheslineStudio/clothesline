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
      <path d="M13.47 9h-2.94m2.94 0a.05.05 0 0 0 .044-.028l1.475-2.95a.05.05 0 0 0 0-.044l-1.475-2.95A.05.05 0 0 0 13.469 3h-2.938a.05.05 0 0 0-.045.028l-1.475 2.95a.05.05 0 0 0 0 .044l1.475 2.95a.05.05 0 0 0 .045.028m2.938 0a.05.05 0 0 1 .045.028l1.475 2.95a.05.05 0 0 1 0 .044l-1.475 2.95a.05.05 0 0 1-.045.028m-2.938-6a.05.05 0 0 0-.045.028l-1.475 2.95a.05.05 0 0 0 0 .044l1.475 2.95a.05.05 0 0 0 .045.028m7.938-3h-2.938m2.938 0a.05.05 0 0 0 .045-.028l1.475-2.95a.05.05 0 0 0 0-.044l-1.475-2.95A.05.05 0 0 0 18.469 6h-2.938a.05.05 0 0 0-.045.028l-1.475 2.95a.05.05 0 0 0 0 .044l1.475 2.95a.05.05 0 0 0 .045.028m2.938 0a.05.05 0 0 1 .045.028l1.475 2.95a.05.05 0 0 1 0 .044l-1.475 2.95a.05.05 0 0 1-.045.028h-2.938a.05.05 0 0 1-.045-.028l-1.475-2.95a.05.05 0 0 1 0-.044l1.475-2.95a.05.05 0 0 1 .045-.028m-5 3h2.938m-2.938 0a.05.05 0 0 0-.045.028l-1.475 2.95a.05.05 0 0 0 0 .044l1.475 2.95a.05.05 0 0 0 .045.028h2.938a.05.05 0 0 0 .045-.028l1.475-2.95a.05.05 0 0 0 0-.044l-1.475-2.95a.05.05 0 0 0-.045-.028m-7.938-3h2.938m-2.938 0a.05.05 0 0 0-.045.028l-1.475 2.95a.05.05 0 0 0 0 .044l1.475 2.95a.05.05 0 0 0 .045.028h2.938a.05.05 0 0 0 .045-.028l1.475-2.95a.05.05 0 0 0 0-.044l-1.475-2.95A.05.05 0 0 0 8.469 12m-2.938 0a.05.05 0 0 1-.045-.028l-1.475-2.95a.05.05 0 0 1 0-.044l1.475-2.95A.05.05 0 0 1 5.531 6h2.938a.05.05 0 0 1 .045.028l1.475 2.95a.05.05 0 0 1 0 .044l-1.475 2.95a.05.05 0 0 1-.045.028"/>
    </g>
  {/if}
</svg>
