<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { gsap } from 'gsap';

  let activeCard = null;
  
    const projects = [
      {
        year: '2018',
        title: 'CIID: Leadership Team',
        summary: 'Led deliverables & stakeholder outreach for the CIID grant.',
        details: 'Collaborated with ED project officers, set milestones, represented CIID at national conferences.'
      },
      {
        year: '2021',
        title: 'Generate: Docs & GitHub',
        summary: 'Created the GitBook documentation system and stakeholder engagement strategies.',
        details: 'Set up GitHub templates, led Discord support, created Power BI-integrated workflows.'
      },
      {
        year: '2023',
        title: 'Resume Portfolio Site',
        summary: 'Built portfolio site with Svelte, Tailwind, and GSAP transitions.',
        details: 'Integrated 8-bit theme toggle, SEO & LLM optimization, responsive design, and Stripe scheduling.'
      }
    ];
  
    const expandCard = (index) => {
  activeCard = index === activeCard ? null : index;
};

  </script>
  
  <section class="min-h-screen py-16 px-4 transition-colors duration-300" style="color: var(--color-text); background-color: var(--color-bg);">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold" style="color: var(--color-accent)">Project Timeline</h1>
    </div>
  
    <div class="relative border-l-2 ml-4" style="border-color: var(--color-accent)">
      {#each projects as project, i}
        <div class="mb-12 ml-6">
          <button
            class="relative w-full text-left rounded-xl shadow-lg p-4 hover:scale-[1.01] transform transition-transform duration-300"
            style="background-color: var(--color-accent); color: var(--color-bg);"
            on:click={() => activeCard = activeCard === i ? null : i}
          >
            <h2 class="text-xl font-bold">{project.year} – {project.title}</h2>
            <p>{project.summary}</p>
          </button>
  
          {#if activeCard === i}
            <div
              class="mt-4 p-6 rounded-xl shadow-2xl transform origin-center animate-expand"
              style="background-color: var(--color-slateblue); color: var(--color-text);"
              transition:fade
            >
              <p class="text-lg">{project.details}</p>
              <button class="mt-4 underline" style="color: var(--color-accent);" on:click={() => activeCard = null}>Close</button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
  
<!--
    This Svelte component includes a CSS animation class `.animate-expand` 
    that applies a "zoom in" effect to an element. The animation is defined 
    using the `@keyframes zoomIn` rule.

    - `.animate-expand`:
        - Applies the `zoomIn` animation over 0.3 seconds with an ease timing function.
        - The animation runs forwards, meaning the element retains the final state of the animation.

    - `@keyframes zoomIn`:
        - Defines the animation steps:
            - At 0% (start): The element has 0 opacity, is scaled down to 95% of its size, 
                and is slightly translated along the Z-axis (-10px).
            - At 100% (end): The element becomes fully visible (opacity 1), 
                scales to its original size (scale 1), and resets the Z-axis translation (translateZ(0)).
-->
  <style>
    .animate-expand {
      animation: zoomIn 0.3s ease forwards;
    }
  
    @keyframes zoomIn {
      0% {
        opacity: 0;
        transform: scale(0.95) translateZ(-10px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateZ(0);
      }
    }
  </style>