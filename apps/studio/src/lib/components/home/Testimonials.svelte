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



<section style="padding-block: var(--spacing-section, 2rem) var(--spacing-9, 2.5rem);">
  <header style="text-align: center; margin-bottom: var(--spacing-gap-large, 1.5rem);">
    <h2 style="
      font-size: var(--type-3xl-size, 1.875rem);
      font-weight: var(--heading-font-weight, 800);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      color: var(--color-accent-500, #a21caf);
      font-family: var(--heading-font-family, inherit);
      margin-bottom: var(--spacing-2, 0.5rem);
    ">
      What People Say
    </h2>
    <p style="
      margin-inline: auto;
      max-width: 40ch;
      font-size: var(--base-font-size, 1rem);
      color: var(--on-surface-subtle, #a1a1aa);
      font-family: var(--base-font-family, inherit);
    ">
      A few notes from teammates and partners I’ve worked with.
    </p>
  </header>

  <div style="
    margin-top: var(--spacing-lg, 2rem);
    display: grid;
    gap: var(--spacing-gap-base, 1rem);
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  ">
    {#each testimonials as t (t.name)}
      <article
        style="
          height: 100%;
          border-radius: var(--radius-container, 1.25rem);
          border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
          background: var(--background-elevation-2, var(--color-surface-900, #18181b));
          padding: var(--spacing-lg, 1.25rem);
          box-shadow: var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06));
          backdrop-filter: blur(4px);
          transition: box-shadow 0.2s, transform 0.2s;
        "
        on:mouseover={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--elevation-3, 0 8px 24px rgba(0,0,0,0.12))'; }}
        on:mouseout={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; }}
        on:focus={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--elevation-3, 0 8px 24px rgba(0,0,0,0.12))'; }}
        on:blur={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; }}
      >
        <div style="display: flex; align-items: flex-start; gap: var(--spacing-gap-small, 0.5rem);">
          <div>
            <Quote style="height: 1.25rem; width: 1.25rem; color: var(--color-primary-500, #6366f1);" />
          </div>
          <p style="font-size: var(--base-font-size, 1rem); color: var(--on-surface-subtle, #a1a1aa); line-height: var(--base-line-height, 1.6);">
            “{t.quote}”
          </p>
        </div>

        <div style="margin-top: var(--spacing-gap-base, 1rem); display: flex; align-items: center; gap: var(--spacing-gap-base, 0.75rem);">
          {#if t.img}
            <img
              src={t.img}
              alt={t.name}
              style="height: 3rem; width: 3rem; border-radius: var(--radius-avatar, 9999px); object-fit: cover; box-shadow: 0 0 0 2px var(--color-accent-500, #a21cafb3);"
              loading="lazy"
            />
          {:else}
            <div
              style="height: 3rem; width: 3rem; border-radius: var(--radius-avatar, 9999px); background: var(--color-primary-100, #e0e7ff); box-shadow: 0 0 0 2px var(--color-accent-500, #a21caf80);"
              aria-hidden="true"
            ></div>
          {/if}

          <div style="min-width: 0;">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: var(--base-font-size, 1rem); font-weight: var(--base-font-weight, 600); color: var(--on-surface, #18181b);">
              {t.name}
            </div>
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: var(--base-font-size, 1rem); color: var(--color-primary-500, #6366f1);">
              {t.title}
            </div>
          </div>

          <div style="margin-left: auto; display: flex; align-items: center; gap: var(--spacing-gap-small, 0.5rem);">
            {#if t.linkedin}
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style="
                  color: var(--on-surface-muted, #52525b);
                  border-radius: var(--radius-base, 0.5rem);
                  transition: color 0.2s;
                  outline: none;
                  box-shadow: none;
                "
                on:focus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent-500, #a21caf)'; }}
                on:blur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                on:mouseover={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
                on:mouseout={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
                aria-label={`Open ${t.name} on LinkedIn`}
              >
                <Linkedin style="height: 1.25rem; width: 1.25rem;" />
              </a>
            {/if}

            {#if t.github}
              <a
                href={t.github}
                target="_blank"
                rel="noopener noreferrer"
                style="
                  color: var(--on-surface-muted, #52525b);
                  border-radius: var(--radius-base, 0.5rem);
                  transition: color 0.2s;
                  outline: none;
                  box-shadow: none;
                "
                on:focus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent-500, #a21caf)'; }}
                on:blur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                on:mouseover={(e) => { e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
                on:mouseout={(e) => { e.currentTarget.style.color = 'var(--on-surface-muted, #52525b)'; }}
                aria-label={`Open ${t.name} on GitHub`}
              >
                <Github style="height: 1.25rem; width: 1.25rem;" />
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  <div style="margin-top: var(--spacing-lg, 2rem); text-align: center;">
    <a
      href="/testimonials"
      style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-gap-small, 0.5rem);
        border-radius: var(--radius-container, 1.25rem);
        border: var(--default-border-width, 1px) solid var(--color-accent-500, #a21caf);
        padding: var(--spacing-3, 0.75rem) var(--spacing-6, 1.5rem);
        font-weight: var(--font-semibold, 600);
        color: var(--color-accent-500, #a21caf);
        background: transparent;
        transition: background 0.2s, color 0.2s;
        outline: none;
        box-shadow: none;
      "
      on:focus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent-500, #a21caf)'; }}
      on:blur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      on:mouseover={(e) => { e.currentTarget.style.background = 'var(--color-accent-500, #a21caf)'; e.currentTarget.style.color = 'var(--on-accent, #fff)'; }}
      on:mouseout={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-accent-500, #a21caf)'; }}
    >
      View all testimonials
    </a>
  </div>
</section>




  