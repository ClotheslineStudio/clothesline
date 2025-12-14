<!-- packages/ui/src/components/layout/shells/AppShell/AppShell.svelte -->
<script lang="ts">
  export let className = '';

  /* Layout tuning */
  export let sidebarWidth = '280px';
  export let stickyHeader = true;
  export let stickyFooter = false;

  /* Responsive sidebar (off-canvas under breakpoint) */
  export let collapsible = true;
  export let collapsed = true; // closed on mobile by default

  /**
   * IMPORTANT:
   * CSS cannot use var(--collapse-bp) inside @media().
   * We keep this prop for future JS-driven/utility approaches,
   * but the CSS uses a container-query cutoff.
   */
  export let collapseBreakpoint = '1024px';

  /* Page rhythm */
  export let contentMaxWidth: string | null = '1200px';
  export let pageGutterX = 'var(--spacing-4)';
  export let contentPaddingY = 'var(--spacing-6)';

  /* Overlay for off-canvas sidebar on small screens */
  export let showOverlay = true;
</script>

<div
  class={`appshell ${className}`}
  style={`
    --sidebar-width: ${sidebarWidth};
    --page-gutter-x: ${pageGutterX};
    --content-py: ${contentPaddingY};
    ${contentMaxWidth ? `--content-max: ${contentMaxWidth};` : ''}
    --collapse-bp: ${collapseBreakpoint};
  `}
  data-collapsible={collapsible ? 'true' : 'false'}
  data-collapsed={collapsed ? 'true' : 'false'}
  data-sticky-header={stickyHeader ? 'true' : 'false'}
  data-sticky-footer={stickyFooter ? 'true' : 'false'}
>
  <header class="appshell__header">
    <slot name="header" />
  </header>

  <div class="appshell__body">
    <aside class="appshell__sidebar">
      <slot name="sidebar" />
    </aside>

    <main class="appshell__content" aria-label="Main content">
      <div class="appshell__content-inner">
        <slot name="content" />
      </div>
    </main>
  </div>

  <footer class="appshell__footer">
    <slot name="footer" />
  </footer>

  {#if showOverlay}
    <div class="appshell__overlay" aria-hidden="true"></div>
  {/if}
</div>

<style>
  /* ===== Root shell uses semantic background + on-surface */
  .appshell {
    background: var(--background-body);
    color: var(--on-surface);
    min-height: 100dvh;
    display: flex;
    flex-direction: column;

    /* Enables container queries for responsive off-canvas behavior */
    container-type: inline-size;
    container-name: appshell;
  }

  /* ===== Header: allow AppBar to own surface/gutters */
  .appshell__header {
    flex-shrink: 0;
    background: transparent;
    border: 0;
    padding: 0;
    display: contents;
  }

  /* If the consumer disables sticky header, AppBar should handle it (no wrapper positioning). */
  /* We avoid position: sticky here because AppBar already has sticky support. */

  /* ===== Body */
  .appshell__body {
    display: flex;
    flex: 1;
    min-height: 0; /* enables children to scroll */
  }

  .appshell__sidebar {
    width: var(--sidebar-width);
    flex-shrink: 0;
    background: var(--background-panel);
    color: inherit;
    border-right: var(--border-1) solid var(--border-color-default);
    overflow: auto;

    /* Align sidebar content with the overall gutter system */
    padding: var(--spacing-4) var(--page-gutter-x);
  }

  .appshell__content {
    flex: 1;
    min-width: 0;
    overflow: auto;
    background: var(--background-app);
    color: inherit;
  }

  .appshell__content-inner {
    margin-inline: auto;
    max-width: var(--content-max, none);
    padding: var(--content-py) var(--page-gutter-x);
  }

  /* ===== Footer */
  .appshell__footer {
    flex-shrink: 0;
    background: var(--background-panel);
    color: inherit;
    border-top: var(--border-1) solid var(--border-color-default);

    padding: var(--spacing-4);
    padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left));
    padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right));

    text-align: center;
    font-size: 0.875rem;
  }

  [data-sticky-footer="true"] .appshell__footer {
    position: sticky;
    bottom: 0;
    z-index: var(--z-sticky-header, 500);
  }

  /* ===== Overlay (default hidden; only shown when sidebar open under collapse) */
  .appshell__overlay { display: none; }

  /* =========================================================
     Responsive off-canvas sidebar
     Uses container query to avoid var() in @media() constraints.
     Cutoff: 1024px by default (matches your prop value).
     If you change collapseBreakpoint at runtime, CSS won't react—
     that’s by design; CSS cannot do dynamic media queries safely.
     ========================================================= */

  @container appshell (max-width: 1024px) {
    [data-collapsible="true"] .appshell__body { position: relative; }

    [data-collapsible="true"] .appshell__sidebar {
      position: absolute;
      inset: 0 auto 0 0;
      height: 100%;
      max-width: min(88cqw, var(--sidebar-width));
      transform: translateX(-100%);
      transition: transform var(--motion-duration-base, 250ms) var(--motion-ease, ease-in-out);
      box-shadow: var(--elevation-8, 0 10px 30px rgba(0,0,0,.25));
      z-index: var(--z-overlay, 5000);
    }

    [data-collapsible="true"][data-collapsed="false"] .appshell__sidebar {
      transform: translateX(0);
    }

    [data-collapsible="true"][data-collapsed="false"] .appshell__overlay {
      display: block;
      position: absolute;
      inset: 0;

      /* Pair scrim color with an opacity token */
      background: var(--background-scrim);
      opacity: var(--opacity-scrim-medium, 0.32);

      z-index: var(--z-overlay, 5000);
    }
  }

  /* Optional: reduced motion support via your scaling/motion tokens */
  @media (prefers-reduced-motion: reduce) {
    .appshell__sidebar { transition: none; }
  }
</style>


