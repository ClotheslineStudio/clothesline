<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let variant: 'solid' | 'dashed' | 'dotted' | 'soft' = 'solid';
  export let thickness: 'hairline' | 'sm' | 'md' | 'lg' | 'xl' | string | number = 'md';
  export let space: 'none' | 'sm' | 'md' | 'lg' = 'md';
  export let label: string | undefined = undefined;
  export let align: 'start' | 'center' | 'end' = 'center';
  export let color: string | undefined = undefined;
  export let decorative: boolean = false;
  export let length: string | undefined = undefined; // for vertical
  export let className = '';

  const hasLabel = !!label || !!$$slots.default;

  function thicknessToCSS(v: typeof thickness): string {
    if (typeof v === 'number') return `${v}px`;
    if (typeof v === 'string' && /[a-z%)/]/i.test(v)) return v;
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
  $: styleVars = `
    --_div-thickness:${thicknessToCSS(thickness)};
    --_div-gap:${spaceToCSS(space)};
    ${color ? `--_div-color:${color};` : ''}
    ${length && orientation === 'vertical' ? `--_div-length:${length};` : ''}
  `;
  $: roleAttr = decorative ? 'presentation' : 'separator';
  let ariaOrientation: "horizontal" | "vertical" | null | undefined;
  $: ariaOrientation = decorative
    ? undefined
    : orientation === "horizontal"
      ? "horizontal"
      : "vertical";
  $: ariaLabel = decorative ? undefined : (hasLabel && typeof label === 'string' ? label : undefined);
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
  aria-hidden={decorative ? 'true' : undefined}
>
  {#if hasLabel}
    <span class="cl-divider__line" aria-hidden="true"></span>
    <span class="cl-divider__label"><slot>{label}</slot></span>
    <span class="cl-divider__line" aria-hidden="true"></span>
  {/if}
</div>

<style>
  .cl-divider {
    /* base color resolution with safe fallbacks */
    --_base-color: var(--_div-color, var(--divider-color, var(--border-default-color, var(--color-surface-300))));
    --_color-soft: color-mix(in oklab, var(--_base-color) 50%, transparent);
    --_color: var(--_color-effective, var(--_base-color));
  }
  .cl-divider[data-variant='soft'] { --_color-effective: var(--_color-soft); }

  /* --- Plain: draw with ::before to avoid <hr> resets --- */
  .cl-divider.is-plain {
    position: relative;
  }

  .cl-divider.is-plain[data-orientation='horizontal'] {
    width: 100%;
    margin-block: var(--_div-gap);
    height: 0; /* visual line comes from ::before */
  }
  .cl-divider.is-plain[data-orientation='horizontal']::before {
    content: '';
    display: block;
    height: var(--_div-thickness);
    width: 100%;
    /* solid fallback */
    background-color: var(--_color);
    /* dashed/dotted use border on pseudo-element for crisp caps */
    border-top: 0;
  }
  .cl-divider.is-plain[data-orientation='horizontal'][data-variant='dashed']::before {
    background: none;
    border-top: var(--_div-thickness) dashed var(--_color);
  }
  .cl-divider.is-plain[data-orientation='horizontal'][data-variant='dotted']::before {
    background: none;
    border-top: var(--_div-thickness) dotted var(--_color);
  }

  .cl-divider.is-plain[data-orientation='vertical'] {
    width: 0;
    margin-inline: var(--_div-gap);
    height: var(--_div-length, 100%);
  }
  .cl-divider.is-plain[data-orientation='vertical']::before {
    content: '';
    display: block;
    width: var(--_div-thickness);
    height: 100%;
    background-color: var(--_color);
    border-left: 0;
  }
  .cl-divider.is-plain[data-orientation='vertical'][data-variant='dashed']::before {
    background: none;
    border-left: var(--_div-thickness) dashed var(--_color);
    height: 100%;
  }
  .cl-divider.is-plain[data-orientation='vertical'][data-variant='dotted']::before {
    background: none;
    border-left: var(--_div-thickness) dotted var(--_color);
    height: 100%;
  }

  /* --- Labeled layout --- */
  .cl-divider.is-labeled {
    display: flex;
    align-items: center;
    gap: var(--_div-gap);
    color: var(--_color);
  }
  .cl-divider.is-labeled[data-orientation='horizontal'] {
    width: 100%;
    margin-block: var(--_div-gap);
  }
  .cl-divider.is-labeled[data-orientation='vertical'] {
    flex-direction: column;
    height: var(--_div-length, 100%);
    margin-inline: var(--_div-gap);
  }

  .cl-divider__line {
    flex: 1 1 0;
    min-width: 0;
  }
  .cl-divider.is-labeled[data-orientation='horizontal'] .cl-divider__line {
    border-top: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider.is-labeled[data-orientation='vertical'] .cl-divider__line {
    width: 0;
    border-left: var(--_div-thickness) solid var(--_color);
  }
  .cl-divider[data-variant='dashed'] .cl-divider__line {
    border-style: dashed;
  }
  .cl-divider[data-variant='dotted'] .cl-divider__line {
    border-style: dotted;
  }

  .cl-divider__label {
    font: inherit;
    color: var(--base-font-color, currentColor);
    padding: 0 var(--spacing-2, .25rem);
    white-space: nowrap;
  }

  .cl-divider[data-orientation='horizontal'][data-align='start']  { justify-content: flex-start; }
  .cl-divider[data-orientation='horizontal'][data-align='center'] { justify-content: center; }
  .cl-divider[data-orientation='horizontal'][data-align='end']    { justify-content: flex-end; }

  @media (prefers-reduced-motion: reduce) {
    .cl-divider { transition: none !important; }
  }
</style>





