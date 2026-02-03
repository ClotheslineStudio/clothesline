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


  <Testimonials />

  <!-- Pass the data into BlogPreview -->
  <BlogPreview posts={data.recentPosts.filter(post => typeof post.slug === 'string')} />

  <CallToAction />
</main>

