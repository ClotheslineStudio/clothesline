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

  function handleAboutMouseOver(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.background = 'var(--color-primary-600)';
    el.style.color = 'white';
  }

  function handleAboutMouseOut(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.background = 'transparent';
    el.style.color = 'var(--color-primary-600)';
  }

  function handleAboutFocus(event: FocusEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.background = 'var(--color-primary-600)';
    el.style.color = 'white';
  }

  function handleAboutBlur(event: FocusEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.background = 'transparent';
    el.style.color = 'var(--color-primary-600)';
  }
</script>

<section style="padding-block: var(--spacing-section, var(--spacing-lg));">
  <header class="text-center" style="margin-bottom: var(--spacing-stack, var(--spacing-5));">
    <h2 style="
      color: var(--color-accent-500);
      font-family: var(--heading-font-family, var(--type-heading-family));
      font-size: var(--type-display-size, 1.875rem);
      font-weight: var(--heading-font-weight, 700);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      line-height: var(--type-heading-leading, 1.1);
      margin-bottom: var(--spacing-3);
    ">
      What Clothesline Studio Does
    </h2>
    <p class="mx-auto max-w-4xl" style="
      color: var(--on-surface-subtle);
      font-family: var(--base-font-family, var(--type-body-family));
      font-size: var(--base-font-size, 1rem);
      font-weight: var(--base-font-weight, 400);
      letter-spacing: var(--base-letter-spacing, 0em);
      line-height: var(--base-line-height, 1.5);
      margin-bottom: var(--spacing-4);
    ">
      Clothesline Studio designs and builds the foundations behind modern tools: accessible web apps, design systems, themes, icons, and dashboards that can grow with your work.
    </p>
  </header>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style="gap: var(--spacing-gap-large, var(--spacing-6)); margin-top: var(--spacing-8);">
    <!-- Creative Direction -->
    <article
      class="about-card group backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
      style="
        background: color-mix(in srgb, var(--background-panel) 70%, transparent);
        border-color: var(--border-default-color, var(--color-primary-200));
        border-width: var(--default-border-width, 1px);
        border-style: solid;
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        box-shadow: var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10));
        padding: var(--spacing-comfy, var(--spacing-6));
      "
    >
      <div class="flex items-start" style="gap: var(--spacing-4);">
        <div>
          <Compass  style="width: 32px; height: 32px; color: var(--color-primary-500-vis)" />
        </div>
        <div class="min-w-0">
          <h3 style="
            color: var(--on-surface-strong);
            font-family: var(--heading-font-family, var(--type-heading-family));
            font-size: var(--type-heading-size, 1.25rem);
            font-weight: var(--heading-font-weight, 700);
            letter-spacing: var(--heading-letter-spacing, -0.01em);
            line-height: var(--type-heading-leading, 1.1);
            margin-bottom: var(--spacing-2);
          ">Creative Direction</h3>
          <p style="
            color: var(--on-surface-muted);
            font-family: var(--base-font-family, var(--type-body-family));
            font-size: var(--type-body-size, 1rem);
            font-weight: var(--base-font-weight, 400);
            letter-spacing: var(--base-letter-spacing, 0em);
            line-height: var(--base-line-height, 1.5);
          ">
            Story-led design, visual systems, and brand identity that feel like you and stay workable in real products.
          </p>
        </div>
      </div>
    </article>

    <!-- Front-End Dev -->
    <article
      class="about-card group backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
      style="
        background: color-mix(in srgb, var(--background-panel) 70%, transparent);
        border-color: var(--border-default-color, var(--color-primary-200));
        border-width: var(--default-border-width, 1px);
        border-style: solid;
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        box-shadow: var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10));
        padding: var(--spacing-comfy, var(--spacing-6));
      "
    >
      <div class="flex items-start" style="gap: var(--spacing-4);">
        <div>
          <Code style="width: 32px; height: 32px; color: var(--color-primary-500)" />
        </div>
        <div class="min-w-0">
          <h3 style="
            color: var(--on-surface-strong);
            font-family: var(--heading-font-family, var(--type-heading-family));
            font-size: var(--type-heading-size, 1.25rem);
            font-weight: var(--heading-font-weight, 700);
            letter-spacing: var(--heading-letter-spacing, -0.01em);
            line-height: var(--type-heading-leading, 1.1);
            margin-bottom: var(--spacing-2);
          ">Front-End Development</h3>
          <p style="
            color: var(--on-surface-muted);
            font-family: var(--base-font-family, var(--type-body-family));
            font-size: var(--type-body-size, 1rem);
            font-weight: var(--base-font-weight, 400);
            letter-spacing: var(--base-letter-spacing, 0em);
            line-height: var(--base-line-height, 1.5);
          ">
            Modern front-end work with SvelteKit and Tailwind, focused on fast, accessible UI that is easy to extend and maintain.
          </p>
        </div>
      </div>
    </article>

    <!-- System Design -->
    <article
      class="about-card group backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-within:shadow-lg"
      style="
        background: color-mix(in srgb, var(--background-panel) 70%, transparent);
        border-color: var(--border-default-color, var(--color-primary-200));
        border-width: var(--default-border-width, 1px);
        border-style: solid;
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        box-shadow: var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10));
        padding: var(--spacing-comfy, var(--spacing-6));
      "
    >
      <div class="flex items-start" style="gap: var(--spacing-4);">
        <div>
          <Layers  style="width: 32px; height: 32px; color: var(--color-primary-500)" />
        </div>
        <div class="min-w-0">
          <h3 style="
            color: var(--on-surface-strong);
            font-family: var(--heading-font-family, var(--type-heading-family));
            font-size: var(--type-heading-size, 1.25rem);
            font-weight: var(--heading-font-weight, 700);
            letter-spacing: var(--heading-letter-spacing, -0.01em);
            line-height: var(--type-heading-leading, 1.1);
            margin-bottom: var(--spacing-2);
          ">System Design</h3>
          <p style="
            color: var(--on-surface-muted);
            font-family: var(--base-font-family, var(--type-body-family));
            font-size: var(--type-body-size, 1rem);
            font-weight: var(--base-font-weight, 400);
            letter-spacing: var(--base-letter-spacing, 0em);
            line-height: var(--base-line-height, 1.5);
          ">
            The connective tissue of your product stack, including design systems, tokens, docs, and integration planning for long-term work.
          </p>
        </div>
      </div>
    </article>
  </div>

  <div class="flex flex-col items-center justify-center sm:flex-row" style="gap: var(--spacing-3); margin-top: var(--spacing-8);">
    <a
      href="/projects"
      class="inline-flex items-center justify-center gap-2 font-semibold text-white transition focus:outline-none focus:ring-2"
      style="
        background: var(--color-accent-500);
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        box-shadow: var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10));
        padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1.25rem);
        font-family: var(--type-button-family, var(--type-family-body));
        font-size: var(--type-button-size, 0.875rem);
        font-weight: var(--type-button-weight, 600);
        letter-spacing: var(--type-button-tracking, 0em);
        line-height: var(--type-button-leading, 1.5);
      "
    >
      Explore projects
      <ArrowRight class="h-5 w-5" />
    </a>

    <a
      href="/about"
      class="inline-flex items-center justify-center border font-semibold transition focus:outline-none focus:ring-2"
      style="
        border-color: var(--color-primary-500);
        border-width: var(--default-border-width, 1px);
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1.25rem);
        color: var(--color-primary-600);
        font-family: var(--type-button-family, var(--type-family-body));
        font-size: var(--type-button-size, 0.875rem);
        font-weight: var(--type-button-weight, 600);
        letter-spacing: var(--type-button-tracking, 0em);
        line-height: var(--type-button-leading, 1.5);
        transition: background 0.2s, color 0.2s;
      "
      on:mouseover={handleAboutMouseOver}
      on:mouseout={handleAboutMouseOut}
      on:focus={handleAboutFocus}
      on:blur={handleAboutBlur}
    >
      Read the full story
    </a>
  </div>
</section>


  
  