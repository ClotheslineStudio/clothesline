<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  // Accessible Divider / Rule
  // - Horizontal/Vertical
  // - Variants: solid | dashed | dotted | soft (uses color-mix on base color)
  // - Thickness + Spacing tokens with sensible fallbacks
  // - Labeled or decorative

  // Props
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let variant: 'solid' | 'dashed' | 'dotted' | 'soft' = 'solid';
  export let thickness: 'hairline' | 'sm' | 'md' | 'lg' | 'xl' | string | number = 'md';
  export let space: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let label: string | undefined = undefined; // visible label (also fallback aria-label)
  export let align: 'start' | 'center' | 'end' = 'center';
  export let color: string | undefined = undefined; // any CSS color; defaults to token chain
  export let decorative = false;                    // if true: role=presentation and aria-hidden
  export let length: string | undefined = undefined; // for vertical height e.g. '100%', '4rem'
  export let id: string | undefined = undefined;     // optional id for aria-labelledby
  export let className = '';

  // --- Slot presence (SSR-safe) -----------------------------------------
  // We cannot add attributes to <slot> in Svelte. So we bind the wrapper and inspect
  // its child <slot> on mount/update, using assignedNodes().
  let labelWrapperEl: HTMLElement | null = null;
  let hasSlot = false;
  function updateHasSlot() {
    const slotEl = labelWrapperEl?.querySelector('slot') as HTMLSlotElement | null;
    hasSlot = !!slotEl && slotEl.assignedNodes({ flatten: true }).length > 0;
  }
  onMount(updateHasSlot);
  afterUpdate(updateHasSlot);

  // Derived
  $: hasLabel = !!label || hasSlot;

  // Token helpers
  function thicknessToCSS(v: typeof thickness): string {
    if (typeof v === 'number') return `${v}px`;
    if (typeof v === 'string' && /[a-z%)/]/i.test(v)) return v; // raw CSS length
    switch (v) {
      case 'hairline': return '1px';
      case 'sm':       return 'var(--border-1, 1px)';
      case 'md':       return 'var(--divider-thickness, 1px)';
      case 'lg':       return '2px';
      case 'xl':       return 'var(--divider-thickness-bold, 2px)';
      default:         return 'var(--divider-thickness, 1px)';
    }
  }
  function spaceToCSS(s: typeof space): string {
    switch (s) {
      case 'none': return '0';
      case 'sm':   return 'var(--spacing-3, .5rem)';
      case 'md':   return 'var(--divider-spacing, var(--spacing-4, .75rem))';
      case 'lg':   return 'var(--spacing-6, 1.25rem)';
    }
  }

  // Style vars (kept minimal; rest in CSS)
  $: styleVars = `
    --_div-thickness:${thicknessToCSS(thickness)};
    --_div-gap:${spaceToCSS(space)};
    ${color ? `--_div-color:${color};` : ''}
    ${length && orientation === 'vertical' ? `--_div-length:${length};` : ''}
  `.trim();

  // ARIA
  $: roleAttr = decorative ? 'presentation' : 'separator';
  $: ariaOrientation = decorative ? undefined : orientation;
  // If label text is provided but no slotted content, use aria-label. If there is slotted content, prefer aria-labelledby.
  let labelId: string | undefined = id; // can be passed in; otherwise generated when needed
  $: if (!labelId && hasSlot) labelId = `div-label-${Math.random().toString(36).slice(2)}`;
  $: ariaLabel = !decorative && label && !hasSlot ? label : undefined;
  $: ariaLabelledby = !decorative && hasSlot ? labelId : undefined;
</script>

<div
  class={`cl-divider ${hasLabel ? 'is-labeled' : 'is-plain'} ${className}`}
  data-orientation={orientation}
  data-variant={variant}
  data-align={align}
  style={styleVars}
  role={roleAttr}
  aria-orientation={ariaOrientation}
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledby}
  aria-hidden={decorative}
>
    {#if hasLabel}
      <span class="cl-divider__line" aria-hidden="true"></span>
      <span class="cl-divider__label-wrapper" bind:this={labelWrapperEl} id={labelId}></span>
    {/if}
  </div>