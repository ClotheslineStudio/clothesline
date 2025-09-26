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
    <path d="M0 0h24v24H0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m14.36 7.078 3.15 3.368M5.105 15.891l-.908 2.637a1 1 0 0 0 1.207 1.29l2.692-.729a1 1 0 0 0 .421-.234L19.685 8.41a2.306 2.306 0 1 0-3.15-3.368L5.368 15.486a1 1 0 0 0-.262.405"/>
  {/if}
</svg>
