<script lang="ts">
  export let value: number | undefined;
  export let max: number = 100;
  export let label: string = 'Progress';
  export let showLabel: boolean = true;
  export let className = '';

  const hasPercent = label.includes('%');
  $: pct =
    value === undefined ? undefined : Math.max(0, Math.min(100, (value / max) * 100));
</script>

<div class="cl-progress-wrapper {className}">
  {#if showLabel}
    <div class="cl-progress-label">
      {label}{!hasPercent && pct !== undefined ? `: ${Math.round(pct)}%` : ''}
    </div>
  {/if}

  <div
    class="cl-progress"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax={max}
    aria-valuenow={value !== undefined ? value : undefined}
    aria-label={label}
    data-indeterminate={value === undefined}
  >
    <div class="cl-progress-track">
      <div
        class="cl-progress-fill"
        style={pct !== undefined ? `width:${pct}%` : undefined}
        data-indeterminate={value === undefined}
      ></div>
    </div>
  </div>
</div>

<style>
  /* Wrapper & label */
  .cl-progress-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2, 0.5rem);
  }
  .cl-progress-label {
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: 500;
    color: var(--base-font-color, oklch(15% 0 0));
  }

  /* Component-scoped tokens (default values read from the theme) */
  .cl-progress {
    /* size */
    --pb-height: var(--progress-height, 0.5rem);
    --pb-radius: var(--radius-sm, 0.25rem);

    /* colors — use the vision/contrast-aware aliases from the generator */
    --pb-track: var(--progress-track, var(--color-surface-300-vis, #d1d5db));
    --pb-fill:  var(--progress-fill,  var(--color-primary-600-vis, #3756a5));
    /* for indeterminate gradient */
    --pb-fill-2: var(--progress-fill-2, var(--color-primary-400-vis, #7692ff));

    /* motion */
    --pb-anim-dur: var(--motion-duration-base, 250ms);
  }

  .cl-progress { width: 100%; }

  .cl-progress-track {
    height: var(--pb-height);
    background: var(--pb-track);
    border-radius: var(--pb-radius);
    overflow: hidden;
  }

  .cl-progress-fill {
    height: 100%;
    background: var(--pb-fill);
    transition: width var(--pb-anim-dur) ease;
  }

  /* Indeterminate animation */
  .cl-progress-fill[data-indeterminate='true'] {
    width: 100%;
    background-image: linear-gradient(to right, var(--pb-fill-2), var(--pb-fill), var(--pb-fill-2));
    background-size: 200% auto;
    animation: cl-progress-indeterminate 1.5s linear infinite;
  }

  @keyframes cl-progress-indeterminate {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }

  /* Respect reduced motion */
  :global(html[data-motion='reduced']) .cl-progress-fill[data-indeterminate='true'],
  :global(html[data-motion='off']) .cl-progress-fill[data-indeterminate='true'] {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }

  /* Forced-colors (Windows High Contrast) fallback */
  @media (forced-colors: active) {
    .cl-progress-track { background: Canvas; }
    .cl-progress-fill  { background: Highlight; }
  }
</style>



