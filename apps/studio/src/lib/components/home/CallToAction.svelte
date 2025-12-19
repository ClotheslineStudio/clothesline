

<section style="padding-block: var(--spacing-section, 2rem) var(--spacing-9, 2.5rem);">
  <div style="
    border-radius: var(--radius-container, 1.25rem);
    border: var(--default-border-width, 1px) solid var(--color-primary-200, #e0e7ff);
    background: var(--background-elevation-2, var(--color-surface-900, #18181b));
    padding: var(--spacing-lg, 1.25rem);
    box-shadow: var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06));
    backdrop-filter: blur(4px);
    max-width: 40rem;
    margin-inline: auto;
  ">
    <div style="text-align: center; margin-inline: auto; display: flex; flex-direction: column; gap: var(--spacing-gap-large, 1.25rem);">
      <h2 style="
        font-size: var(--type-3xl-size, 1.875rem);
        font-weight: var(--heading-font-weight, 800);
        letter-spacing: var(--heading-letter-spacing, -0.01em);
        color: var(--color-accent-500, #a21caf);
        font-family: var(--heading-font-family, inherit);
        margin-bottom: 0;
      ">
        Let’s build something great.
      </h2>

      <p style="
        font-size: var(--base-font-size, 1rem);
        color: var(--on-surface-subtle, #a1a1aa);
        line-height: var(--base-line-height, 1.6);
        font-family: var(--base-font-family, inherit);
        margin-bottom: 0;
      ">
        Have a project in mind, need creative support, or just want to connect? I’d love to hear from you.
      </p>

      <div style="padding-top: var(--spacing-gap-base, 0.5rem);">
        <a
          href="/contact"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-base, 0.5rem);
            background: var(--color-primary-500, #6366f1);
            padding: var(--spacing-3, 0.75rem) var(--spacing-8, 2rem);
            font-weight: var(--font-semibold, 600);
            color: var(--on-primary, #fff);
            box-shadow: var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06));
            transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
            outline: none;
            border: none;
          "
          on:focus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-primary-500, #6366f1)'; }}
          on:blur={(e) => { e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; }}
          on:mouseover={(e) => { e.currentTarget.style.boxShadow = 'var(--elevation-3, 0 8px 24px rgba(0,0,0,0.12))'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          on:mouseout={(e) => { e.currentTarget.style.boxShadow = 'var(--elevation-1, 0px 1px 2px rgba(0,0,0,0.06))'; e.currentTarget.style.transform = 'none'; }}
        >
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</section>


  
