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

  export let posts: BlogPreviewPost[] = [];
</script>

<section class="py-16 sm:py-20">
  <header class="text-center space-y-4">
    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-accent-500)">
      Latest Insights
    </h2>
    <p class="mx-auto max-w-2xl text-sm sm:text-base text-(--color-surface-600)">
      Notes on design, development, and digital craft.
    </p>
  </header>

  <div class="mt-10 grid gap-6 sm:grid-cols-2">
    {#if posts.length === 0}
      <p class="col-span-full text-center text-sm text-(--color-surface-600)">
        Blog posts are coming soon.
      </p>
    {:else}
      {#each posts as post (post.slug)}
        <a
          href={`/blog/${post.slug}`}
          class="group block rounded-2xl border border-(--color-primary-500)/30 bg-(--color-bg)/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-(--color-primary-500)/60 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary-500) focus:ring-offset-2 focus:ring-offset-(--color-bg) no-underline"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-lg sm:text-xl font-semibold text-(--color-surface-800) group-hover:text-(--color-primary-500)">
                {post.metadata.title}
              </h3>
              <p class="mt-1 text-xs text-(--color-surface-600)">
                {post.metadata.date}
              </p>
            </div>

            <ArrowRight
  class="h-5 w-5 shrink-0 text-(--color-primary-500) transition group-hover:translate-x-0.5 group-hover:text-(--color-primary-600)"
/>

          </div>

          <p class="mt-4 text-sm leading-relaxed text-(--color-text)/80">
            {post.metadata.description}
          </p>
        </a>
      {/each}
    {/if}
  </div>

  <div class="mt-10 flex justify-center">
    <a
      href="/blog"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-(--color-accent-500) px-6 py-3 font-semibold text-(--color-accent-500) transition hover:bg-(--color-accent-500) hover:text-white focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
    >
      View all posts
      <ArrowRight class="h-5 w-5" />
    </a>
  </div>
</section>



  