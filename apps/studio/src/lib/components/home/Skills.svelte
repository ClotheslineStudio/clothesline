<script lang="ts">
  import SkillBadge from '$lib/components/SkillBadge.svelte';

  type Skill = { label: string; iconSrc: string; alt?: string };

  // Keep it clean + scalable: use iconSrc instead of HTML strings
  const skills: Skill[] = [
    { label: 'SvelteKit', iconSrc: '/icons/svelte-svgrepo-com.svg', alt: 'Svelte' },
    { label: 'TypeScript', iconSrc: '/icons/typescript-svgrepo-com.svg', alt: 'TypeScript' },
    { label: 'HTML', iconSrc: '/icons/html5-svgrepo-com.svg', alt: 'HTML5' },
    { label: 'CSS', iconSrc: '/icons/css3-svgrepo-com.svg', alt: 'CSS3' },
    { label: 'Tailwind', iconSrc: '/icons/tailwind-svgrepo-com.svg', alt: 'Tailwind CSS' },

    { label: 'GitHub', iconSrc: '/icons/github-142-svgrepo-com.svg', alt: 'GitHub' },
    { label: 'Markdown', iconSrc: '/icons/markdown-svgrepo-com.svg', alt: 'Markdown' },

    { label: 'Illustrator', iconSrc: '/icons/adobe-illustrator-svgrepo-com.svg', alt: 'Adobe Illustrator' },
    { label: 'Photoshop', iconSrc: '/icons/adobe-photoshop-svgrepo-com.svg', alt: 'Adobe Photoshop' },
    { label: 'Premiere Pro', iconSrc: '/icons/adobe-premiere-svgrepo-com.svg', alt: 'Adobe Premiere Pro' },
    { label: 'After Effects', iconSrc: '/icons/adobe-after-effects-svgrepo-com.svg', alt: 'Adobe After Effects' },

    { label: 'Linux', iconSrc: '/icons/linux-svgrepo-com.svg', alt: 'Linux' },
    { label: 'Trello', iconSrc: '/icons/trello-svgrepo-com.svg', alt: 'Trello' },
    { label: 'Mailchimp', iconSrc: '/icons/mailchimp-svgrepo-com (1).svg', alt: 'Mailchimp' }
  ];
</script>

<section style="padding-block: var(--spacing-section, var(--spacing-8));">
  <header style="margin-bottom: var(--spacing-6, 1.5rem); display: flex; flex-direction: column; gap: var(--spacing-2, 0.5rem);">
    <h2 style="
      color: var(--color-accent-500);
      font-size: var(--type-heading-size, 1.25rem);
      font-family: var(--heading-font-family, var(--type-heading-family));
      font-weight: var(--heading-font-weight, 700);
      letter-spacing: var(--heading-letter-spacing, -0.01em);
      line-height: var(--type-heading-leading, 1.1);
    ">Skills & Tools</h2>
    <p style="
      max-width: 40rem;
      color: var(--on-surface-muted, var(--color-surface-600));
      font-size: var(--type-body-size, 1rem);
      font-family: var(--base-font-family, var(--type-body-family));
      font-weight: var(--base-font-weight, 400);
      letter-spacing: var(--base-letter-spacing, 0em);
      line-height: var(--base-line-height, 1.5);
    ">
      The stack I use day-to-day across design systems, product UI, and content.
    </p>
  </header>

  <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-3, 0.75rem);">
    {#each skills as skill (skill.label)}
      <SkillBadge
        label={skill.label}
        icon={`<img src="${skill.iconSrc}" alt="${skill.alt ?? skill.label}" class="h-5 w-5" loading="lazy" />`}
      />
    {/each}
  </div>
</section>
