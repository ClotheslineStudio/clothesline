<!-- AUTO-GENERATED. Do not edit by hand. -->
<script lang="ts">
  export let size: number | string = 24;
  export let strokeWidth: number | string | undefined = undefined;
  export let variant: 'stroke' | 'filled' | 'duotone' | 'animated' = 'stroke';
  export let role: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';
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
  shape-rendering="geometricPrecision"
  {...$$restProps}
>
  {#if title}<title>{title}</title>{/if}

  {#if variant === 'filled' && true}
    <g fill="currentColor" stroke="none">
      <g id="Property 1=filled"><path id="Subtract" fill="currentColor" d="M12.9 4.243a3 3 0 0 1 2.12.878l6.486 6.485a3 3 0 0 1 0 4.244l-5.656 5.656a3 3 0 0 1-4.244 0L5.121 15.02a3 3 0 0 1-.878-2.122V7.242a3 3 0 0 1 3-2.999zM9.484 8.071a1 1 0 1 0-1.414 1.414 1 1 0 0 0 1.414-1.414"/></g>
    </g>

{:else if variant === 'duotone' && true}
  {#if true}
    <g class="tone2" style="color:{colorByRole[secondaryRole]}">
      <g fill="currentColor" stroke="none">
        <path id="tone2" fill="currentColor" fill-rule="evenodd" d="M12.9 5.242a2 2 0 0 1 1.413.586l6.486 6.485a2 2 0 0 1 0 2.83l-5.656 5.656a2 2 0 0 1-2.83 0l-6.485-6.485a2 2 0 0 1-.586-1.415V7.243a2 2 0 0 1 2-2zm-3.415 2.83a1 1 0 1 0-1.414 1.413 1 1 0 0 0 1.414-1.414" clip-rule="evenodd"/>
      </g>
    </g>
  {/if}

  <g class="tone1"
     style="color:{colorByRole[role]}; paint-order: stroke fill"
     stroke="currentColor"
     stroke-width={effectiveStrokeWidth}>
    <path id="tone1" d="M20.799 15.142 15.142 20.8a2 2 0 0 1-2.828 0l-6.486-6.485a2 2 0 0 1-.585-1.415V7.244a2 2 0 0 1 2-2h5.656a2 2 0 0 1 1.415.585l6.485 6.486a2 2 0 0 1 0 2.828Z"/>
  </g>



  {:else}
    <!-- Stroke (default/fallback) -->
    <g stroke="currentColor" stroke-width={effectiveStrokeWidth}>
      <g id="Property 1=stroke"><g id="Group 1"><path id="Vector 59" d="M20.799 15.142 15.142 20.8a2 2 0 0 1-2.828 0l-6.486-6.485a2 2 0 0 1-.585-1.415V7.244a2 2 0 0 1 2-2h5.656a2 2 0 0 1 1.415.585l6.485 6.486a2 2 0 0 1 0 2.828Z"/><circle id="Ellipse 25" cx="8.778" cy="8.778" r=".5" transform="rotate(-45 8.778 8.778)"/></g></g>
    </g>
  {/if}
</svg>
