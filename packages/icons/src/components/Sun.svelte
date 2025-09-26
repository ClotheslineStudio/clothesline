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

  {#if variant === 'filled' && true}
    <g fill="currentColor" stroke="none">
      <circle fill="currentColor" cx="12" cy="12" r="4.998" transform="rotate(90.027 12 12)"/><path fill="currentColor" d="M20 11.004h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2m-3.047-5.366 1.415-1.413A1 1 0 1 1 19.78 5.64l-1.415 1.413a1 1 0 1 1-1.413-1.415M2 10.995l2 .001a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2m2.219 7.364 1.415-1.413a1 1 0 1 1 1.413 1.415l-1.414 1.413a1 1 0 0 1-1.414-1.415M11 4V2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0M5.636 7.05 4.222 5.636a1 1 0 1 1 1.414-1.414L7.05 5.636A1 1 0 1 1 5.636 7.05M11 22v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m7.364-2.222-1.415-1.414a1 1 0 0 1 1.415-1.414l1.414 1.414a1 1 0 0 1-1.414 1.414"/>
    </g>

  {:else if variant === 'duotone' && true}
    <g class="tone1" style="color:{colorByRole[role]}">
      
    </g>
    {#if true}
      <g class="tone2" style="color:{colorByRole[secondaryRole]}">
        <g fill="currentColor" stroke="none">
          <circle cx="12" cy="12" r="4.002" fill="currentColor" transform="rotate(90.027 12 12)"/>
        </g>
      </g>
    {/if}

  {:else}
    <!-- Stroke (default/fallback) -->
    <circle cx="12" cy="12" r="4.002" stroke-width="2" transform="rotate(90.027 12 12)"/><path stroke-linecap="round" stroke-width="2" d="m22 12.005-2-.001m-.925-7.072L17.66 6.346M4 11.996H2m4.34 5.658-1.414 1.414M12 2v2m-7.071.929 1.414 1.414M12 22v-2m7.071-.929-1.414-1.414"/>
  {/if}
</svg>
