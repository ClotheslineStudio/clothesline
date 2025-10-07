<script lang="ts">
  // Props (all optional)
  export let className = '';

  // Layout tuning
  export let sidebarWidth: string = '280px';      // any CSS length
  export let stickyHeader: boolean = true;
  export let stickyFooter: boolean = false;

  // Responsive off-canvas behavior (sidebar collapses below breakpoint)
  export let collapsible: boolean = true;
  export let collapsed: boolean = false;          // control from parent for toggle buttons
  export let collapseBreakpoint: string = '1024px'; // e.g., 1024px = lg

  // Content max width (set '' to disable)
  export let contentMaxWidth: string = '1200px';
</script>

<div
  class={`layout ${className}`}
  style={`--sidebar-width:${sidebarWidth};--collapse-bp:${collapseBreakpoint};${contentMaxWidth ? `--content-max:${contentMaxWidth};` : ''}`}
  data-collapsible={collapsible ? 'true' : 'false'}
  data-collapsed={collapsed ? 'true' : 'false'}
  data-sticky-header={stickyHeader ? 'true' : 'false'}
  data-sticky-footer={stickyFooter ? 'true' : 'false'}
>
  <header class="layout__header">
    <slot name="header" />
  </header>

  <div class="layout__body">
    <aside class="layout__sidebar">
      <slot name="sidebar" />
    </aside>

    <main class="layout__content">
      <div class="layout__content-inner">
        <slot name="content" />
      </div>
    </main>
  </div>

  <footer class="layout__footer">
    <slot name="footer" />
  </footer>
</div>

<style>
  /* ====== Palette (light defaults) ====== */
  .layout {
    --app-bg: var(--color-surface-50, #fafafa);
    --app-fg: var(--base-font-color, #0f172a);

    --border: var(--color-surface-300, #d4d4d8);

    /* High-contrast header/footer/sidebar surfaces */
    --header-bg: var(--color-surface-100, #f4f4f5);
    --header-fg: var(--app-fg);
    --footer-bg: var(--color-surface-100, #f4f4f5);
    --footer-fg: var(--text-muted, #475569);
    --sidebar-bg: var(--color-surface-100, #f4f4f5);
    --sidebar-fg: var(--app-fg);

    background: var(--app-bg);
    color: var(--app-fg);
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  /* Dark mode overrides */
  :global(html[data-mode="dark"]) .layout {
    --app-bg: var(--color-surface-950, #0b0b0f);
    --app-fg: var(--base-font-color-dark, #e5e7eb);

    --border: var(--color-surface-700, #404040);

    --header-bg: var(--color-surface-900, #0f1115);
    --header-fg: var(--app-fg);
    --footer-bg: var(--color-surface-900, #0f1115);
    --footer-fg: var(--text-muted, #a1a1aa);
    --sidebar-bg: var(--color-surface-900, #0f1115);
    --sidebar-fg: var(--app-fg);
  }

  /* ====== Header ====== */
  .layout__header {
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 20;
    background:
      linear-gradient(to bottom, color-mix(in oklab, var(--header-bg) 92%, transparent), var(--header-bg));
    color: var(--header-fg);
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-3, .75rem) var(--spacing-4, 1rem);
  }
  /* Allow turning off stickiness */
  [data-sticky-header="false"] .layout__header { position: static; }

  /* ====== Body (sidebar + content) ====== */
  .layout__body {
    display: flex;
    flex: 1;
    min-height: 0; /* enables children to scroll */
  }

  .layout__sidebar {
    width: var(--sidebar-width);
    flex-shrink: 0;
    background: var(--sidebar-bg);
    color: var(--sidebar-fg);
    border-right: 1px solid var(--border);
    overflow: auto;
    padding: var(--spacing-4, 1rem);
  }

  .layout__content {
    flex: 1;
    min-width: 0;
    overflow: auto;
    background: var(--app-bg);
  }

  .layout__content-inner {
    padding: var(--spacing-6, 1.5rem);
    margin-inline: auto;
    max-width: var(--content-max, none);
  }

  /* ====== Footer ====== */
  .layout__footer {
    flex-shrink: 0;
    background: var(--footer-bg);
    color: var(--footer-fg);
    border-top: 1px solid var(--border);
    padding: var(--spacing-4, 1rem);
    text-align: center;
    font-size: 0.875rem;
  }
  [data-sticky-footer="true"] .layout__footer {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  /* ====== Responsive sidebar (collapsible) ====== */
  /* Below breakpoint, sidebar becomes off-canvas if collapsible=true */
  @media (max-width: var(--collapse-bp)) {
    [data-collapsible="true"] .layout__body {
      position: relative;
    }

    [data-collapsible="true"] .layout__sidebar {
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      height: 100%;
      max-width: min(88vw, var(--sidebar-width));
      transform: translateX(-100%);
      transition: transform .2s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      z-index: 30;
    }

    [data-collapsible="true"][data-collapsed="false"] .layout__sidebar {
      transform: translateX(0);
    }

    /* When sidebar is off-canvas, content spans full width */
    [data-collapsible="true"] .layout__content {
      width: 100%;
    }
  }

  /* ====== Safe-area padding (iOS notches etc.) ====== */
  .layout__header,
  .layout__footer {
    padding-left: calc(var(--spacing-4, 1rem) + env(safe-area-inset-left));
    padding-right: calc(var(--spacing-4, 1rem) + env(safe-area-inset-right));
  }
</style>

