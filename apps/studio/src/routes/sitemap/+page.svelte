<svelte:head>
  <title>Sitemap | Clothesline Studio</title>
  <meta
    name="description"
    content="Overview of all main pages and sections on Clothesline Studio."
  />
</svelte:head>

<section class="page-shell py-16 space-y-8">
  <header class="space-y-2">
    <h1 class="text-3xl font-extrabold tracking-tight text-(--color-surface-500)">
      Sitemap
    </h1>
    <p class="text-sm text-(--color-surface-500)/70">
      Quick overview of the main places you can visit on this site.
    </p>
  </header>

  <div class="grid gap-8 sm:grid-cols-2">
    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-(--color-surface-500)/60">
        Main pages
      </h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li><a href="/" class="hover:text-(--color-accent-500) text-(--color-primary-500)">Home</a></li>
        <li><a href="/about" class="hover:text-(--color-accent-500) text-(--color-primary-500)">About</a></li>
        <li><a href="/blog" class="hover:text-(--color-accent-500) text-(--color-primary-500)">Blog</a></li>
        <li><a href="/contact" class="hover:text-(--color-accent-500) text-(--color-primary-500)">Contact</a></li>
      </ul>
    </div>

    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-(--color-surface-500)/60">
        Utility
      </h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li><a href="/sitemap" class="hover:text-(--color-accent-500) text-(--color-primary-500)">Sitemap</a></li>
        <li><a href="/accessibility" class="hover:text-(--color-accent-500) text-(--color-primary-500)">Accessibility</a></li>
        <li><a href="/llm-optimization" class="hover:text-(--color-accent-500) text-(--color-primary-500)">LLM Optimization</a></li>
      </ul>
    </div>
  </div>
</section>
