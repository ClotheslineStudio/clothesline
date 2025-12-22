<!-- src/routes/docs/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  export let data: {
    docs: { slug: string; title: string }[];
  };
</script>

<div class="docs-shell">
  <div class="docs-container">
    <!-- Sidebar -->
    <aside class="docs-sidebar" aria-label="Docs navigation">
      <h2 class="docs-sidebar__title">Docs</h2>

      <ul class="docs-nav">
        {#each data.docs as doc}
          {@const isActive = $page.params.slug === doc.slug}
          <li>
            <a
              href={`/docs/${doc.slug}`}
              aria-current={isActive ? 'page' : undefined}
              class:docs-link={true}
              class:docs-link--active={isActive}
            >
              {doc.title}
            </a>
          </li>
        {/each}
      </ul>
    </aside>

    <!-- Main content -->
    <main class="docs-main">
      <div class="docs-content">
        <slot />
      </div>
    </main>
  </div>
</div>

<style>
  /* ============================================================
     STEP 2 (THIS IS WHERE IT GOES):
     Override the container width for the docs route *at the HTML level*.
     This actually affects all descendants and avoids inline token soup.
  ============================================================ */
  :global(html) {
    /* Make docs wider than the site default, without adding new tokens */
    --layout-container-max: var(--layout-container-2xl);
  }

  /* ============================================================
     Shell
  ============================================================ */
  .docs-shell {
    min-height: 100vh;

    /* Prefer your foundation theme vars if present; fall back to surface ramp */
    background: var(--body-background-color, var(--color-surface-50));
    color: var(--base-font-color, var(--on-surface));
  }

  /* ============================================================
     Container
  ============================================================ */
  .docs-container {
    width: 100%;
    max-width: var(--layout-container-max);
    margin-inline: auto;

    display: flex;

    /* Replaces: pt-6 pb-10 gap-0 (your old file) */
    padding-block: var(--spacing-6) var(--spacing-10);
    padding-inline: var(--spacing-6);

    /* Give the layout real breathing room on wide screens */
    gap: var(--spacing-8);
  }

  /* ============================================================
     Sidebar
  ============================================================ */
  .docs-sidebar {
    /* old: w-64 */
    width: 16rem;

    display: none; /* hidden until lg */
    flex-direction: column;
    gap: var(--spacing-4);

    position: sticky;

    /* old: top-24 with h calc. Keep concept; tie offset to spacing */
    top: var(--spacing-24);
    max-height: calc(100vh - var(--spacing-24));
    overflow-y: auto;

    padding: var(--spacing-6);

    /* Use foundation border widths + elevation */
    border-right: var(--border-width-divider) solid
      color-mix(in oklab, var(--on-surface) 15%, transparent);

    border-top-left-radius: var(--radius-container);
    border-bottom-left-radius: var(--radius-container);

    background: var(--background-panel, var(--color-surface-50));
    box-shadow: var(--elevation-hairline);
  }

  .docs-sidebar__title {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted, var(--on-surface-muted));
    margin: 0;
  }

  .docs-nav {
    list-style: none;
    padding: 0;
    margin: var(--spacing-2) 0 0 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  .docs-link {
    display: flex;
    align-items: center;

    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-interactive);

    font-size: 0.875rem;
    font-weight: 500;

    color: var(--text-muted, var(--on-surface-muted));
    text-decoration: none;

    transition:
      background-color var(--motion-duration-fast) var(--motion-ease),
      color var(--motion-duration-fast) var(--motion-ease);
  }

  .docs-link:hover {
    background: var(--color-surface-100);
    color: var(--on-surface);
  }

  .docs-link--active {
    /* Keep your “active” intent but avoid random one-offs */
    background: var(--color-primary-100-vis);
    color: var(--color-primary-900-vis);
    box-shadow: var(--elevation-1);
  }

  /* ============================================================
     Main
  ============================================================ */
  .docs-main {
    flex: 1;
    min-width: 0; /* prevents overflow with long code blocks */
  }

  .docs-content {
    width: 100%;
  }

  /* ============================================================
     Responsive
  ============================================================ */
  @media (min-width: 1024px) {
    .docs-sidebar {
      display: flex;
    }

    /* On desktop, reduce left padding reliance; sidebar already provides structure */
    .docs-container {
      padding-inline: var(--spacing-8);
    }
  }
</style>



