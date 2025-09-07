<script>
  /**
   * Badge component for displaying status, labels, or counts
   * @component
   */

  /** @type {'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral'} */
  export let variant = "primary";

  /** @type {'sm' | 'md' | 'lg'} */
  export let size = "md";

  /** @type {'solid' | 'outline' | 'soft'} */
  export let appearance = "solid";

  /** @type {boolean} */
  export let pill = false;

  /** @type {boolean} */
  export let removable = false;

  /** @type {string} */
  export let label = "";

  /** @type {Function} */
  export let onRemove = () => {};

  // Handle remove action
  function handleRemove(event) {
    event.stopPropagation();
    onRemove();
  }

  // Compute classes based on props
  $: classes = [
    "badge",
    `badge--${variant}`,
    `badge--${size}`,
    `badge--${appearance}`,
    pill && "badge--pill",
    removable && "badge--removable",
  ]
    .filter(Boolean)
    .join(" ");
</script>

<span
  class={classes}
  role="status"
  aria-label={label || $$props["aria-label"]}
  {...$$restProps}
>
  <slot />
  {#if removable}
    <button
      type="button"
      class="badge__remove"
      on:click={handleRemove}
      aria-label="Remove"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  {/if}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
    font-family: var(--base-font-family);
    font-weight: var(--font-weight-semibold);
    line-height: 1;
    white-space: nowrap;
    border: var(--default-border-width) solid transparent;
    transition: var(--border-transition);
    cursor: default;
  }

  /* Sizes */
  .badge--sm {
    padding: var(--spacing-1) var(--spacing-2);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-sm);
  }

  .badge--md {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--base-font-size);
    border-radius: var(--radius-base);
  }

  .badge--lg {
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--font-size-lg);
    border-radius: var(--radius-lg);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--radius-full);
  }

  /* Removable modifier */
  .badge--removable {
    padding-right: var(--spacing-1);
  }

  /* Primary variant */
  .badge--primary.badge--solid {
    background-color: var(--color-primary-500);
    color: var(--color-surface-50);
  }

  .badge--primary.badge--outline {
    background-color: transparent;
    border-color: var(--color-primary-500);
    color: var(--color-primary-500);
  }

  .badge--primary.badge--soft {
    background-color: var(--color-primary-100);
    color: var(--color-primary-700);
  }

  /* Secondary variant */
  .badge--secondary.badge--solid {
    background-color: var(--color-secondary-500);
    color: var(--color-surface-50);
  }

  .badge--secondary.badge--outline {
    background-color: transparent;
    border-color: var(--color-secondary-500);
    color: var(--color-secondary-500);
  }

  .badge--secondary.badge--soft {
    background-color: var(--color-secondary-100);
    color: var(--color-secondary-700);
  }

  /* Tertiary variant */
  .badge--tertiary.badge--solid {
    background-color: var(--color-tertiary-500);
    color: var(--color-surface-50);
  }

  .badge--tertiary.badge--outline {
    background-color: transparent;
    border-color: var(--color-tertiary-500);
    color: var(--color-tertiary-500);
  }

  .badge--tertiary.badge--soft {
    background-color: var(--color-tertiary-100);
    color: var(--color-tertiary-700);
  }

  /* Success variant */
  .badge--success.badge--solid {
    background-color: var(--color-success-500);
    color: var(--color-surface-50);
  }

  .badge--success.badge--outline {
    background-color: transparent;
    border-color: var(--color-success-500);
    color: var(--color-success-500);
  }

  .badge--success.badge--soft {
    background-color: var(--color-success-100);
    color: var(--color-success-700);
  }

  /* Warning variant */
  .badge--warning.badge--solid {
    background-color: var(--color-warning-500);
    color: var(--color-surface-50);
  }

  .badge--warning.badge--outline {
    background-color: transparent;
    border-color: var(--color-warning-500);
    color: var(--color-warning-500);
  }

  .badge--warning.badge--soft {
    background-color: var(--color-warning-100);
    color: var(--color-warning-700);
  }

  /* Error variant */
  .badge--error.badge--solid {
    background-color: var(--color-error-500);
    color: var(--color-surface-50);
  }

  .badge--error.badge--outline {
    background-color: transparent;
    border-color: var(--color-error-500);
    color: var(--color-error-500);
  }

  .badge--error.badge--soft {
    background-color: var(--color-error-100);
    color: var(--color-error-700);
  }

  /* Info variant */
  .badge--info.badge--solid {
    background-color: var(--color-info-500);
    color: var(--color-surface-50);
  }

  .badge--info.badge--outline {
    background-color: transparent;
    border-color: var(--color-info-500);
    color: var(--color-info-500);
  }

  .badge--info.badge--soft {
    background-color: var(--color-info-100);
    color: var(--color-info-700);
  }

  /* Accent variant */
  .badge--accent.badge--solid {
    background-color: var(--color-accent-500);
    color: var(--color-surface-50);
  }

  .badge--accent.badge--outline {
    background-color: transparent;
    border-color: var(--color-accent-500);
    color: var(--color-accent-500);
  }

  .badge--accent.badge--soft {
    background-color: var(--color-accent-100);
    color: var(--color-accent-700);
  }

  /* Neutral variant */
  .badge--neutral.badge--solid {
    background-color: var(--color-neutral-500);
    color: var(--color-surface-50);
  }

  .badge--neutral.badge--outline {
    background-color: transparent;
    border-color: var(--color-neutral-500);
    color: var(--color-neutral-500);
  }

  .badge--neutral.badge--soft {
    background-color: var(--color-neutral-100);
    color: var(--color-neutral-700);
  }

  /* Remove button */
  .badge__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-1);
    margin-left: var(--spacing-1);
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: currentColor;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity var(--motion-duration-fast) var(--motion-ease);
  }

  .badge__remove:hover {
    opacity: 1;
  }

  .badge__remove:focus {
    outline: var(--default-ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset-width);
    border-radius: var(--radius-focus-ring);
  }
</style>
