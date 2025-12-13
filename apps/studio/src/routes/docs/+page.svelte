<script lang="ts">
  export let data: { docs: { slug: string; title: string }[] };
</script>

<section class="flex flex-col gap-8 pt-4 pb-12">
  <header class="border-b border-[var(--color-border-subtle)] pb-4">
    <h1 class="text-4xl font-bold tracking-tight text-(--color-accent)">
      Documentation
    </h1>
    <p class="mt-3 max-w-2xl text-sm text-(--color-indigo)">
      Browse guides, references, and deep dives for Clothesline UI, themes, tokens, and tools.
    </p>
  </header>

  <ul class="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each data.docs as doc}
      <li>
        <a
          href={`/docs/${doc.slug}`}
          class="block rounded-2xl border border-(--color-plum)/20 bg-(--color-bg)/70 px-4 py-3 text-(--color-text) shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-(--color-accent) hover:shadow-lg"
        >
          <h2 class="text-base font-semibold">
            {doc.title}
          </h2>
          <p class="mt-1 text-xs text-(--color-text)/70">
            Read more →
          </p>
        </a>
      </li>
    {/each}
  </ul>
</section>

