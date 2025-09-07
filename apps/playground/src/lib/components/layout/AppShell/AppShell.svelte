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

  export let breakpoint: string = '1024px';
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
  <header class="cl-header" role="banner">
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
      <main id="cl-main" role="main" aria-label={ariaMainLabel} class="cl-main" data-padded={contentPadded}>
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
  <footer class="cl-footer" role="contentinfo">
    <slot name="footer" />
  </footer>

  <!-- Overlay for mobile drawer -->
  <div class="cl-overlay" on:click={closeDrawer} aria-hidden={!drawerOpen} hidden={!drawerOpen}>
    <slot name="overlay" />
  </div>
</div>

<style>
  .cl-skip {
    position: absolute;
    left: -999px;
    top: -999px;
  }
  .cl-skip:focus {
    left: 8px;
    top: 8px;
    z-index: var(--app-shell-z-overlay, 1000);
    background: var(--app-shell-panel-bg, white);
    border: 1px solid var(--app-shell-border, rgba(0,0,0,0.1));
    padding: 0.5rem 0.75rem;
    border-radius: var(--app-shell-radius, 0.5rem);
    box-shadow: var(--app-shell-shadow, 0 2px 6px rgba(0,0,0,0.08));
  }

  .cl-appshell {
    --gap: var(--app-shell-gap, 0);
    background: var(--app-shell-bg, var(--color-surface-50, transparent));
    min-height: 100dvh;
    display: grid;
    grid-template-rows: var(--header-height) var(--topbar-height) 1fr var(--footer-height);
  }

  .cl-header {
    position: sticky;
    top: 0;
    z-index: var(--app-shell-z-header, 100);
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-bottom: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
    backdrop-filter: none;
  }
  .cl-appshell[data-glass-header="true"] .cl-header {
    background: color-mix(in oklab, var(--app-shell-panel-bg, #fff) 70%, transparent);
    backdrop-filter: saturate(1.2) blur(8px);
  }
  .cl-appshell[data-fixed-header="false"] .cl-header { position: relative; }

  .cl-topbar {
    min-height: var(--topbar-height);
    display: grid;
    align-items: center;
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-bottom: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
  }

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
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-right: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
  }
  .cl-appshell[data-glass-sidebar="true"] .cl-sidebar {
    background: color-mix(in oklab, var(--app-shell-panel-bg, #fff) 70%, transparent);
    backdrop-filter: saturate(1.2) blur(8px);
  }

  /* Collapsed width */
  .cl-appshell[data-collapsed="true"] {
    --sidebar-col: var(--sidebar-collapsed-width);
  }
  .cl-appshell[data-collapsed="false"] {
    --sidebar-col: var(--sidebar-width);
  }

  /* Rightbar */
  .cl-rightbar {
    width: var(--rightbar-width);
    position: sticky;
    top: calc(var(--header-height) + var(--topbar-height));
    align-self: start;
    height: calc(100dvh - var(--header-height) - var(--topbar-height) - var(--footer-height));
    overflow: auto;
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-left: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
  }
  /* Toggle rightbar column */
  .cl-appshell :global(.cl-rightbar) { }
  .cl-appshell:not(:has(.cl-rightbar)) { --rightbar-col: 0; }
  .cl-appshell:has(.cl-rightbar) { --rightbar-col: var(--rightbar-width); }

  /* Content */
  .cl-content-wrapper {
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr;
    max-width: var(--container-width);
    margin-inline: auto;
    padding-inline: calc(var(--app-shell-gutter, 1rem) * 1);
  }
  .cl-content-wrapper[data-container-padded="false"] {
    padding-inline: 0;
  }

  .cl-toolbar {
    position: sticky;
    top: calc(var(--header-height) + var(--topbar-height));
    z-index: 1;
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-bottom: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
  }

  .cl-main {
    min-height: 0;
    padding: 1rem;
  }
  .cl-main[data-padded="false"] { padding: 0; }

  .cl-footer {
    background: var(--app-shell-panel-bg, var(--color-surface-0, #fff));
    border-top: 1px solid var(--app-shell-border, rgba(0,0,0,0.08));
    position: sticky;
    bottom: 0;
  }
  .cl-appshell[data-fixed-footer="false"] .cl-footer { position: relative; }

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
      transition: transform 200ms ease;
      z-index: var(--app-shell-z-overlay, 1000);
    }
    .cl-appshell[data-drawer-open="true"] .cl-sidebar {
      transform: translateX(0);
    }
    .cl-overlay {
      position: fixed;
      inset: 0;
      background: color-mix(in oklab, black 40%, transparent);
      z-index: var(--app-shell-z-overlay, 999);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-sidebar { transition: none; }
  }
</style>
