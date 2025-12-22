<!-- src/routes/docs/[slug]/+page.svelte (or wherever this page lives) -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';

  export let data: {
    content: ComponentType;
    metadata: { title?: string };
  };

  let toc: { id: string; text: string; level: number }[] = [];

  onMount(() => {
    const headings = Array.from(document.querySelectorAll('article h2, article h3')) as HTMLHeadingElement[];

    toc = headings.map((heading) => ({
      id: heading.id || heading.innerText.toLowerCase().replace(/\s+/g, '-'),
      text: heading.innerText,
      level: heading.tagName === 'H2' ? 2 : 3
    }));

    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = toc[index].id;
    });
  });
</script>

<!-- NOTE: this page should inherit container width/padding from routes/docs/+layout.svelte.
     Do NOT set max-width/padding here unless it's for the article itself. -->
<div class="docs-shell">
  <div class="docs-grid">
    <!-- Main content column -->
    <main class="docs-main">
      <!-- Breadcrumb navigation -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a class="breadcrumbs__link" href="/">Home</a>
        <span class="breadcrumbs__sep" aria-hidden="true">/</span>
        <a class="breadcrumbs__link" href="/docs">Docs</a>
        <span class="breadcrumbs__sep" aria-hidden="true">/</span>
        <span class="breadcrumbs__current">
          {data.metadata.title ?? 'Untitled'}
        </span>
      </nav>

      <!-- Article -->
      <article class="doc-article">
        {#if data.content}
          <svelte:component this={data.content} />
        {:else}
          <p>Loading...</p>
        {/if}
      </article>
    </main>

    <!-- Table of Contents -->
    {#if toc.length > 1}
      <aside class="toc" aria-label="On this page">
        <h2 class="toc__title">On this page</h2>

        <nav class="toc__list">
          {#each toc as item}
            <a
              href={'#' + item.id}
              class={`toc__link ${item.level === 3 ? 'toc__link--h3' : ''}`}
            >
              {item.text}
            </a>
          {/each}
        </nav>
      </aside>
    {/if}
  </div>
</div>

<style>
  /* Page chrome */
  .docs-shell {
    min-height: 100vh;
    background: var(--body-background-color, var(--color-surface-50));
    color: var(--base-font-color, var(--on-surface));
  }

  /* Layout: main + optional TOC */
  .docs-grid {
    display: flex;
    gap: var(--spacing-10);
    padding-top: var(--spacing-10);
    padding-bottom: var(--spacing-10);
    align-items: flex-start;
  }

  /* Main column */
  .docs-main {
    flex: 1;
    min-width: 0;
  }

  /* Breadcrumbs */
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-6);

    font-size: var(--type-scale-sm);
    color: var(--text-muted, var(--on-surface-muted));
  }

  .breadcrumbs__link {
    color: inherit;
    text-decoration: none;
  }
  .breadcrumbs__link:hover {
    color: var(--color-accent-600-vis);
    text-decoration: var(--anchor-decoration, underline);
  }
  .breadcrumbs__sep {
    opacity: var(--opacity-60);
  }
  .breadcrumbs__current {
    font-weight: var(--type-weight-medium);
    color: var(--on-surface-strong, var(--on-surface));
  }

  /* Article card */
  .doc-article {
    border-radius: var(--radius-container);
    border: var(--border-width-card) solid
      color-mix(in oklab, var(--on-surface) 15%, transparent);
    background: var(--background-panel, var(--color-surface-50));
    box-shadow: var(--elevation-1);

    padding: var(--spacing-6);
  }

  /* “Prose” defaults without relying on Tailwind typography plugin */
  .doc-article :global(h1),
  .doc-article :global(h2),
  .doc-article :global(h3) {
    color: var(--color-accent-600-vis);
    letter-spacing: var(--type-tracking-tight);
  }

  .doc-article :global(h1) {
    font-size: var(--type-scale-4xl);
    margin: 0 0 var(--spacing-4) 0;
  }

  .doc-article :global(h2) {
    font-size: var(--type-scale-2xl);
    margin: var(--spacing-10) 0 var(--spacing-3) 0;
  }

  .doc-article :global(h3) {
    font-size: var(--type-scale-xl);
    margin: var(--spacing-8) 0 var(--spacing-2) 0;
  }

  .doc-article :global(p),
  .doc-article :global(li) {
    line-height: var(--type-leading-normal);
    font-size: var(--type-scale-md);
    color: var(--base-font-color, var(--on-surface));
  }

  .doc-article :global(a) {
    color: var(--color-accent-600-vis);
    text-decoration: var(--anchor-decoration, underline);
  }
  .doc-article :global(a:hover) {
    text-decoration: var(--anchor-decoration-hover, none);
  }

  .doc-article :global(code) {
    font-family: var(--type-family-mono);
    font-size: var(--type-scale-sm);
  }

  .doc-article :global(pre) {
    margin-top: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    padding: var(--spacing-4);
    border-radius: var(--radius-container);

    background: var(--color-surface-950-vis);
    color: var(--color-surface-50-vis);

    overflow: auto;
    box-shadow: var(--elevation-1);
  }

  /* TOC (desktop only) */
  .toc {
    position: sticky;
    top: 6rem; /* aligns with your header offset */
    width: 16rem;
    flex-shrink: 0;

    border-radius: var(--radius-container);
    border: var(--border-width-card) solid
      color-mix(in oklab, var(--on-surface) 15%, transparent);
    background: var(--background-panel, var(--color-surface-50));
    box-shadow: var(--elevation-1);

    padding: var(--spacing-4);

    display: none;
  }

  .toc__title {
    margin: 0 0 var(--spacing-3) 0;
    font-size: var(--type-scale-xs);
    font-weight: var(--type-weight-semibold);
    letter-spacing: var(--type-tracking-wide);
    text-transform: uppercase;

    color: var(--text-muted, var(--on-surface-muted));
  }

  .toc__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  .toc__link {
    display: block;
    padding: var(--spacing-2);
    border-radius: var(--radius-interactive);
    text-decoration: none;

    font-size: var(--type-scale-sm);
    color: var(--text-muted, var(--on-surface-muted));

    transition:
      background-color var(--motion-duration-fast) var(--motion-ease),
      color var(--motion-duration-fast) var(--motion-ease);
  }

  .toc__link:hover {
    background: color-mix(in oklab, var(--on-surface) 6%, transparent);
    color: var(--color-accent-600-vis);
  }

  .toc__link:focus-visible {
    outline: var(--focus-width) solid var(--color-accent-500-vis);
    outline-offset: var(--focus-offset);
  }

  .toc__link--h3 {
    padding-left: calc(var(--spacing-2) + var(--spacing-4));
    font-size: var(--type-scale-xs);
  }

  @media (min-width: 1024px) {
    .toc {
      display: block;
    }
  }

  /* Reduce padding slightly on small screens */
  @media (max-width: 640px) {
    .docs-grid {
      gap: var(--spacing-6);
      padding-top: var(--spacing-6);
      padding-bottom: var(--spacing-8);
    }
    .doc-article {
      padding: var(--spacing-4);
    }
  }
</style>
