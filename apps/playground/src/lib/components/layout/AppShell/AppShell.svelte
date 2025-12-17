<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let sidebarCollapsed: boolean = false;
  export let drawerOpen: boolean = false;

  export let sidebarWidth: string = '280px';
  export let sidebarCollapsedWidth: string = '72px';
  export let rightbarWidth: string = '320px';
  export let showRightbar: boolean = false;

  export let fixedHeader: boolean = true;
  export let fixedSidebar: boolean = true;
  export let fixedFooter: boolean = false;

  export let headerHeight: string = '56px';
  export let topbarHeight: string = '40px';
  export let footerHeight: string = '56px';

  export const breakpoint: string = '1024px';
  export let containerWidth: string = '1200px';
  export let containerPadded: boolean = true;
  export let contentPadded: boolean = true;

  export let glassHeader: boolean = false;
  export let glassSidebar: boolean = false;

  export let ariaMainLabel: string = 'Main';
  export let ariaNavLabel: string = 'Primary';

  const dispatch = createEventDispatcher();

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    dispatch('toggleSidebar', { collapsed: sidebarCollapsed });
  }
  function openDrawer() {
    drawerOpen = true;
    dispatch('openDrawer');
  }
  function closeDrawer() {
    drawerOpen = false;
    dispatch('closeDrawer');
  }

  // simple ESC handler for drawer
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && drawerOpen) closeDrawer();
  }

  onMount(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });
</script>

<a class="cl-skip" href="#cl-main">Skip to content</a>

<div
  class="cl-appshell"
  data-fixed-header={fixedHeader}
  data-fixed-sidebar={fixedSidebar}
  data-fixed-footer={fixedFooter}
  data-collapsed={sidebarCollapsed}
  data-drawer-open={drawerOpen}
  data-glass-header={glassHeader}
  data-glass-sidebar={glassSidebar}
  style={`
    --sidebar-width:${sidebarWidth};
    --sidebar-collapsed-width:${sidebarCollapsedWidth};
    --rightbar-width:${rightbarWidth};
    --header-height:${headerHeight};
    --topbar-height:${topbarHeight};
    --footer-height:${footerHeight};
    --container-width:${containerWidth};
  `}
