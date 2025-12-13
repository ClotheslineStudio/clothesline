<svelte:head>
  <title>Accessibility | Clothesline Studio</title>
  <meta
    name="description"
    content="Accessibility commitments and features for Clothesline Studio and its projects."
  />
</svelte:head>

<section class="page-shell py-16 space-y-8">
  <header class="space-y-2">
    <h1 class="text-3xl font-extrabold tracking-tight text-(--color-surface-500)">
      Accessibility
    </h1>
    <p class="text-sm text-(--color-surface-500)">
      How I think about accessibility in my design system, websites, and tools.
    </p>
  </header>

  <div class="space-y-6 text-sm leading-relaxed text-(--color-surface-500)/80">
    <p>
      Clothesline Studio is being built with accessibility as a core requirement, not an afterthought.
      I’m working toward WCAG-aligned color contrast, keyboard-friendly components, and support for
      different vision and motion preferences.
    </p>

    <p>
      If you run into any accessibility barriers on this site or in my demos, please let me know:
      <a href="/contact" class="text-(--color-accent-500) hover:underline">
        contact page
      </a>.
    </p>

    <ul class="list-disc pl-5 space-y-1">
      <li>Semantic HTML and landmarks where possible</li>
      <li>Keyboard focus styles and logical tab order</li>
      <li>Color palettes designed using OKLCH and contrast factors</li>
      <li>Plans for high-contrast and color-vision modes in the UI kit</li>
    </ul>
  </div>
</section>
