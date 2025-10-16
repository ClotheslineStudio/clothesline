<script lang="ts">
  type Variant =
    | 'body'
    | 'heading'
    | 'subheading'
    | 'caption'
    | 'overline'
    | 'code'
    | 'lead';

  type Tone =
    | 'default'
    | 'muted'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';

  export let variant: Variant = 'body';
  export let as: keyof HTMLElementTagNameMap | undefined = undefined;
  export let ariaLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

  export let tone: Tone = 'default';
  export let align: 'start' | 'center' | 'end' | 'justify' = 'start';
  export let transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' = 'none';
  export let italic = false;
  export let underline = false;
  export let truncate = false;
  export let clamp: number | null = null;
  export let weight: number | 'normal' | 'medium' | 'semibold' | 'bold' | null = null;
  export let className = '';

  const defaultTag: Record<Variant, keyof HTMLElementTagNameMap> = {
    body: 'p',
    heading: 'h2',
    subheading: 'h3',
    caption: 'span',
    overline: 'span',
    code: 'code',
    lead: 'p'
  };

  $: tag = as ?? defaultTag[variant];
  $: isSemanticHeading =
    variant === 'heading' && !/^h[1-6]$/.test(tag);

  const weightMap = { normal: 400, medium: 500, semibold: 600, bold: 700 } as const;
  $: resolvedWeight = typeof weight === 'number' ? weight : weight ? weightMap[weight] : null;
  $: lineClamp = typeof clamp === 'number' && clamp > 0 ? clamp : null;
</script>

<svelte:element
  this={tag}
  class={`text text--${variant} tone-${tone}
          ${truncate ? 'truncate' : ''}
          ${lineClamp ? 'clamp' : ''}
          ${italic ? 'italic' : ''}
          ${underline ? 'underline' : ''}
          align-${align}
          transform-${transform}
          ${className}`.replace(/\s+/g, ' ')
  }
  {...(isSemanticHeading ? { role: 'heading', 'aria-level': ariaLevel } : {})}
  style={lineClamp ? `--line-clamp:${lineClamp};${resolvedWeight ? `--weight:${resolvedWeight}` : ''}` : (resolvedWeight ? `--weight:${resolvedWeight}` : undefined)}
>
  <slot />
</svelte:element>

<style>
  .text {
    color: var(--base-font-color, #111);
    line-height: var(--line-height-base, 1.5);
    font-weight: var(--weight, inherit);
  }

  /* Variants */
  .text--body {
    font-size: var(--text-base, 1rem);
    font-weight: var(--weight, 400);
  }

  .text--heading {
    font-size: var(--text-2xl, 1.5rem);
    line-height: var(--line-height-tight, 1.2);
    font-weight: var(--weight, 700);
  }

  .text--subheading {
    font-size: var(--text-xl, 1.25rem);
    font-weight: var(--weight, 600);
  }

  .text--caption {
    font-size: var(--text-sm, 0.875rem);
    color: var(--muted-font-color, #666);
  }

  .text--overline {
    font-size: var(--text-xs, 0.75rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-font-color, #666);
  }

  .text--code {
    font-family: var(--font-mono, monospace);
    background: var(--color-surface-100, #f4f4f4);
    padding: 0.125rem 0.25rem;
    border-radius: var(--radius-sm, 0.25rem);
    font-size: var(--text-sm, 0.875rem);
  }

  .text--lead {
    font-size: var(--text-lg, 1.125rem);
    font-weight: var(--weight, 400);
    color: var(--base-font-color, #333);
  }

  /* Tone */
 .tone-default { color: var(--base-font-color, var(--color-surface-950)); }
.tone-muted   { color: var(--text-muted, var(--color-surface-700)); }
.tone-primary { color: var(--text-primary, var(--color-primary-700)); }
.tone-success { color: var(--text-success, var(--color-success-700)); }
.tone-warning { color: var(--text-warning, var(--color-warning-700)); }
.tone-error   { color: var(--text-error,   var(--color-error-700)); }
.tone-info    { color: var(--text-info,    var(--color-info-700)); }

  /* Utilities */
  .align-start   { text-align: start; }
  .align-center  { text-align: center; }
  .align-end     { text-align: end; }
  .align-justify { text-align: justify; }

  .transform-none      { text-transform: none; }
  .transform-uppercase { text-transform: uppercase; }
  .transform-lowercase { text-transform: lowercase; }
  .transform-capitalize{ text-transform: capitalize; }

  .italic { font-style: italic; }
  .underline { text-decoration: underline; text-underline-offset: 0.15em; }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .clamp {
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp, 2);
    line-clamp: var(--line-clamp, 2);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
