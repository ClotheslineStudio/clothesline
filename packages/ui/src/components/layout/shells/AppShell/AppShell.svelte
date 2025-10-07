<!-- packages/ui/src/components/layout/shells/AppShell/AppShell.svelte -->
<script lang="ts">
  export let className = '';

  /* Layout tuning */
  export let sidebarWidth = '280px';
  export let stickyHeader = true;
  export let stickyFooter = false;

  /* Responsive sidebar (off-canvas under breakpoint) */
  export let collapsible = true;
  export let collapsed = true;                      // closed on mobile by default
  export let collapseBreakpoint = '1024px';

  /* Page rhythm (shared gutter for AppBar, content, footer) */
  export let contentMaxWidth: string | null = '1200px';
  export let pageGutterX = 'var(--spacing-4, 1rem)';
  export let contentPaddingY = 'var(--spacing-6, 1.5rem)';

  /* Overlay for off-canvas sidebar on small screens */
  export let showOverlay = true;
</script>

<div
  class={`appshell ${className}`}
  style={`
    --sidebar-width:${sidebarWidth};
    --collapse-bp:${collapseBreakpoint};
    --page-gutter-x:${pageGutterX};
    --content-py:${contentPaddingY};
    ${contentMaxWidth ? `--content-max:${contentMaxWidth};` : ''}
  `}
  data-collapsible={collapsible ? 'true' : 'false'}
  data-collapsed={collapsed ? 'true' : 'false'}
  data-sticky-header={stickyHeader ? 'true' : 'false'}
  data-sticky-footer={stickyFooter ? 'true' : 'false'}
>
  <!-- Header wrapper is "no-box" so AppBar can own the surface & gutters -->
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
  /* ===== Page palette (tokens flip automatically with your reversed ramps) */
  .appshell {
    background: var(--color-surface-50);
    color: var(--on-surface);              /* one source of truth for text */
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  /* ===== Header: let AppBar fill edge-to-edge and own the surface */
  .appshell__header {
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 20;
    background: transparent;
    border: 0;
    padding: 0;
    display: contents;                     /* ← wrapper disappears, no side gaps */
  }
  [data-sticky-header="false"] .appshell__header { position: static; }

  /* ===== Body (sidebar + content) */
  .appshell__body {
    display: flex;
    flex: 1;
    min-height: 0;                         /* enables children to scroll */
  }

  .appshell__sidebar {
    width: var(--sidebar-width);
    flex-shrink: 0;
    background: var(--color-surface-100);
    color: inherit;                        /* inherits --on-surface */
    border-right: 1px solid var(--color-surface-300);
    overflow: auto;
    padding: var(--spacing-4, 1rem) var(--page-gutter-x);
  }

  .appshell__content {
    flex: 1;
    min-width: 0;
    overflow: auto;
    background: var(--color-surface-50);
    color: inherit;
  }
  .appshell__content-inner {
    margin-inline: auto;
    max-width: var(--content-max, none);
    padding: var(--content-py) var(--page-gutter-x);
  }

  /* ===== Footer (owns its surface; text inherits) */
  .appshell__footer {
    flex-shrink: 0;
    background: var(--color-surface-100);
    color: inherit;
    border-top: 1px solid var(--color-surface-300);
    padding: var(--spacing-4, 1rem);
    padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left));
    padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right));
    text-align: center;
    font-size: 0.875rem;
  }
  [data-sticky-footer="true"] .appshell__footer {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  /* ===== Responsive off-canvas sidebar ===== */
  @media (max-width: var(--collapse-bp)) {
    [data-collapsible="true"] .appshell__body { position: relative; }

    [data-collapsible="true"] .appshell__sidebar {
      position: absolute;
      inset: 0 auto 0 0;
      height: 100%;
      max-width: min(88vw, var(--sidebar-width));
      transform: translateX(-100%);
      transition: transform .2s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      z-index: 30;
    }
    [data-collapsible="true"][data-collapsed="false"] .appshell__sidebar {
      transform: translateX(0);
    }

    /* Dim overlay when sidebar is open */
    [data-collapsible="true"] .appshell__overlay { display: none; }
    [data-collapsible="true"][data-collapsed="false"] .appshell__overlay {
      display: block;
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,.35);
      z-index: 25;
    }
  }
</style>

