<script lang="ts">
  export let data: {
    content: any;
    metadata: { title: string; date: string };
  };

  const { content, metadata } = data;
</script>

<svelte:head>
  <title>{metadata.title} · Clothesline Studio Blog</title>
</svelte:head>

<main
  class="py-(--spacing-section)"
  style="
    max-width: var(--layout-container-max);
    margin-inline: auto;
    padding-inline: var(--spacing-6);
  "
>
  <article
    style="
      max-width: var(--layout-container-lg);
      margin-inline: auto;
    "
  >
    <header style="margin-bottom: var(--spacing-8);">
      <p
        style="
          margin: 0;
          font-size: var(--type-scale-xs);
          font-weight: var(--type-weight-medium);
          letter-spacing: var(--type-tracking-wide);
          text-transform: uppercase;
          color: var(--color-primary-600-vis);
        "
      >
        Blog
      </p>

      <h1
        style="
          margin: var(--spacing-2) 0 0 0;
          font-size: var(--type-scale-4xl);
          font-weight: var(--type-weight-black);
          letter-spacing: var(--type-tracking-tight);
          color: var(--on-surface-strong);
        "
      >
        {metadata.title}
      </h1>

      <p
        style="
          margin: var(--spacing-2) 0 0 0;
          font-size: var(--type-scale-sm);
          color: var(--on-surface-muted);
        "
      >
        {metadata.date}
      </p>
    </header>

    <!-- Main article body -->
    <div class="cl-prose">
      <svelte:component this={content} />
    </div>
  </article>
</main>

<style>
  /*
    Keep this minimal and token-driven:
    - Layout: layout-container-*
    - Rhythm: spacing-*
    - Type: type-*
    - Color: semantic on-surface + role ramps
  */

  /* You can still keep Tailwind Typography if you want; this is a token-based "prose" baseline. */
  .cl-prose {
    color: color-mix(in oklab, var(--on-surface) 82%, transparent);
    line-height: var(--type-leading-relaxed);
    font-size: var(--type-scale-md);
  }

  .cl-prose :global(h1),
  .cl-prose :global(h2),
  .cl-prose :global(h3) {
    color: var(--on-surface-strong);
    letter-spacing: var(--type-tracking-tight);
    line-height: var(--type-leading-tight);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-3);
    font-weight: var(--type-weight-bold);
  }

  .cl-prose :global(h2) {
    font-size: var(--type-scale-2xl);
  }

  .cl-prose :global(h3) {
    font-size: var(--type-scale-xl);
  }

  .cl-prose :global(p),
  .cl-prose :global(ul),
  .cl-prose :global(ol) {
    margin-top: 0;
    margin-bottom: var(--spacing-5);
  }

  .cl-prose :global(strong),
  .cl-prose :global(b),
  .cl-prose :global(em) {
    color: var(--on-surface-strong);
  }

  .cl-prose :global(a) {
    color: var(--color-accent-600-vis);
    text-decoration: var(--anchor-decoration);
    text-decoration-color: color-mix(in oklab, var(--color-accent-600-vis) 55%, transparent);
    text-underline-offset: 0.2em;
    transition: color var(--motion-duration-fast) var(--motion-ease);
  }

  .cl-prose :global(a:hover) {
    color: var(--color-accent-700-vis);
    text-decoration: var(--anchor-decoration-hover);
  }

  .cl-prose :global(blockquote) {
    margin: var(--spacing-6) 0;
    padding-left: var(--spacing-5);
    border-left: var(--border-width-divider) solid var(--color-accent-600-vis);
    color: color-mix(in oklab, var(--on-surface) 72%, transparent);
  }

  .cl-prose :global(code) {
    font-family: var(--type-family-mono);
    font-size: var(--type-scale-sm);
    color: var(--on-surface-strong);
  }

  .cl-prose :global(pre) {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-6);
    border-radius: var(--radius-container);
    background: color-mix(in oklab, var(--color-surface-900) 92%, transparent);
    color: var(--color-surface-50);
    overflow: auto;
    box-shadow: var(--elevation-2);
    border: var(--border-width-card) solid color-mix(in oklab, var(--color-surface-900) 70%, transparent);
  }

  .cl-prose :global(li) {
    margin-bottom: var(--spacing-2);
  }

  /* Responsive padding only (container widths are already tokenized) */
  @media (max-width: 640px) {
    main {
      padding-inline: var(--spacing-5);
    }

    .cl-prose {
      font-size: var(--type-scale-sm);
    }
  }
</style>



  