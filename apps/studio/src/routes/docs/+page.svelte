<!-- src/routes/docs/+page.svelte -->
<script lang="ts">
  export let data: { docs: { slug: string; title: string }[] };
</script>

<section class="docs-index">
  <header class="docs-index__header">
    <h1 class="docs-index__title">Documentation</h1>
    <p class="docs-index__subtitle">
      Browse guides, references, and deep dives for Clothesline UI, themes, tokens, and tools.
    </p>
  </header>

  <ul class="docs-index__grid" aria-label="Documentation pages">
    {#each data.docs as doc}
      <li>
        <a class="doc-card" href={`/docs/${doc.slug}`}>
          <h2 class="doc-card__title">{doc.title}</h2>
          <p class="doc-card__meta">Read more →</p>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  /* This page lives inside the docs +layout container, so no width tokens here. */

  .docs-index {
    display: flex;
    flex-direction: column;

    /* old: gap-8 pt-4 pb-12 */
    gap: var(--spacing-8);
    padding-top: var(--spacing-4);
    padding-bottom: var(--spacing-12);
  }

  .docs-index__header {
    /* old: border-b pb-4 */
    padding-bottom: var(--spacing-4);
    border-bottom: var(--border-width-divider) solid
      color-mix(in oklab, var(--on-surface) 15%, transparent);
  }

  .docs-index__title {
    margin: 0;

    /* old: text-4xl font-bold tracking-tight */
    font-size: var(--type-scale-4xl);
    font-weight: var(--type-weight-bold);
    letter-spacing: var(--type-tracking-tight);

    /* keep intent: accent heading */
    color: var(--color-accent-600-vis);
  }

  .docs-index__subtitle {
    margin-top: var(--spacing-3);
    margin-bottom: 0;

    max-width: 42rem; /* readable measure; not a token in your system yet */
    font-size: var(--type-scale-sm);
    color: var(--text-muted, var(--on-surface-muted));
  }

  .docs-index__grid {
    list-style: none;
    padding: 0;
    margin: var(--spacing-4) 0 0 0;

    display: grid;

    /* old: gap-6 */
    gap: var(--spacing-6);

    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) {
    .docs-index__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .docs-index__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .doc-card {
    display: block;
    text-decoration: none;

    /* old: rounded-2xl px-4 py-3 */
    border-radius: var(--radius-container);
    padding: var(--spacing-4);

    /* old: border + bg + shadow + blur */
    border: var(--border-width-card) solid
      color-mix(in oklab, var(--on-surface) 15%, transparent);

    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50)) 85%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    box-shadow: var(--elevation-1);

    color: var(--base-font-color, var(--on-surface));

    transition:
      transform var(--motion-duration-fast) var(--motion-ease),
      box-shadow var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease);
  }

  .doc-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent-500-vis);
    box-shadow: var(--elevation-4);
  }

  .doc-card:focus-visible {
    outline: var(--focus-width) solid var(--color-accent-500-vis);
    outline-offset: var(--focus-offset);
    border-color: var(--color-accent-500-vis);
  }

  .doc-card__title {
    margin: 0;

    /* old: text-base font-semibold */
    font-size: var(--type-scale-md);
    font-weight: var(--type-weight-semibold);

    color: var(--on-surface-strong, var(--on-surface));
  }

  .doc-card__meta {
    margin-top: var(--spacing-1);
    margin-bottom: 0;

    /* old: text-xs */
    font-size: var(--type-scale-xs);
    color: var(--text-muted, var(--on-surface-muted));
  }
</style>


