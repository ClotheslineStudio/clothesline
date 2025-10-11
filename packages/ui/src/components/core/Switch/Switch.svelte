<script lang="ts">
  // --- Props ---
  // removed unused export 'checked'
  export let defaultChecked: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  // removed unused export 'required'
  // export let size: "sm" | "md" | "lg" = "md"; // Removed unused export property 'size'
  let variant: "solid" | "soft" | "outline" = "solid";
  let color:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral" = "primary";
  export let ariaLabel: string | undefined = undefined;

  // --- Internal state ---
  let currentValue = defaultChecked ?? false;

  // --- Toggle function ---
  function toggle() {
    if (disabled || readOnly) return;

    currentValue = !currentValue;
  }
</script>

<button
  role="switch"
  aria-checked={currentValue}
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
  <input type="checkbox" name={name} checked={currentValue} hidden />
{/if}


<style>
  .switch {
    position: relative;
    width: var(--switch-track-width);
    height: var(--switch-track-height);
    border-radius: var(--switch-radius);
    background: var(--switch-track-bg);
    cursor: pointer;
    transition: background var(--switch-motion-duration) var(--switch-motion-ease);
    border: none; /* no border on track */
  }

  /* Track states */
  .switch[aria-checked="true"] {
    background: var(--switch-track-bg-active);
  }
  .switch:hover:not(:disabled):not([aria-checked="true"]) {
    background: var(--switch-track-bg-hover);
  }
  .switch[aria-checked="true"]:hover:not(:disabled) {
    background: var(--switch-track-bg-checked-hover); /* darker shade of primary */
  }
  .switch:disabled {
    background: var(--switch-track-bg-disabled);
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Thumb */
  .thumb {
    position: absolute;
    top: var(--switch-gap);
    left: var(--switch-gap);
    width: var(--switch-thumb-size);
    height: var(--switch-thumb-size);
    border-radius: var(--switch-radius);
    background: var(--switch-thumb-bg);
    box-shadow: var(--switch-thumb-shadow);
    transition:
      transform var(--switch-motion-duration) var(--switch-motion-ease),
      background var(--switch-motion-duration) var(--switch-motion-ease),
      box-shadow var(--switch-motion-duration) var(--switch-motion-ease);
    will-change: transform;
  }
  .switch[aria-checked="true"] .thumb {
    transform: translateX(calc(var(--switch-track-width) - var(--switch-thumb-size) - (var(--switch-gap) * 2)));
    background: var(--switch-thumb-bg-active);
  }
  .switch:disabled .thumb {
    background: var(--switch-thumb-bg-disabled);
  }
  .switch:active .thumb {
    box-shadow: var(--switch-thumb-shadow-active); /* pressed depth */
  }

  /* Focus ring */
  .switch:focus-visible {
    outline: var(--switch-focus-ring);
    outline-offset: var(--switch-focus-ring-offset);
  }
</style>



