<script lang="ts">
  export let className = '';
</script>

<div class={`cl-main-layout ${className}`}>
  <header class="cl-main-header">
    <slot name="header" />
  </header>

  <div class="cl-main-body">
    <aside class="cl-main-sidebar">
      <slot name="sidebar" />
    </aside>

    <main class="cl-main-content">
      <slot name="content" />
    </main>
  </div>

  <footer class="cl-main-footer">
    <slot name="footer" />
  </footer>
</div>

<style>
  .cl-main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .cl-main-header {
    flex-shrink: 0;
  }

  .cl-main-body {
    display: flex;
    flex: 1;
    min-height: 0; /* required for nested scroll */
  }

  .cl-main-sidebar {
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid var(--border-default-color, #ccc);
    background: var(--background-panel, #f9f9f9);
    overflow-y: auto;
  }

  .cl-main-content {
    flex: 1;
    padding: var(--spacing-6, 1.5rem);
    overflow-y: auto;
    background: var(--background-panel, #fff);
  }

  .cl-main-footer {
    flex-shrink: 0;
    padding: var(--spacing-4, 1rem);
    border-top: 0px solid var(--border-default-color, #ccc);
    background: var(--background-panel, #f9f9f9);
    text-align: center;
    font-size: 0.875rem;
    color: var(--muted-font-color, #666);
  }
</style>
