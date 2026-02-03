<script lang="ts">
  import { Github, Linkedin } from 'lucide-svelte';
  import Logo from './Logo.svelte';

  const year = new Date().getFullYear();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/llm-optimization', label: 'LLM Optimization' }
  ];

  const socials = [
    { href: 'https://www.linkedin.com/in/travis-profile', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://github.com/ClotheslineStudio', label: 'GitHub', icon: Github }
  ];
</script>

<footer class="cl-footer">
  <div class="cl-footer__inner">
    <div class="cl-footer__row">
      <!-- Brand -->
      <div class="cl-footer__brand">
        <!-- If your Logo.svelte is decorative, keep aria-hidden and provide brand text nearby.
     If it conveys meaning, remove aria-hidden and add aria-label. -->
<Logo class="cl-footer__logo" aria-hidden="true" focusable="false" />


        <div class="cl-footer__meta">
          <div class="cl-footer__built">Built by Travis in ⛰️ Montana.</div>
          <div class="cl-footer__divider"></div>
          <div class="cl-footer__copy">&copy; {year} Clothesline Studio</div>
        </div>
      </div>

      <!-- Links (two columns) -->
      <nav class="cl-footer__nav" aria-label="Footer">
        {#each links as l (l.href)}
          <a class="cl-footer__link" href={l.href}>{l.label}</a>
        {/each}
      </nav>

      <!-- Social -->
      <div class="cl-footer__social">
        {#each socials as s (s.href)}
          <a
            class="cl-footer__socialBtn"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${s.label}`}
          >
            <svelte:component this={s.icon} class="cl-footer__socialIcon" />
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>

<style>
  .cl-footer {
    margin-top: var(--spacing-10);
    border-top: var(--border-width-divider) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-border), transparent);

    /* Darker, theme-safe footer background */
    background: color-mix(in oklab, var(--background-panel
) 86%, var(--color-surface-50));
    color: var(--on-surface);
  }

  .cl-footer__inner {
    max-width: var(--layout-container-max);
    margin-inline: auto;
    padding-inline: var(--spacing-7);
    padding-block: var(--spacing-8);
  }

  .cl-footer__row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-8);
  }

  /* Brand */
  .cl-footer__brand {
    display: grid;
    gap: var(--spacing-4);
    min-width: 0;
  }
:global(.cl-footer__logo) {
  height: 3.25rem; /* larger */
  width: auto;
  display: block;
}

/* If Logo.svelte outputs an <svg> inside a wrapper, force the SVG to size correctly */
:global(.cl-footer__logo) :global(svg) {
  height: 100%;
  width: auto;
  display: block;
}


  .cl-footer__meta {
    display: grid;
    gap: var(--spacing-2);
    color: var(--on-surface-muted);
    font-size: var(--type-scale-sm);
  }

  .cl-footer__divider {
    height: 1px;
    width: 14rem;
    background: color-mix(in oklab, var(--on-surface) var(--opacity-divider), transparent);
  }

  .cl-footer__copy {
    font-size: var(--type-scale-xs);
    opacity: var(--opacity-80);
  }

  /* Links (two columns) */
  .cl-footer__nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(10rem, 1fr));
    gap: var(--spacing-2) var(--spacing-6);
    align-content: start;
    width: min(28rem, 100%);
  }

  .cl-footer__link {
    display: inline-flex;
    align-items: center;
    padding: 0.2em 0.5em;
    border-radius: var(--radius-interactive);
    text-decoration: none;
    font-weight: var(--type-weight-medium);
    color: var(--on-surface-muted);
    transition:
      color var(--motion-duration-fast) var(--motion-ease),
      background-color var(--motion-duration-fast) var(--motion-ease);
    outline: none;
  }

  .cl-footer__link:hover {
    color: var(--color-accent-400-vis);
    background: color-mix(in oklab, var(--color-accent-500-vis) 18%, transparent);
  }

  .cl-footer__link:focus-visible {
    color: var(--color-accent-300-vis);
    box-shadow: 0 0 0 var(--focus-width)
      color-mix(in oklab, var(--color-accent-500-vis) 45%, transparent);
  }

  /* Social */
  .cl-footer__social {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .cl-footer__socialBtn {
    display: inline-flex;
    height: var(--size-control-md);
    width: var(--size-control-md);
    align-items: center;
    justify-content: center;

    border-radius: var(--radius-interactive);
    border: var(--border-width-default) solid
      color-mix(in oklab, var(--on-surface) var(--opacity-border), transparent);

    /* Better default background on dark footer */
    background: color-mix(in oklab, var(--color-surface-900) 70%, var(--color-accent-950) 30%);
    box-shadow: var(--elevation-hairline);
    transition:
      transform var(--motion-duration-fast) var(--motion-ease),
      background-color var(--motion-duration-fast) var(--motion-ease),
      border-color var(--motion-duration-fast) var(--motion-ease);
    outline: none;
  }

  .cl-footer__socialBtn:hover {
    transform: translateY(-1px);
    border-color: color-mix(in oklab, var(--color-accent-500-vis) 60%, transparent);
    background: color-mix(in oklab, var(--color-accent-700-vis) 35%, var(--color-surface-900));
  }

  .cl-footer__socialBtn:focus-visible {
    border-color: color-mix(in oklab, var(--color-accent-500-vis) 70%, transparent);
    box-shadow:
      0 0 0 var(--focus-width)
        color-mix(in oklab, var(--color-accent-500-vis) 45%, transparent),
      var(--elevation-2);
  }

  :global(.cl-footer__socialIcon) {
    height: 1.05rem;
    width: 1.05rem;
    color: var(--on-surface-muted);
  }

  :global(.cl-footer__socialBtn:hover .cl-footer__socialIcon) {
    color: var(--on-surface-strong);
  }

  @media (max-width: 640px) {
    .cl-footer__inner {
      padding-inline: var(--spacing-4);
    }
    .cl-footer__nav {
      grid-template-columns: 1fr;
      width: 100%;
    }
    .cl-footer__divider {
      width: 100%;
    }
  }
</style>





  