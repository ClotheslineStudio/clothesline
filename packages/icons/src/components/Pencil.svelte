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
      <g id="Property 1=filled"><path id="Union" fill="currentColor" fill-rule="evenodd" d="M15.435 4.122a3 3 0 0 1 4.242 4.242l-1.415 1.414h.001l-9.9 9.9-.003-.004a1.1 1.1 0 0 1-.352.2L3.93 21.266a1.1 1.1 0 0 1-1.396-1.396l1.39-4.078q.068-.196.2-.352l-.003-.004zm2.828 1.414a1 1 0 0 0-1.414 0L15.435 6.95l1.414 1.414 1.414-1.414a1 1 0 0 0 0-1.414" clip-rule="evenodd"/></g>
    </g>

    {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <rect id="tone2" width="6" height="14" x="14.021" y="5.536" transform="rotate(45 14.02 5.536)"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><path id="Rectangle 17" d="M18.97 4.828a2 2 0 0 1 0 2.829l-2.12 2.121-2.83-2.828 2.122-2.122a2 2 0 0 1 2.829 0Z"/><rect id="Rectangle 18" width="4" height="12" x="14.021" y="6.95" transform="rotate(45 14.02 6.95)"/><path id="Vector 143" d="m4.895 16.075.57-.57a.1.1 0 0 1 .141 0l2.687 2.688a.1.1 0 0 1 0 .141l-.57.57a.1.1 0 0 1-.038.023L3.607 20.32a.1.1 0 0 1-.127-.127l1.391-4.078a.1.1 0 0 1 .024-.039Z"/></g>
    </g>
  {/if}
</svg>
