<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let variant: 'solid' | 'dashed' | 'dotted' | 'soft' = 'solid';
  export let thickness: 'hairline' | 'sm' | 'md' | 'lg' | 'xl' | string | number = 'md';
  export let space: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let label: string | undefined = undefined;
  export let align: 'start' | 'center' | 'end' = 'center';
  export let color: string | undefined = undefined;
  export let decorative = false;
  export let length: string | undefined = undefined; // vertical height
  export let id: string | undefined = undefined;
  export let className = '';

  let labelEl: HTMLElement | null = null;
  let labelWrapperEl: HTMLElement | null = null;
  let hasSlot = false;

  function updateHasSlot() {
    const slotEl = labelEl?.querySelector('slot') as HTMLSlotElement | null;
    hasSlot = !!slotEl && slotEl.assignedNodes({ flatten: true }).length > 0;
  }
  onMount(updateHasSlot);
  afterUpdate(updateHasSlot);

  $: hasLabel = orientation === 'horizontal' && (!!label || hasSlot);

  function thicknessToCSS(v: typeof thickness): string {
    if (typeof v === 'number') return `${v}px`;
    if (typeof v === 'string' && /[a-z%()]/i.test(v)) return v;
    switch (v) {
      case 'hairline': return '1px';
      case 'sm':       return 'var(--border-1, 1px)';
      case 'md':       return 'var(--divider-thickness, 1px)';
      case 'lg':       return 'var(--border-2, 2px)';
      case 'xl':       return 'var(--divider-thickness-bold, var(--border-2, 2px))';
      default:         return 'var(--divider-thickness, 1px)';
    }
  }

  function spaceToCSS(s: typeof space): string {
    switch (s) {
      case 'none': return '0';
      case 'sm':   return 'var(--spacing-3, 0.5rem)';
      case 'md':   return 'var(--divider-spacing, var(--spacing-4, 0.75rem))';
      case 'lg':   return 'var(--spacing-6, 1.25rem)';
    }
  }

  $: styleVars = `
    --_div-thickness:${thicknessToCSS(thickness)};
    --_div-gap:${spaceToCSS(space)};
    ${color ? `--_div-color:${color};` : ''}
    ${length && orientation === 'vertical' ? `--_div-length:${length};` : ''}
  `.trim();

  $: roleAttr = decorative ? 'presentation' : 'separator';
  $: ariaOrientation = decorative ? undefined : orientation;

  let labelId: string | undefined = id;
  $: if (!labelId && hasSlot) labelId = `cl-div-${Math.random().toString(36).slice(2)}`;
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
    <span class="cl-divider__line cl-divider__line--left" aria-hidden="true"></span>
    <span class="cl-divider__label-wrapper" bind:this={labelWrapperEl} id={labelId}>
      {#if label}{label}{/if}
      <slot />
    </span>
    <span class="cl-divider__line cl-divider__line--right" aria-hidden="true"></span>
  {:else}
    <span class="cl-divider__line cl-divider__line--single" aria-hidden="true"></span>
  {/if}
</div>

<style>
  .cl-divider {
    --_div-thickness: var(--_div-thickness, var(--border-width-divider));
    --_div-gap: var(--_div-gap, var(--spacing-md));

    /* Default divider color: use your semantic border token */
    --_div-color: var(--_div-color, var(--border-color-default));

    display: flex;
    align-items: center;
    width: 100%;
    color: var(--on-surface);
  }

  /* Horizontal */
  .cl-divider[data-orientation='horizontal'] {
    flex-direction: row;
    gap: var(--_div-gap);
  }

  /* Vertical */
  .cl-divider[data-orientation='vertical'] {
    flex-direction: column;
    width: auto;
    height: var(--_div-length, 100%);
    gap: var(--_div-gap);
  }

  .cl-divider__line {
    flex: 1 1 auto;
    border: 0;
  }

  .cl-divider[data-orientation='horizontal'] .cl-divider__line {
    border-top: var(--_div-thickness) solid var(--_div-color);
  }

  .cl-divider[data-orientation='vertical'] .cl-divider__line {
    flex: 0 0 auto;
    width: var(--_div-thickness);
    height: 100%;
    background: var(--_div-color);
  }

  /* Variants */
  .cl-divider[data-variant='dashed'][data-orientation='horizontal'] .cl-divider__line {
    border-top-style: dashed;
  }
  .cl-divider[data-variant='dotted'][data-orientation='horizontal'] .cl-divider__line {
    border-top-style: dotted;
  }
  .cl-divider[data-variant='soft'] {
    --_div-color: color-mix(in oklab, var(--border-color-default) 35%, transparent);
  }

  /* Label */
  .cl-divider__label-wrapper {
    flex: 0 0 auto;
    padding-inline: var(--spacing-sm);
    font-family: var(--type-label-family);
    font-size: var(--type-label-size);
    font-weight: var(--type-label-weight);
    letter-spacing: var(--type-label-tracking);
    text-transform: var(--type-label-transform);
    color: var(--on-surface-muted);
    white-space: nowrap;
  }

  /* Align */
  .cl-divider[data-align='start'] .cl-divider__line--left { flex: 0 0 auto; width: var(--size-6); }
  .cl-divider[data-align='end'] .cl-divider__line--right { flex: 0 0 auto; width: var(--size-6); }
</style>
