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

<section class="py-16 sm:py-20">
  <header class="mb-6 space-y-2">
    <h2 class="text-3xl font-bold text-(--color-accent-500) sm:text-4xl">Skills & Tools</h2>
    <p class="max-w-2xl text-sm sm:text-base text-(--color-surface-600)">
      The stack I use day-to-day across design systems, product UI, and content.
    </p>
  </header>

  <div class="flex flex-wrap gap-3">
    {#each skills as skill (skill.label)}
      <SkillBadge
        label={skill.label}
        icon={`<img src="${skill.iconSrc}" alt="${skill.alt ?? skill.label}" class="h-5 w-5" loading="lazy" />`}
      />
    {/each}
  </div>
</section>
