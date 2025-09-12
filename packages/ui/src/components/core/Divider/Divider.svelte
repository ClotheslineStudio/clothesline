<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  // Props
  export let orientation: "horizontal" | "vertical" = "horizontal";
  export let variant: "solid" | "dashed" | "dotted" | "soft" = "solid";
  export let thickness:
    | "hairline"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | string
    | number = "md";
  export let space: "none" | "sm" | "md" | "lg" = "md";
  export let label: string | undefined = undefined;
  export let align: "start" | "center" | "end" = "center";
  export let color: string | undefined = undefined;
  export let decorative = false;
  export let length: string | undefined = undefined; // for vertical
  export let className = "";

  // --- Slot presence (TS-safe, no listeners on <slot>) ---
  let labelWrapperEl: HTMLElement | null = null; // bind here
  let hasDefaultSlot = false;

  function updateHasSlot() {
    // Find the real <slot> inside the wrapper and inspect it
    const slotEl = labelWrapperEl?.querySelector(
      "slot"
    ) as HTMLSlotElement | null;
    hasDefaultSlot =
      !!slotEl && slotEl.assignedNodes({ flatten: true }).length > 0;
  }
  onMount(updateHasSlot);
  afterUpdate(updateHasSlot);

  // Derived
  $: hasLabel = !!label || hasDefaultSlot;

  function thicknessToCSS(v: typeof thickness): string {
    if (typeof v === "number") return `${v}px`;
    if (typeof v === "string" && /[a-z%)/]/i.test(v)) return v;
    switch (v) {
      case "hairline":
        return "1px";
      case "sm":
        return "var(--border-1, 1px)";
      case "md":
        return "var(--divider-thickness, 1px)";
      case "lg":
        return "2px";
      case "xl":
        return "var(--divider-thickness-bold, 2px)";
      default:
        return "var(--divider-thickness, 1px)";
    }
  }
  function spaceToCSS(s: typeof space): string {
    switch (s) {
      case "none":
        return "0";
      case "sm":
        return "var(--spacing-3, .5rem)";
      case "md":
        return "var(--divider-spacing, var(--spacing-4, .75rem))";
      case "lg":
        return "var(--spacing-6, 1.25rem)";
    }
  }

  // Style vars
  $: styleVars = `
    --_div-thickness:${thicknessToCSS(thickness)};
    --_div-gap:${spaceToCSS(space)};
    ${color ? `--_div-color:${color};` : ""}
    ${length && orientation === "vertical" ? `--_div-length:${length};` : ""}
  `;

  // ARIA (narrow types explicitly to avoid widening to 'string')
  let ariaOrientation: "horizontal" | "vertical" | undefined = undefined;
  $: ariaOrientation = decorative
    ? undefined
    : orientation === "horizontal"
      ? "horizontal"
      : "vertical";

  $: roleAttr = decorative ? "presentation" : "separator";
  $: ariaLabel = decorative
    ? undefined
    : hasLabel && typeof label === "string"
      ? label
      : undefined;

      // Effective stroke color (prefers prop -> divider token -> border default -> neutral)
$: effectiveColor =
  color ?? 'var(--divider-color, var(--border-default-color, var(--color-neutral-500)))';

// Inline spacing for plain divider
$: inlineSpacing = !hasLabel
  ? (orientation === 'horizontal'
      ? `margin-block:${spaceToCSS(space)};`
      : `margin-inline:${spaceToCSS(space)};`)
  : '';

// Inline border for plain divider (solid/soft/dashed/dotted)
function variantToCss(v: typeof variant) {
  return v === 'dashed' || v === 'dotted' ? v : 'solid';
}
$: inlineBorder = !hasLabel
  ? (orientation === 'horizontal'
      ? `border-top:${thicknessToCSS(thickness)} ${variantToCss(variant)} ${effectiveColor};height:0;width:100%;`
      : `border-left:${thicknessToCSS(thickness)} ${variantToCss(variant)} ${effectiveColor};width:0;height:${length ?? '100%'};`)
  : '';

