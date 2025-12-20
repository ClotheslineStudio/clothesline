<script context="module" lang="ts">
  export type BlogPreviewPost = {
    slug: string;
    metadata: {
      title: string;
      date: string;
      description?: string;
    };
  };
</script>


<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { Button } from '@clothesline/ui';

  export let posts: BlogPreviewPost[] = [];
</script>


<section style="padding-block: var(--spacing-section, 2rem) var(--spacing-9, 2.5rem);">
  <header style="text-align: center; margin-bottom: var(--spacing-gap-large, 1.5rem);">
    <h2 style="
      font-size: var(--type-3xl-size, 1.875rem);
      font-weight: var(--heading-font-weight, 800);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      color: var(--color-accent-500, #a21caf);
      font-family: var(--heading-font-family, inherit);
      margin-bottom: var(--spacing-2, 0.5rem);
    ">
      Latest Insights
    </h2>
    <p style="
      margin-inline: auto;
      max-width: 40ch;
      font-size: var(--base-font-size, 1rem);
      color: var(--on-surface-subtle, #a1a1aa);
      font-family: var(--base-font-family, inherit);
    ">
      Notes on design, development, and digital craft.
    </p>
  </header>

  <div style="margin-top: var(--spacing-lg, 2rem); display: grid; gap: var(--spacing-gap-base, 1.5rem); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
    {#if posts.length === 0}
      <p style="grid-column: 1/-1; text-align: center; font-size: var(--base-font-size, 1rem); color: var(--on-surface-subtle, #a1a1aa);">
        Blog posts are coming soon.
      </p>
    {:else}
      {#each posts as post (post.slug)}
        <a
          href={`/blog/${post.slug}`}
          style="
            display: block;
            border-radius: var(--radius-container, 1.25rem);
            border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
            background: var(--background-elevation-2, var(--color-surface-900, #18181b));
            padding: var(--spacing-lg, 1.25rem);
            box-shadow: var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06));
            backdrop-filter: blur(4px);
            text-decoration: none;
            transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          "
          on:mouseover={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--elevation-3, 0 8px 24px rgba(0,0,0,0.12))'; e.currentTarget.style.borderColor = 'var(--color-primary-500, #6366f1)'; }}
          on:mouseout={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
          on:focus={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--elevation-3, 0 8px 24px rgba(0,0,0,0.12))'; e.currentTarget.style.borderColor = 'var(--color-primary-500, #6366f1)'; }}
          on:blur={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; e.currentTarget.style.borderColor = 'var(--color-primary-200, #e0e7ff)'; }}
        >
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: var(--spacing-gap-base, 1rem);">
            <div style="min-width: 0;">
              <h3 style="font-size: var(--type-lg-size, 1.125rem); font-weight: var(--base-font-weight, 600); color: var(--on-surface, #18181b); transition: color 0.2s;">
                {post.metadata.title}
              </h3>
              <p style="margin-top: var(--spacing-1, 0.125rem); font-size: var(--type-xs-size, 0.75rem); color: var(--on-surface-muted, #52525b);">
                {post.metadata.date}
              </p>
            </div>

            <ArrowRight style="height: 1.25rem; width: 1.25rem; color: var(--color-primary-500, #6366f1); transition: transform 0.2s, color 0.2s;" />
          </div>

          <p style="margin-top: var(--spacing-4, 1rem); font-size: var(--base-font-size, 1rem); color: var(--on-surface-subtle, #a1a1aa); line-height: var(--base-line-height, 1.6);">
            {post.metadata.description}
          </p>
        </a>
      {/each}
    {/if}
  </div>

  <div style="margin-top: var(--spacing-lg, 2rem); display: flex; justify-content: center;">
    <Button href="/blog" variant="outline" color="primary" size="lg" ariaLabel="View all posts">
      <span>View all posts</span>
      <ArrowRight slot="icon-right" style="height: 1.25rem; width: 1.25rem;" />
    </Button>
  </div>
</section>



  