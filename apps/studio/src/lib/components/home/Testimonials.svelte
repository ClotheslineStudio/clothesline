<script lang="ts">
  import { Linkedin, Github, Quote } from 'lucide-svelte';
  import {
    testimonials as allTestimonials,
    type Testimonial as ContentTestimonial
  } from '$lib/content/testimonials';

  type HomeTestimonial = {
    quote: string;
    name: string;
    title: string;
    img?: string;
    linkedin?: string;
    github?: string;
  };

  // Use the first 3 testimonials from the shared content file
  const testimonials: HomeTestimonial[] = allTestimonials.slice(0, 3).map(
    (t: ContentTestimonial): HomeTestimonial => {
      const [namePart, ...rest] = t.author.split(',');
      return {
        quote: t.text,
        name: namePart.trim(),
        title: rest.join(',').trim() || '',
        img: t.img,
        linkedin: t.linkedin,
        github: t.github
      };
    }
  );
</script>

<section class="py-16 sm:py-20">
  <header class="text-center space-y-4">
    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--color-accent-500)">
      What People Say
    </h2>
    <p class="mx-auto max-w-2xl text-sm sm:text-base text-(--color-surface-600)">
      A few notes from teammates and partners I’ve worked with.
    </p>
  </header>

  <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each testimonials as t (t.name)}
      <article
        class="group h-full rounded-2xl border border-(--color-plum)/30 bg-(--color-bg)/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div class="flex items-start gap-3">
          <div>
            <Quote class="h-5 w-5 text-(--color-primary-500)" />
          </div>

          <p class="text-sm leading-relaxed text-(--color-surface-600)">
            “{t.quote}”
          </p>
        </div>

        <div class="mt-6 flex items-center gap-4">
          {#if t.img}
            <img
              src={t.img}
              alt={t.name}
              class="h-12 w-12 rounded-full object-cover ring-2 ring-(--color-accent-500)/70"
              loading="lazy"
            />
          {:else}
            <!-- svelte-ignore element_invalid_self_closing_tag -->
            <div
              class="h-12 w-12 rounded-full bg-(--color-plum)/25 ring-2 ring-(--color-accent-500)/50"
              aria-hidden="true"
            />
          {/if}

          <div class="min-w-0">
            <div class="truncate text-sm font-semibold text-(--color-text)">{t.name}</div>
            <div class="truncate text-xs text-(--color-indigo)">{t.title}</div>
          </div>

          <div class="ml-auto flex items-center gap-3">
            {#if t.linkedin}
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--color-text)/70 transition hover:text-(--color-accent-500) focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg) rounded-md"
                aria-label={`Open ${t.name} on LinkedIn`}
              >
                <Linkedin class="h-5 w-5" />
              </a>
            {/if}

            {#if t.github}
              <a
                href={t.github}
                target="_blank"
                rel="noopener noreferrer"
                class="text-(--color-text)/70 transition hover:text-(--color-accent-500) focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg) rounded-md"
                aria-label={`Open ${t.name} on GitHub`}
              >
                <Github class="h-5 w-5" />
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  <!-- CTA to full testimonials page -->
  <div class="mt-10 text-center">
    <a
      href="/testimonials"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-(--color-accent-500) px-6 py-3 font-semibold text-(--color-accent-500) transition hover:bg-(--color-accent-500) hover:text-white focus:outline-none focus:ring-2 focus:ring-(--color-accent-500) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
    >
      View all testimonials
    </a>
  </div>
</section>




  