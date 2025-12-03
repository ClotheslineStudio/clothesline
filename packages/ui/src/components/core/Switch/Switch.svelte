<script lang="ts">
  // ✅ Controlled prop for bind:checked
  export let checked: boolean | undefined = undefined;

  // ✅ Uncontrolled default (for places already using defaultChecked)
  export let defaultChecked: boolean | undefined = undefined;

  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let ariaLabel: string | undefined = undefined;

  // Keeping these so existing story/docs don’t break
  let variant: 'solid' | 'soft' | 'outline' = 'solid';
  let color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'neutral' = 'primary';

  // --- Internal state for uncontrolled mode ---
  let internalValue = defaultChecked ?? false;

  // Single source of truth for the template
  $: value = checked ?? internalValue;

  function toggle() {
    if (disabled || readOnly) return;

    const next = !value;
    internalValue = next; // keeps uncontrolled use working
    checked = next;       // lets bind:checked sync with the parent
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={value}
  disabled={disabled}
  id={id}
  aria-label={ariaLabel}
  on:click={toggle}
  class="switch"
>
  <span class="track">
    <span class="thumb"></span>
  </span>
</button>

{#if name}
  <input type="checkbox" name={name} checked={value} hidden />
{/if}

<style>
  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;

    /* SIZE – with fallbacks so it’s visible even if tokens aren’t set */
    width: var(--switch-track-width, 2.25rem);
    height: var(--switch-track-height, 1.25rem);
    border-radius: var(--switch-radius, 9999px);

    /* TRACK COLOR – fallback gives you a visible pill even if theme tokens fail */
    background: var(
      --switch-track-bg,
      var(--color-surface-400-vis, #cbd5f5)
    );

    cursor: pointer;
    border: none;
    transition:
      background var(--switch-motion-duration, 150ms)
        var(--switch-motion-ease, ease-in-out);
  }

  /* Track states */
  .switch[aria-checked='true'] {
    background: var(
      --switch-track-bg-active,
      var(--color-primary-500-vis, #6366f1)
    );
  }

  .switch:hover:not(:disabled):not([aria-checked='true']) {
    background: var(
      --switch-track-bg-hover,
      var(--color-surface-500-vis, #94a3f0)
    );
  }

  .switch[aria-checked='true']:hover:not(:disabled) {
    background: var(
      --switch-track-bg-checked-hover,
      var(--color-primary-600-vis, #4f46e5)
    );
  }

  .switch:disabled {
    background: var(
      --switch-track-bg-disabled,
      var(--color-surface-300, #e2e8f0)
    );
    opacity: 0.6;
    cursor: not-allowed;
  }

  .track {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  /* Thumb */
  .thumb {
    position: absolute;
    top: var(--switch-gap, 2px);
    left: var(--switch-gap, 2px);
    width: var(--switch-thumb-size, 1rem);
    height: var(--switch-thumb-size, 1rem);
    border-radius: var(--switch-radius, 9999px);

    background: var(
      --switch-thumb-bg,
      var(--color-surface-0, #ffffff)
    );
    box-shadow: var(
      --switch-thumb-shadow,
      0 1.5px 3px rgba(0, 0, 0, 0.25)
    );

    transition:
      transform var(--switch-motion-duration, 150ms)
        var(--switch-motion-ease, ease-in-out),
      background var(--switch-motion-duration, 150ms)
        var(--switch-motion-ease, ease-in-out),
      box-shadow var(--switch-motion-duration, 150ms)
        var(--switch-motion-ease, ease-in-out);
    will-change: transform;
  }

  .switch[aria-checked='true'] .thumb {
    transform: translateX(
      calc(
        var(--switch-track-width, 2.25rem)
          - var(--switch-thumb-size, 1rem)
          - (var(--switch-gap, 2px) * 2)
      )
    );
    background: var(
      --switch-thumb-bg-active,
      var(--on-primary, #ffffff)
    );
    box-shadow: var(
      --switch-thumb-shadow-active,
      0 2px 6px rgba(0, 0, 0, 0.28)
    );
  }

  .switch:disabled .thumb {
    background: var(
      --switch-thumb-bg-disabled,
      var(--color-surface-200, #e5e7eb)
    );
  }

  .switch:active .thumb {
    box-shadow: var(
      --switch-thumb-shadow-active,
      0 2px 6px rgba(0, 0, 0, 0.28)
    );
  }

  /* Focus ring */
  .switch:focus-visible {
    outline: var(
      --switch-focus-ring,
      2px solid var(--color-primary-500-vis, #6366f1)
    );
    outline-offset: var(--switch-focus-ring-offset, 2px);
  }
</style>





