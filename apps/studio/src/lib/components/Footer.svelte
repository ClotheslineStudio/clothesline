<script lang="ts">
  import { Github, Linkedin, ArrowRight } from 'lucide-svelte';
  

  const year = new Date().getFullYear();

  const links = [
    // Main pages
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },

    // Utility pages
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/llm-optimization', label: 'LLM Optimization' }
  ];

  const socials = [
    { href: 'https://www.linkedin.com/in/travis-profile', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://github.com/ClotheslineStudio', label: 'GitHub', icon: Github }
  ];
</script>

<footer class="mt-16 border-t border-(--color-plum)/20 bg-(--background-panel)">
  <!-- ✅ Constrained to layout width via .page-shell -->
  <div class="page-shell py-10 text-sm text-(--color-text)">
    <div class="grid gap-10 md:grid-cols-3 md:items-start">
      <!-- Brand / blurb -->
      <div class="space-y-3">
        <div class="text-base font-extrabold tracking-tight">
          <img
            src="/image/clotheslinestudio-logo.svg"
            alt="Clothesline Studio"
            class="h-12 w-auto"
          />
        </div>

        <p class="max-w-sm text-(--color-surface-500)">
          Built by Travis in Montana 🏔️ — design systems, product UI, and tools that help teams move faster.
        </p>

        <a
          href="/contact"
          class="inline-flex items-center gap-2 font-semibold text-(--color-accent-500) hover:underline"
        >
          Start a project <ArrowRight class="h-4 w-4" />
        </a>
      </div>

      <!-- Links -->
      <nav aria-label="Footer">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-(--color-surface-500)">
          Links
        </h3>
        <ul class="mt-4 grid gap-2">
          {#each links as l (l.href)}
            <li>
              <a
                href={l.href}
                class="rounded-md text-(--color-surface-500) transition hover:text-(--color-accent-500) focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
              >
                {l.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Social -->
      <div class="md:justify-self-end">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-(--color-surface-500)">
          Connect
        </h3>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          {#each socials as s (s.href)}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${s.label}`}
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--color-plum)/25 bg-(--color-bg) shadow-sm transition hover:-translate-y-0.5 hover:border-(--color-primary-500)/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-(--color-primary-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
            >
              <svelte:component this={s.icon} class="h-5 w-5 text-(--color-surface-500)" />
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div
      class="mt-10 flex flex-col gap-2 border-t border-(--color-surface-700) pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-(--color-surface-500)/60">
        &copy; {year} Clothesline Studio. All rights reserved.
      </p>

      <p class="text-(--color-surface-500)/45">
        Built with SvelteKit + Tailwind.
      </p>
    </div>
  </div>
</footer>



  