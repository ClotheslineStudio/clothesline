<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import swipe from 'svelte-gestures/swipe';
  import { Card } from '@clothesline/ui';

  type Challenge = { title: string; solution: string };

  type Project = {
    title: string;
    org?: string;
    timeframe?: string;
    summary: string;
    role: string[];
    tools: string[];
    challenges: Challenge[];
    outcomes: string[];
    links?: Array<{ label: string; href: string }>;
  };

  const sectionKeys = ['summary', 'role', 'tools', 'challenges', 'outcomes'] as const;
  type SectionKey = (typeof sectionKeys)[number];

  let activeProjectIndex = 0;
  let activeSectionIndex = 0;
  let cardEl: HTMLDivElement = null;

  let prefersReducedMotion = false;

  const projects: Project[] = [
    {
      title: 'G3 Drupal Website',
      org: 'AEM (Generate Governance Group)',
      timeframe: 'Selected work',
      summary: 'Led development of a standalone site for the Generate Governance Group and migrated legacy content.',
      role: [
        'Primary point of contact for Drupal site build',
        'Designed G3 logo and deck template',
        'Migrated content from Communities360'
      ],
      tools: ['Drupal', 'Illustrator', 'PowerPoint', 'GitHub', 'Communities360'],
      challenges: [
        { title: 'Inflexible legacy platform', solution: 'Moved to Drupal with a simpler, maintainable site structure.' },
        { title: 'No visual identity', solution: 'Created a modern logo and reusable branding assets.' }
      ],
      outcomes: [
        'Delivered a standalone branded site',
        'Improved access to governance content',
        'Enabled more consistent stakeholder engagement'
      ]
    }
    // Add more projects…
  ];

  function animateSwap(direction: 'next' | 'prev', onDone: () => void) {
    if (!cardEl || prefersReducedMotion) {
      onDone();
      return;
    }

    const outX = direction === 'next' ? -80 : 80;
    const inX = direction === 'next' ? 80 : -80;

    gsap.to(cardEl, {
      x: outX,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.out',
      onComplete: () => {
        onDone();
        gsap.fromTo(
          cardEl,
          { x: inX, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }
        );
      }
    });
  }

  function nextSection() {
    animateSwap('next', () => {
      activeSectionIndex = (activeSectionIndex + 1) % sectionKeys.length;
    });
  }

  function prevSection() {
    animateSwap('prev', () => {
      activeSectionIndex = (activeSectionIndex - 1 + sectionKeys.length) % sectionKeys.length;
    });
  }

  function switchProject(index: number) {
    if (index === activeProjectIndex) return;
    activeProjectIndex = index;
    activeSectionIndex = 0;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') nextSection();
    if (e.key === 'ArrowLeft') prevSection();
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  });

  $: activeProject = projects[activeProjectIndex];
  $: activeKey = sectionKeys[activeSectionIndex] as SectionKey;

  const sectionLabels: Record<SectionKey, string> = {
    summary: 'Summary',
    role: 'My role',
    tools: 'Tools',
    challenges: 'Challenges',
    outcomes: 'Outcomes'
  };
</script>

<section class="mx-auto max-w-4xl px-6 py-12">
  <header class="mb-6 space-y-2">
    <h2 class="text-2xl font-bold text-(--color-accent)">Selected Work (AEM)</h2>
    <p class="text-sm text-slate-500 dark:text-slate-300">
      Swipe, click, or use ←/→ to browse what I built and what changed as a result.
    </p>
  </header>

  <!-- Project Tabs -->
  <div class="mb-6 flex flex-wrap gap-2">
    {#each projects as project, i}
      <button
        type="button"
        on:click={() => switchProject(i)}
        class="rounded-md border px-3 py-2 text-sm font-semibold transition
          border-slate-600/30
          bg-slate-900/60 text-white
          hover:bg-slate-900/80
          focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
        class:bg-[var(--color-accent)]={activeProjectIndex === i}
        class:text-white={activeProjectIndex === i}
        aria-current={activeProjectIndex === i ? 'true' : undefined}
      >
        {project.title}
      </button>
    {/each}
  </div>

  <!-- Card -->
  <Card
    as="section"
    bind:this={cardEl}
    use:swipe
    on:swipe={({ detail }: { detail: { direction: 'LEFT' | 'RIGHT' } }) => {
      if (detail.direction === 'LEFT') nextSection();
      if (detail.direction === 'RIGHT') prevSection();
    }}
    role="group"
    aria-label="Portfolio project details"
    tone="surface"
    padding="lg"
    shadow="lg"
    rounded={true}
    border={true}
    className="outline-none transition"
  >
    <div class="mb-4 space-y-1">
      <h3 class="text-2xl font-bold text-orange-400">{activeProject.title}</h3>
      {#if activeProject.org || activeProject.timeframe}
        <p class="text-sm text-slate-300">
          {#if activeProject.org}{activeProject.org}{/if}
          {#if activeProject.org && activeProject.timeframe} • {/if}
          {#if activeProject.timeframe}{activeProject.timeframe}{/if}
        </p>
      {/if}
    </div>

    <div class="mb-4 flex flex-wrap gap-2 text-xs">
      {#each sectionKeys as key, i}
        <span
          class="rounded-full px-3 py-1"
          class:bg-slate-800={i !== activeSectionIndex}
          class:bg-orange-500={i === activeSectionIndex}
        >
          {sectionLabels[key]}
        </span>
      {/each}
    </div>

    {#if activeKey === 'summary'}
      <p class="text-lg italic text-slate-300">{activeProject.summary}</p>

    {:else if activeKey === 'role'}
      <div>
        <h4 class="mb-2 text-lg font-semibold">My role</h4>
        <ul class="list-disc list-inside text-slate-200">
          {#each activeProject.role as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>

    {:else if activeKey === 'tools'}
      <div>
        <h4 class="mb-2 text-lg font-semibold">Tools & tech</h4>
        <div class="flex flex-wrap gap-2">
          {#each activeProject.tools as tool}
            <span class="rounded-full bg-slate-800 px-3 py-1 text-sm">{tool}</span>
          {/each}
        </div>
      </div>

    {:else if activeKey === 'challenges'}
      <div>
        <h4 class="mb-2 text-lg font-semibold">Challenges & solutions</h4>
        <ul class="space-y-3 text-slate-200">
          {#each activeProject.challenges as ch}
            <li class="rounded-lg bg-slate-900/40 p-3">
              <div class="font-semibold">{ch.title}</div>
              <div class="text-sm text-slate-300">
                <span class="font-medium text-slate-200">Solution:</span> {ch.solution}
              </div>
            </li>
          {/each}
        </ul>
      </div>

    {:else if activeKey === 'outcomes'}
      <div>
        <h4 class="mb-2 text-lg font-semibold">Outcomes & impact</h4>
        <ul class="list-disc list-inside text-slate-200">
          {#each activeProject.outcomes as o}
            <li>{o}</li>
          {/each}
        </ul>
      </div>
    {/if}

  <!-- Nav Buttons -->
  <div class="mt-6 flex justify-between gap-3">
    <button
      type="button"
      on:click={prevSection}
      class="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600
        focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
    >
      ← Back
    </button>
    <button
      type="button"
      on:click={nextSection}
      class="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600
        focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
    >
      Next →
    </button>
  </div>
  </Card>
</section>
