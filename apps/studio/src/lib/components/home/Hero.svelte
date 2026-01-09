<script>
// @ts-nocheck

  import { ArrowRight } from '@clothesline/icons';

  function handleMouseOver(event) {
    event.currentTarget.style.transform = 'scale(1.02)';
    event.currentTarget.style.boxShadow = 'var(--elevation-card, 0px 4px 12px rgba(0,0,0,0.16))';
  }

  function handleMouseOut(event) {
    event.currentTarget.style.transform = 'none';
    event.currentTarget.style.boxShadow = 'var(--elevation-card, 0px 1px 3px rgba(0,0,0,0.10))';
  }
</script>

<section style="padding-block: var(--spacing-section, var(--spacing-8));">
  <div class="grid items-center md:grid-cols-2" style="gap: var(--spacing-14, 3.5rem);">
    <!-- Text -->
   <!-- Text -->
<div class="text-center md:text-left" style="display: flex; flex-direction: column; gap: var(--spacing-6, 1.5rem);">
  <p
    class="inline-flex items-center justify-center md:justify-start"
    style="
      border-radius: var(--radius-full, 9999rem);
      border: var(--default-border-width, 1px) solid var(--color-primary-500);
      background: var(--background-app, var(--color-surface-100));
      padding: var(--spacing-1, 0.25rem) var(--spacing-3, 0.75rem);
      font-size: var(--type-caption-size, 0.75rem);
      font-family: var(--type-caption-family, var(--type-family-body));
      font-weight: var(--type-caption-weight, 400);
      letter-spacing: var(--type-caption-tracking, 0em);
      color: var(--color-primary-500);
      margin-bottom: var(--spacing-2, 0.5rem);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    "
  >
    Clothesline Studio • Custom Systems, Interfaces & Tools
  </p>

  <h1
    style="
      color: var(--color-accent-500);
      font-family: var(--heading-font-family, var(--type-heading-family));
      font-size: var(--type-display-size, 2.25rem);
      font-weight: var(--heading-font-weight, 800);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      line-height: var(--type-heading-leading, 1.1);
      margin-bottom: var(--spacing-2, 0.5rem);
    "
  >
    Clothesline Studio
    <span style="
      display: block;
      margin-top: var(--spacing-2, 0.5rem);
      color: var(--on-surface-muted, var(--color-surface-700));
      font-size: var(--type-heading-size, 1.25rem);
      font-family: var(--heading-font-family, var(--type-heading-family));
      font-weight: var(--heading-font-weight, 700);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      line-height: var(--type-heading-leading, 1.1);
    ">
      Design systems, product UI, and tools built to ship real work.
    </span>
  </h1>

  <p
    class="mx-auto max-w-xl md:mx-0"
    style="
      color: var(--on-surface, var(--color-surface-500));
      font-size: var(--base-font-size, 1rem);
      font-family: var(--base-font-family, var(--type-body-family));
      font-weight: var(--base-font-weight, 400);
      letter-spacing: var(--base-letter-spacing, 0em);
      line-height: var(--base-line-height, 1.5);
      margin-bottom: var(--spacing-4, 1rem);
    "
  >
    Clothesline is a small studio focused on durable digital infrastructure—design systems, web apps,
    and internal tools that help teams move from scattered ideas to working products.
  </p>

  <div class="flex flex-col items-center justify-center md:justify-start sm:flex-row" style="gap: var(--spacing-3, 0.75rem);">
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
        transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
      "
      on:mouseover={handleMouseOver}
      on:mouseout={handleMouseOut}
      on:focus={handleMouseOver}
      on:blur={handleMouseOut}
    >
      View Studio Work
      <ArrowRight class="h-5 w-5" />
    </a>

    <a
      href="/about/travis"
      class="inline-flex items-center justify-center border font-semibold transition focus:outline-none focus:ring-2"
      style="
        border-color: var(--color-primary-500);
        border-width: var(--default-border-width, 1px);
        border-radius: var(--radius-container, var(--radius-lg, 1rem));
        padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1.25rem);
        color: var(--color-primary-700);
        font-family: var(--type-button-family, var(--type-family-body));
        font-size: var(--type-button-size, 0.875rem);
        font-weight: var(--type-button-weight, 600);
        letter-spacing: var(--type-button-tracking, 0em);
        line-height: var(--type-button-leading, 1.5);
        transition: background 0.2s, color 0.2s;
      "
      on:mouseover={(event) => {
        event.currentTarget.style.background = 'var(--color-primary-500)';
        event.currentTarget.style.color = 'white';
      }}
      on:mouseout={(event) => {
        event.currentTarget.style.background = 'transparent';
        event.currentTarget.style.color = 'var(--color-primary-700)';
      }}
      on:focus={(event) => {
        event.currentTarget.style.background = 'var(--color-primary-500)';
        event.currentTarget.style.color = 'white';
      }}
      on:blur={(event) => {
        event.currentTarget.style.background = 'transparent';
        event.currentTarget.style.color = 'var(--color-primary-700)';
      }}
    >
      Meet the Founder
    </a>
  </div>
</div>


    <!-- Image -->
    <div class="flex justify-center md:justify-end">
      <div
        class="relative overflow-hidden"
        style="
          height: var(--size-hero-img-h, 20rem);
          width: var(--size-hero-img-w, 20rem);
          border-radius: var(--radius-hero-img, 1.75rem);
          border: var(--default-border-width, 1px) solid var(--color-indigo, #6366f1);
          background: var(--color-plum, #a78bfa);
          box-shadow: var(--elevation-highest, 0px 8px 16px rgba(0,0,0,0.16));
        "
      >
        <img
          src="/image/hero1.png"
          alt="Travis and Ripley on a creative journey"
          style="height: 100%; width: 100%; object-fit: cover;"
          loading="eager"
        />

        <!-- subtle overlay -->
        <div style="pointer-events: none; position: absolute; inset: 0; box-shadow: 0 0 0 1px rgba(255,255,255,0.10);"></div>
      </div>
    </div>
  </div>
</section>

