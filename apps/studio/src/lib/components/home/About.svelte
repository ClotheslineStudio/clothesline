<script lang="ts">
  import { Code, Layers, Compass, } from 'lucide-svelte';
  import { ArrowRight } from '@clothesline/icons';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  onMount(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>('.about-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 28,
        duration: 0.55,
        ease: 'power2.out'
      });
    });
  });
</script>

<section class="py-16 sm:py-20">
  <header class="text-center space-y-4">
    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-accent-500)">
      What Clothesline Studio Does
    </h2>

    <p class="mx-auto max-w-4xl text-base sm:text-lg leading-relaxed text-(--color-surface-500)">
     Clothesline Studio designs and builds the foundations behind modern tools: accessible web apps, design systems, themes, icons, and dashboards that can grow with your work.
    </p>
  </header>

  <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    <!-- Creative Direction -->
   <article
  class="about-card group rounded-2xl border border-(--color-plum)/30 bg-(--color-bg)/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
>
  <div class="flex items-start gap-4">
    <div>
      <Compass class="h-6 w-6 text-(--color-primary-500)" />
    </div>
    <div class="min-w-0">
      <h3 class="text-lg font-semibold text-(--color-surface-900)">Creative Direction</h3>
      <p class="mt-2 text-sm leading-relaxed text-(--color-surface-600)">
        Story-led design, visual systems, and brand identity that feel like you and stay workable in real products.
      </p>
    </div>
  </div>
</article>

    <!-- Front-End Dev -->
    <article
      class="about-card group rounded-2xl border border-(--color-plum)/30 bg-(--color-bg)/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
    >
      <div class="flex items-start gap-4">
        <div>
          <Code class="h-6 w-6 text-(--color-primary-500)" />
        </div>

        <div class="min-w-0">
          <h3 class="text-lg font-semibold text-(--color-surface-900)">Front-End Development</h3>
          <p class="mt-2 text-sm leading-relaxed text-(--color-surface-600)">
            Modern front-end work with SvelteKit and Tailwind, focused on fast, accessible UI that is easy to extend and maintain.
          </p>
        </div>
      </div>
    </article>

    <!-- System Design -->
    <article
      class="about-card group rounded-2xl border border-(--color-plum)/30 bg-(--color-bg)/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
    >
      <div class="flex items-start gap-4">
        <div        >
          <Layers class="h-6 w-6 text-(--color-primary-500)" />
        </div>

        <div class="min-w-0">
          <h3 class="text-lg font-semibold text-(--color-surface-900)">System Design</h3>
          <p class="mt-2 text-sm leading-relaxed text-(--color-surface-600)">
            The connective tissue of your product stack, including design systems, tokens, docs, and integration planning for long-term work.
          </p>
        </div>
      </div>
    </article>
  </div>

  <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
    <a
      href="/projects"
      class="inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-accent-500) px-6 py-3 font-semibold text-white shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
    >
      Explore projects
      <ArrowRight class="h-5 w-5" />
    </a>

    <a
      href="/about"
      class="inline-flex items-center justify-center rounded-xl border border-(--color-primary-500) px-6 py-3 font-semibold text-(--color-primary-600) transition hover:bg-(--color-primary-600) hover:text-white focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
    >
      Read the full story
    </a>
  </div>
</section>


  
  