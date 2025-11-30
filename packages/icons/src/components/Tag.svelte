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
      <g id="Property 1=filled"><path id="Subtract" fill="currentColor" d="M12.9 4.243a3 3 0 0 1 2.12.878l6.486 6.485a3 3 0 0 1 0 4.244l-5.656 5.656a3 3 0 0 1-4.244 0L5.121 15.02a3 3 0 0 1-.878-2.122V7.242a3 3 0 0 1 3-2.999zM9.484 8.071a1 1 0 1 0-1.414 1.414 1 1 0 0 0 1.414-1.414"/></g>
    </g>

  {:else if variant === "duotone"}
    <g fill="currentColor" stroke="none" style={"color:" + secondaryColor}>
      <path id="tone2" fill-rule="evenodd" d="M12.9 5.242a2 2 0 0 1 1.413.586l6.486 6.485a2 2 0 0 1 0 2.83l-5.656 5.656a2 2 0 0 1-2.83 0l-6.485-6.485a2 2 0 0 1-.586-1.415V7.243a2 2 0 0 1 2-2zm-3.415 2.83a1 1 0 1 0-1.414 1.413 1 1 0 0 0 1.414-1.414" clip-rule="evenodd"/>
    </g>

    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <path id="tone1" d="M20.799 15.142 15.142 20.8a2 2 0 0 1-2.828 0l-6.486-6.485a2 2 0 0 1-.585-1.415V7.244a2 2 0 0 1 2-2h5.656a2 2 0 0 1 1.415.585l6.485 6.486a2 2 0 0 1 0 2.828Z"/>
    </g>

  {:else}
    <g fill="none" stroke={primaryColor} stroke-width={resolvedStroke}>
      <g id="Property 1=stroke"><g id="Group 1"><path id="Vector 59" d="M20.799 15.142 15.142 20.8a2 2 0 0 1-2.828 0l-6.486-6.485a2 2 0 0 1-.585-1.415V7.244a2 2 0 0 1 2-2h5.656a2 2 0 0 1 1.415.585l6.485 6.486a2 2 0 0 1 0 2.828Z"/><circle id="Ellipse 25" cx="8.778" cy="8.778" r=".5" transform="rotate(-45 8.778 8.778)"/></g></g>
    </g>
  {/if}
</svg>
