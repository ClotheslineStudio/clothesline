<script lang="ts">
  export let data;
  const { content, metadata } = data;
</script>

<svelte:head>
  <title>{metadata.title} · Clothesline Studio Blog</title>
</svelte:head>

<main class="py-16 sm:py-20">
  <article class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <header class="mb-8 space-y-2">
      <p class="text-xs font-medium uppercase tracking-wide text-(--color-primary-500)">
        Blog
      </p>

      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-surface-900)">
        {metadata.title}
      </h1>

      <p class="text-xs sm:text-sm text-(--color-surface-700)">
        {metadata.date}
      </p>
    </header>

    <!-- Main article body -->
<div
  class="prose max-w-none
         text-(--color-surface-700  )
         prose-headings:text-(--color-surface-900)
         prose-strong:text-(--color-surface-900)
         prose-em:text-(--color-surface-900)
         prose-li:text-(--color-surface-700)
         prose-a:text-(--color-accent-500)
         marker:text-(--color-surface-700)
         prose-blockquote:text-(--color-text-500)
         prose-blockquote:border-l-(--color-accent-500)"
>
  <svelte:component this={content} />
</div>


  </article>
</main>


  