>
  <!-- Header -->
  <header class="cl-header">
    <slot name="header" />
  </header>

  <!-- Topbar -->
  <div class="cl-topbar" aria-label="Topbar">
    <slot name="topbar" />
  </div>

  <!-- Layout grid -->
  <div class="cl-body">
    <!-- Left Sidebar / Drawer -->
    <aside class="cl-sidebar" role="navigation" aria-label={ariaNavLabel}>
      <slot name="sidebar" />
    </aside>

    <!-- Main container (optional containerized) -->
    <div class="cl-content-wrapper" data-container={true} data-container-padded={containerPadded}>
      <div class="cl-toolbar">
        <slot name="toolbar" />
      </div>
      <main id="cl-main" aria-label={ariaMainLabel} class="cl-main" data-padded={contentPadded}>
        <slot />
      </main>
    </div>

    <!-- Rightbar -->
    {#if showRightbar}
      <aside class="cl-rightbar" aria-label="Right Sidebar">
        <slot name="rightbar" />
      </aside>
    {/if}
  </div>

  <!-- Footer -->
  <footer class="cl-footer">
    <slot name="footer" />
  </footer>

  <!-- Overlay for mobile drawer -->
  <div class="cl-overlay" on:click={closeDrawer} aria-hidden={!drawerOpen} hidden={!drawerOpen}>
    <slot name="overlay" />
  </div>
</div>

<style>
  /* Skip link */
  .cl-skip {
    position: absolute;
    left: -999px;
    top: -999px;
  }

  .cl-skip:focus {
    left: var(--spacing-2);
    top: var(--spacing-2);
    z-index: var(--z-overlay);

    background: var(--background-panel, var(--color-surface-50));
    border: var(--border-width-default) solid
      color-mix(
        in oklab,
        var(--color-surface-950) calc(var(--opacity-border) * 100%),
        transparent
      );

    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-interactive);
    box-shadow: var(--elevation-3);
  }

  /* App shell surface */
  .cl-appshell {
    /* Layout-only knob (ok to keep local) */
    --gap: var(--spacing-0);

    background: var(--body-background-color, var(--color-surface-50));
    min-height: 100dvh;

    display: grid;
    grid-template-rows: var(--header-height) var(--topbar-height) 1fr var(--footer-height);
  }

  /* Shared “panel” styling concept */
  .cl-header,
  .cl-topbar,
  .cl-sidebar,
  .cl-rightbar,
  .cl-toolbar,
  .cl-footer {
    background: var(--background-panel, var(--color-surface-50));
  }

  /* Header */
  .cl-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky-header);

    border-bottom: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--color-surface-950) calc(var(--opacity-divider) * 100%),
        transparent
      );

    backdrop-filter: none;
  }

  .cl-appshell[data-glass-header="true"] .cl-header {
    /* Glass = surface + overlay opacity + blur */
    background: color-mix(
      in oklab,
      var(--background-panel, var(--color-surface-50))
        calc((1 - var(--opacity-surface-overlay)) * 100%),
      transparent
    );
    backdrop-filter: saturate(1.2) blur(8px);
  }

  .cl-appshell[data-fixed-header="false"] .cl-header {
    position: relative;
  }

  /* Topbar */
  .cl-topbar {
    min-height: var(--topbar-height);
    display: grid;
    align-items: center;

    border-bottom: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--border-color-default) calc(var(--opacity-divider) * 100%),
        transparent
      );
  }

  /* Body grid */
  .cl-body {
    display: grid;
    grid-template-columns:
      var(--sidebar-col, var(--sidebar-width))
      1fr
      var(--rightbar-col, 0);
    gap: var(--gap);
    min-height: 0; /* prevent overflow fight */
  }

  /* Sidebar */
  .cl-sidebar {
    position: sticky;
    top: calc(var(--header-height) + var(--topbar-height));
    align-self: start;
    height: calc(100dvh - var(--header-height) - var(--topbar-height) - var(--footer-height));
    overflow: auto;

    border-right: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--border-color-default) calc(var(--opacity-divider) * 100%),
        transparent
      );
  }

  .cl-appshell[data-glass-sidebar="true"] .cl-sidebar {
    background: color-mix(
      in oklab,
      var(--background-panel, var(--color-surface-50))
        calc((1 - var(--opacity-surface-overlay)) * 100%),
      transparent
    );
    backdrop-filter: saturate(1.2) blur(8px);
  }

  /* Collapsed width */
  .cl-appshell[data-collapsed="true"] { --sidebar-col: var(--sidebar-collapsed-width); }
  .cl-appshell[data-collapsed="false"] { --sidebar-col: var(--sidebar-width); }

  /* Rightbar */
  .cl-rightbar {
    width: var(--rightbar-width);
    position: sticky;
    top: calc(var(--header-height) + var(--topbar-height));
    align-self: start;
    height: calc(100dvh - var(--header-height) - var(--topbar-height) - var(--footer-height));
    overflow: auto;

    border-left: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--border-color-default) calc(var(--opacity-divider) * 100%),
        transparent
      );
  }

  /* Toggle rightbar column */
  .cl-appshell:not(:has(.cl-rightbar)) { --rightbar-col: 0; }
  .cl-appshell:has(.cl-rightbar) { --rightbar-col: var(--rightbar-width); }

  /* Content wrapper */
  .cl-content-wrapper {
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr;

    max-width: var(--container-width);
    margin-inline: auto;
    padding-inline: var(--spacing-md);
  }

  .cl-content-wrapper[data-container-padded="false"] {
    padding-inline: 0;
  }

  /* Toolbar */
  .cl-toolbar {
    position: sticky;
    top: calc(var(--header-height) + var(--topbar-height));
    z-index: var(--z-floating);

    border-bottom: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--color-surface-950) calc(var(--opacity-divider) * 100%),
        transparent
      );
  }

  /* Main content */
  .cl-main {
    min-height: 0;
    padding: var(--spacing-md);
  }
  .cl-main[data-padded="false"] {
    padding: 0;
  }

  /* Footer */
  .cl-footer {
    border-top: var(--border-width-divider) solid
      color-mix(
        in oklab,
        var(--color-surface-950) calc(var(--opacity-divider) * 100%),
        transparent
      );

    position: sticky;
    bottom: 0;
    z-index: var(--z-sticky-header);
  }

  .cl-appshell[data-fixed-footer="false"] .cl-footer {
    position: relative;
  }

  /* Drawer (mobile) */
  @media (max-width: 1024px) {
    .cl-body {
      grid-template-columns: 1fr;
    }

    .cl-sidebar {
      position: fixed;
      top: var(--header-height);
      left: 0;
      height: calc(100dvh - var(--header-height));
      width: var(--sidebar-width);

      transform: translateX(-100%);
      transition: transform var(--motion-duration-base) var(--motion-ease);
      z-index: var(--z-overlay);

      box-shadow: var(--elevation-6);
    }

    .cl-appshell[data-drawer-open="true"] .cl-sidebar {
      transform: translateX(0);
    }

    .cl-overlay {
      position: fixed;
      inset: 0;
      z-index: calc(var(--z-overlay) - 1);

      background: color-mix(
        in oklab,
        var(--color-surface-950) calc(var(--opacity-backdrop) * 100%),
        transparent
      );
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-sidebar {
      transition: none;
    }
  }
</style>
