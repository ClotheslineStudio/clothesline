<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  /** If not provided, uses var(--cl-icon-stroke) so HC mode can thicken automatically */
  export let strokeWidth: number | string | undefined = undefined;

  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';

  export let role: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';
  /** Used for duotone secondary layer; defaults to 'muted' */
  export let secondaryRole: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'muted';

  export let className: string = '';
  export let ariaLabel: string = 'icon';
  export let title: string | undefined = undefined;

  const colorByRole = {
    default: 'var(--cl-icon)',
    muted: 'var(--cl-icon-muted)',
    primary: 'var(--cl-icon-primary)',
    success: 'var(--cl-icon-success)',
    warning: 'var(--cl-icon-warning)',
    error: 'var(--cl-icon-error)'
  } as const;

  $: effectiveStrokeWidth = strokeWidth ?? 'var(--cl-icon-stroke)';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={effectiveStrokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  role="img"
  class={className}
  style="color: {colorByRole[role]}"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && false}
    <g fill="currentColor" stroke="none">
      
    </g>

  {:else if variant === 'duotone' && false}
    <g class="tone1" style="color:{colorByRole[role]}">
      
    </g>
    {#if false}
      <g class="tone2" style="color:{colorByRole[secondaryRole]}">
        <g fill="currentColor" stroke="none">
          
        </g>
      </g>
    {/if}

  {:else}
    <!-- Stroke (default/fallback) -->
    <path d="M0 0h24v24H0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 8v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8m-2.444 0H20m-4.444 0V5a2 2 0 0 0-2-2h-3.112a2 2 0 0 0-2 2v3m7.112 0H8.444M4 8h4.444m1.778 4v6m3.556-6v6"/>
  {/if}
</svg>
