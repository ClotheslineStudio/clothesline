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

<footer style="margin-top: var(--spacing-8); border-top: 1px solid var(--color-surface-300); background: var(--background-elevation-1);">
  <div class="page-shell" style="padding-block: var(--spacing-6); font-size: var(--type-body-sm); color: var(--on-surface);">
    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--spacing-6); flex-direction: row;">
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.1em; min-width: 0;">
        <div style="display: flex; align-items: center; gap: var(--spacing-4);">
          <img src="/image/clotheslinestudio-logo.svg" alt="Clothesline Studio" style="height: 2.2rem; width: auto; flex-shrink: 0;" />
          <span style="font-size: var(--type-body-sm); color: var(--on-surface-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">&copy; {year} Clothesline Studio</span>
        </div>
        <span style="font-size: var(--type-body-xs); color: var(--on-surface-muted); opacity: 0.85; margin-left: 0.1em; margin-top: 0.1em;">Built by Travis in ⛰️ Montana.</span>
      </div>
      <nav aria-label="Footer" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.1em; margin-block: var(--spacing-1);">
        {#each links as l (l.href)}
          <a
            href={l.href}
            style="border-radius: var(--radius-1); color: var(--on-surface-muted); transition: color 0.2s; text-decoration: none; padding: 0.1em 0.5em; font-weight: 500; width: 100%; display: block;"
            on:mouseover={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent-500)')}
            on:focus={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent-500)')}
            on:mouseout={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--on-surface-muted)')}
            on:blur={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--on-surface-muted)')}
          >
            {l.label}
          </a>
        {/each}
      </nav>
      <div style="display: flex; align-items: center; gap: var(--spacing-2);">
        {#each socials as s (s.href)}
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${s.label}`}
            style="display: inline-flex; height: 2.2rem; width: 2.2rem; align-items: center; justify-content: center; border-radius: var(--radius-3); border: 1px solid var(--color-surface-300); background: var(--background-elevation-1); box-shadow: var(--elevation-1); transition: box-shadow 0.2s, border 0.2s;"
            on:mouseover={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-primary-500)')}
            on:focus={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-primary-500)')}
            on:mouseout={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-surface-300)')}
            on:blur={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-surface-300)')}
          >
            <svelte:component this={s.icon} style="height: 1.1rem; width: 1.1rem; color: var(--on-surface-muted);" />
          </a>
        {/each}
      </div>
    </div>
    <div style="width: 100%; text-align: right; margin-top: var(--spacing-2); color: var(--on-surface-muted); font-size: var(--type-body-xs); opacity: 0.7;">
      Built with SvelteKit + Tailwind.<br />
      <span style="font-style: italic; color: var(--on-surface-muted); opacity: 0.85;">Thanks for visiting — have a wonderful day! :)</span>
    </div>
  </div>
</footer>



  