// Final inline style string: CSS vars (for labeled variant etc.) + hard fallback
$: styleInline = `${styleVars}${inlineSpacing}${inlineBorder}`;

</script>

<div
  class={`cl-divider ${hasLabel ? 'is-labeled' : 'is-plain'} ${className}`}
  data-orientation={orientation}
  data-variant={variant}
  data-align={align}
  style={styleInline}  
  role={roleAttr}
  aria-orientation={ariaOrientation}
  aria-label={ariaLabel}
  aria-hidden={decorative ? 'true' : undefined}
>
  {#if hasLabel}
    <span class="cl-divider__line" aria-hidden="true"></span>
    <span class="cl-divider__label-wrapper" bind:this={labelWrapperEl}>
      <span class="cl-divider__label"><slot>{label}</slot></span>
    </span>
    <span class="cl-divider__line" aria-hidden="true"></span>
  {/if}
</div>


<style>
  /* Color resolution (uses your tokens; color prop overrides) */
  .cl-divider{
    --_base-color: var(--_div-color,
                       var(--divider-color,
                           var(--border-default-color,
                               var(--color-neutral-500))));
    --_color-soft: color-mix(in oklab, var(--_base-color) 65%, transparent);
    --_color: var(--_color-effective, var(--_base-color));
    box-sizing: border-box;
  }
  .cl-divider[data-variant='soft'] { --_color-effective: var(--_color-soft); }

  /* ========== PLAIN (no label) — use borders ONLY ========== */
  .cl-divider.is-plain[data-orientation='horizontal']{
    width: 100%;
    height: 0;                            /* border draws the line */
    margin-block: var(--_div-gap);
    border-top: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider.is-plain[data-orientation='horizontal'][data-variant='dashed']{
    border-top-style: dashed;
  }
  .cl-divider.is-plain[data-orientation='horizontal'][data-variant='dotted']{
    border-top-style: dotted;
  }

  .cl-divider.is-plain[data-orientation='vertical']{
    height: var(--_div-length, 100%);
    width: 0;                             /* border draws the line */
    margin-inline: var(--_div-gap);
    border-left: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider.is-plain[data-orientation='vertical'][data-variant='dashed']{
    border-left-style: dashed;
  }
  .cl-divider.is-plain[data-orientation='vertical'][data-variant='dotted']{
    border-left-style: dotted;
  }

  /* ========== LABELED ========== */
  .cl-divider.is-labeled{
    display: flex;
    align-items: center;
    gap: var(--_div-gap);
    color: var(--_color);
  }
  .cl-divider.is-labeled[data-orientation='horizontal']{
    width: 100%;
    margin-block: var(--_div-gap);
  }
  .cl-divider.is-labeled[data-orientation='vertical']{
    flex-direction: column;
    height: var(--_div-length, 100%);
    margin-inline: var(--_div-gap);
  }

  .cl-divider__line{ flex: 1 1 0; min-width: 0; }
  .cl-divider.is-labeled[data-orientation='horizontal'] .cl-divider__line{
    border-top: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider.is-labeled[data-orientation='vertical'] .cl-divider__line{
    width: 0;
    border-left: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider[data-variant='dashed'] .cl-divider__line{ border-style: dashed; }
  .cl-divider[data-variant='dotted'] .cl-divider__line{ border-style: dotted; }

  .cl-divider__label{
    font: inherit;
    color: var(--base-font-color, currentColor);
    padding: 0 var(--spacing-2, .25rem);
    white-space: nowrap;
  }

  /* Alignment for labeled/horizontal */
  .cl-divider[data-orientation='horizontal'][data-align='start']  { justify-content: flex-start; }
  .cl-divider[data-orientation='horizontal'][data-align='center'] { justify-content: center; }
  .cl-divider[data-orientation='horizontal'][data-align='end']    { justify-content: flex-end; }
</style>

