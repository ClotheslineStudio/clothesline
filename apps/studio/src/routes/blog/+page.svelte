<script>
  export let data;
</script>

<section class="py-16 sm:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <header class="space-y-3 mb-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-accent-500)">
        Blog
      </h1>
      <p class="text-sm sm:text-base text-(--color-surface-600)">
        Longer notes on the ideas and processes behind our work.
      </p>
    </header>

    <ul class="space-y-6">
      {#each data.posts as post}
        <li>
          <a
            href={`/blog/${post.slug}`}
            class="group block rounded-2xl border border-(--color-plum)/30 bg-(--color-bg)/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-(--color-accent-500)/60 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
          >
            <div class="flex items-baseline justify-between gap-4">
              <h2 class="text-lg sm:text-xl font-semibold text-(--color-text) group-hover:text-(--color-accent-500)">
                {post.metadata.title}
              </h2>
              <p class="text-xs text-(--color-surface-600) whitespace-nowrap">
                {post.metadata.date}
              </p>
            </div>
            <p class="mt-3 text-sm text-(--color-surface-700)/80">
              {post.metadata.description}
            </p>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>



  