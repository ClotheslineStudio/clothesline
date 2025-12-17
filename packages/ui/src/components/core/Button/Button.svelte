<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'solid' | 'outline' | 'ghost' | 'link' = 'solid';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'neutral' = 'primary';

  export let disabled = false;
  export let loading = false;

  // Optional props
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;

  const baseClass = 'cl-button';

  // loading behaves like disabled for interaction
  $: isDisabled = disabled || loading;

  $: colorClass = `${baseClass}--color-${color}`;
  $: variantClass = `${baseClass}--variant-${variant}`;
  $: sizeClass = `${baseClass}--size-${size}`;
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {...$$restProps}
  type={href ? undefined : type}
  href={isDisabled ? undefined : href}
  target={href && !isDisabled ? target : undefined}
  rel={href && !isDisabled ? rel : undefined}
  aria-label={ariaLabel}
  aria-disabled={isDisabled ? 'true' : undefined}
  aria-busy={loading ? 'true' : undefined}
  tabindex={href && isDisabled ? -1 : undefined}
  class={`${baseClass} ${colorClass} ${variantClass} ${sizeClass}`}
  disabled={href ? undefined : isDisabled}
>
  <slot name="icon-left" />
  <slot />
  <slot name="icon-right" />
</svelte:element>

<style>
  /* ==========================================================================
     Clothesline Button — canonical, component-token-first
     - Base class consumes ONLY --button-* tokens
     - Variants/roles only remap the active token set
  ========================================================================== */

  .cl-button {
    /* ----- layout ----- */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-gap, var(--spacing-2));
    white-space: nowrap;
    user-select: none;

    /* ----- typography (foundation semantic) ----- */
    font-family: var(--type-button-family);
    font-weight: var(--type-button-weight);
    text-transform: var(--type-button-transform);
    font-size: var(--type-button-size);
    line-height: var(--type-button-leading);
    letter-spacing: var(--type-button-tracking);

    /* ----- sizing ----- */
    padding: var(--button-padding-y, var(--spacing-2))
             var(--button-padding-x, var(--spacing-4));
    border-radius: var(--button-radius, var(--radius-interactive));

    /* ----- paint (component tokens) ----- */
    background: var(--button-bg, var(--color-primary-500-vis));
    color: var(--button-text, var(--on-primary));
    border: var(--button-border, 1px solid var(--color-primary-600-vis));

    /* ----- elevation / motion ----- */
    box-shadow: var(--button-shadow, var(--elevation-1));
    transform: translateY(0);
    cursor: pointer;

    transition: var(--button-transition, background-color 150ms ease-out);
  }

  /* Hover / Active */
  .cl-button:hover:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-bg-hover, var(--button-bg));
    border: var(--button-border-hover, var(--button-border));
    box-shadow: var(--button-shadow-hover, var(--button-shadow));
  }

  .cl-button:active:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-bg-active, var(--button-bg-hover, var(--button-bg)));
    border: var(--button-border-active, var(--button-border-hover, var(--button-border)));
    box-shadow: var(--button-shadow-active, var(--elevation-0, none));
    transform: translateY(var(--button-press-translate, 1px));
  }

  /* Focus (component tokens wired to foundations) */
  .cl-button:focus-visible {
    outline: var(--button-focus-ring-width, var(--focus-width, 2px)) solid
             var(--button-focus-ring-color, var(--focus-color, var(--color-primary-400-vis)));
    outline-offset: var(--button-focus-ring-offset, var(--focus-offset, 2px));
  }

  /* Disabled (support both patterns) */
  .cl-button[aria-disabled="true"],
  .cl-button[disabled] {
    cursor: not-allowed;
    pointer-events: none;

    background: var(--button-bg-disabled, var(--color-surface-300-vis));
    border: var(--button-border-disabled, 1px solid var(--color-surface-400-vis));
    color: var(--button-text-disabled, var(--on-surface-muted));
    opacity: var(--button-disabled-opacity, var(--opacity-disabled, 0.38));

    box-shadow: var(--elevation-0, none);
    transform: none;
    text-decoration: none;
  }

  /* =========================
     Sizes (semantic)
     - If you want tokenized sizes later, introduce --button-padding-x-sm etc.
     ========================= */

  .cl-button--size-sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--type-scale-sm);
    gap: var(--spacing-1);
  }
  .cl-button--size-md {
    padding: var(--button-padding-y, var(--spacing-2)) var(--button-padding-x, var(--spacing-4));
    font-size: var(--type-button-size);
    gap: var(--button-gap, var(--spacing-2));
  }
  .cl-button--size-lg {
    padding: var(--spacing-3) var(--spacing-5);
    font-size: var(--type-scale-lg);
    gap: var(--spacing-2);
  }

  /* =========================
     Color roles (solid)
     - Set a role “source” token so variants can reuse it.
     - Solid role class updates the *base* token set (bg/border/text)
     ========================= */

  .cl-button { --cl-role: primary; }

  .cl-button--color-primary   { --cl-role: primary;   }
  .cl-button--color-secondary { --cl-role: secondary; }
  .cl-button--color-success   { --cl-role: success;   }
  .cl-button--color-warning   { --cl-role: warning;   }
  .cl-button--color-error     { --cl-role: error;     }
  .cl-button--color-info      { --cl-role: info;      }
  .cl-button--color-neutral   { --cl-role: neutral;   }

  /* Solid role mapping (keeps semantics in one place) */
  .cl-button--color-primary,
  .cl-button--color-secondary,
  .cl-button--color-success,
  .cl-button--color-warning,
  .cl-button--color-error,
  .cl-button--color-info,
  .cl-button--color-neutral {
    /* Defaults assume your token file defines these.
       If you later generate role-specific button tokens (recommended),
       replace these with --button-bg-role etc. */
  }

  /* =========================
     Variants
     - Variants remap the active token set
     ========================= */

  /* OUTLINE */
  .cl-button--variant-outline {
    background: var(--button-outline-bg, transparent);
    color: var(--button-outline-text, var(--on-surface-strong, var(--on-surface)));
    border: var(--button-outline-border, 1px solid var(--color-primary-400-vis));
    box-shadow: var(--elevation-0, none);
  }
  .cl-button--variant-outline:hover:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-outline-bg-hover, var(--button-outline-bg));
    border: var(--button-outline-border-hover, var(--button-outline-border));
  }
  .cl-button--variant-outline:active:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-outline-bg-active, var(--button-outline-bg-hover, var(--button-outline-bg)));
    border: var(--button-outline-border-active, var(--button-outline-border-hover, var(--button-outline-border)));
    transform: translateY(var(--button-press-translate, 1px));
  }

  /* GHOST */
  .cl-button--variant-ghost {
    background: var(--button-ghost-bg, transparent);
    color: var(--button-ghost-text, var(--on-surface-strong, var(--on-surface)));
    border: var(--button-ghost-border, 1px solid transparent);
    box-shadow: var(--elevation-0, none);
  }
  .cl-button--variant-ghost:hover:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-ghost-bg-hover, var(--button-ghost-bg));
    border: var(--button-ghost-border-hover, var(--button-ghost-border));
  }
  .cl-button--variant-ghost:active:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-ghost-bg-active, var(--button-ghost-bg-hover, var(--button-ghost-bg)));
    border: var(--button-ghost-border-active, var(--button-ghost-border-hover, var(--button-ghost-border)));
    transform: translateY(var(--button-press-translate, 1px));
  }

  /* LINK */
  .cl-button--variant-link {
    background: var(--button-link-bg, transparent);
    color: var(--button-link-text, var(--anchor-color));
    border: var(--button-link-border, 1px solid transparent);
    box-shadow: var(--elevation-0, none);

    text-decoration: var(--button-link-text-decoration, var(--anchor-decoration, underline));
    padding-inline: 0;
    gap: var(--spacing-1);
  }
  .cl-button--variant-link:hover:not([aria-disabled="true"]):not([disabled]) {
    color: var(--button-link-text-hover, var(--anchor-color-hover, var(--button-link-text)));
    text-decoration: var(--button-link-text-decoration-hover, var(--anchor-decoration-hover, underline));
    background: var(--button-link-bg-hover, transparent);
  }
  .cl-button--variant-link:active:not([aria-disabled="true"]):not([disabled]) {
    background: var(--button-link-bg-active, transparent);
    transform: translateY(0);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .cl-button { transition: none; }
  }
</style>














