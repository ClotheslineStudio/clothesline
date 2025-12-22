<script lang="ts">
  export let data: {
    posts: {
      slug: string;
      metadata: { title: string; date: string; description: string };
    }[];
  };
</script>

<section
  class="py-(--spacing-section)"
  style="
    max-width: var(--layout-container-max);
    margin-inline: auto;
    padding-inline: var(--spacing-6);
  "
>
  <header style="margin-bottom: var(--spacing-8);">
    <h1
      style="
        font-size: var(--type-scale-4xl);
        font-weight: var(--type-weight-black);
        letter-spacing: var(--type-tracking-tight);
        color: var(--color-accent-600-vis);
        margin: 0;
      "
    >
      Blog
    </h1>

    <p
      style="
        margin-top: var(--spacing-3);
        font-size: var(--type-scale-md);
        color: var(--on-surface-muted);
        max-width: var(--layout-container-md);
      "
    >
      Longer notes on the ideas and processes behind our work.
    </p>
  </header>

  <ul style="display: flex; flex-direction: column; gap: var(--spacing-6);">
    {#each data.posts as post}
      <li>
        <a
          href={`/blog/${post.slug}`}
          class="blog-card"
        >
          <div class="blog-card__row">
            <h2 class="blog-card__title">{post.metadata.title}</h2>
            <p class="blog-card__date">{post.metadata.date}</p>
          </div>

          <p class="blog-card__desc">{post.metadata.description}</p>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  /* Card uses your semantic foundation tokens (spacing, radius, borders, focus, elevation, motion). */
  .blog-card {
    display: block;
    border-radius: var(--radius-container);
    border: var(--border-width-card) solid color-mix(in oklab, var(--on-surface) 16%, transparent);
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50)) 88%, transparent);
    box-shadow: var(--elevation-1);
    padding: var(--spacing-6);
    text-decoration: none;
    color: inherit;

    transition:
      transform var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease),
      box-shadow var(--motion-duration-fast) var(--motion-ease);
  }

  .blog-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in oklab, var(--color-accent-600-vis) 55%, transparent);
    box-shadow: var(--elevation-3);
  }

  .blog-card:focus-visible {
    outline: var(--focus-width) solid var(--color-accent-500-vis);
    outline-offset: var(--focus-offset);
  }

  .blog-card__row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--spacing-4);
  }

  .blog-card__title {
    margin: 0;
    font-size: var(--type-scale-xl);
    font-weight: var(--type-weight-semibold);
    letter-spacing: var(--type-tracking-tight);
    color: var(--on-surface-strong);
    transition: color var(--motion-duration-fast) var(--motion-ease);
  }

  .blog-card:hover .blog-card__title {
    color: var(--color-accent-600-vis);
  }

  .blog-card__date {
    margin: 0;
    font-size: var(--type-scale-xs);
    color: var(--on-surface-muted);
    white-space: nowrap;
  }

  .blog-card__desc {
    margin: var(--spacing-3) 0 0 0;
    font-size: var(--type-scale-sm);
    color: color-mix(in oklab, var(--on-surface) 78%, transparent);
    line-height: var(--type-leading-normal);
  }

  /* Small-screen tightening */
  @media (max-width: 640px) {
    section {
      padding-inline: var(--spacing-5);
    }
    .blog-card {
      padding: var(--spacing-5);
    }
    .blog-card__title {
      font-size: var(--type-scale-lg);
    }
  }
</style>



  