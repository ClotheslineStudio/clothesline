<script>
// @ts-nocheck

  import Hero from '../lib/components/home/Hero.svelte';
  import About from '../lib/components/home/About.svelte';
  import Skills from '../lib/components/home/Skills.svelte';

  import { Timeline, TimelineItem, TimelineCard, TimelineNode } from '@clothesline/ui';
  import Testimonials from '../lib/components/home/Testimonials.svelte';
  import BlogPreview from '../lib/components/home/BlogPreview.svelte';
  import CallToAction from '../lib/components/home/CallToAction.svelte';

  export let data; // receives { recentPosts } from +page.ts
</script>

<main>
  <Hero />
  <About />
  <Skills />

  <section class="mt-20">
    <h2 class="text-2xl font-semibold text-(--color-accent) mb-8">🎓 Federal Education Projects</h2>
    <Timeline>
      {#each [
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
      ] as project, i}
        <TimelineItem status="complete">
          <svelte:fragment slot="node">
            <TimelineNode label={project.year} />
          </svelte:fragment>
          <svelte:fragment slot="card">
            <TimelineCard>
              <span slot="header">{project.title}</span>
              <span>{project.summary}</span>
              <span slot="footer">{project.details}</span>
            </TimelineCard>
          </svelte:fragment>
        </TimelineItem>
      {/each}
    </Timeline>
  </section>

  <Testimonials />

  <!-- Pass the data into BlogPreview -->
  <BlogPreview posts={data.recentPosts.filter(post => typeof post.slug === 'string')} />

  <CallToAction />
</main>

