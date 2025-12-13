<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { Linkedin, Github } from 'lucide-svelte';

  import { testimonials } from '$lib/content/testimonials';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    gsap.utils.toArray('.testimonial').forEach((el) => {
      gsap.from(el as HTMLElement, {
        scrollTrigger: {
          trigger: el as HTMLElement,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
</script>


<section class="mx-auto py-16 px-4 text-(--color-surface-900) max-w-7xl">
  <h1 class="text-4xl font-bold text-(--color-accent-500) mb-4">Testimonials</h1>
  <p class="text-lg text-(--color-surface-700) mb-10">
    Words from collaborators, clients, and colleagues.
  </p>

  <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {#each testimonials as t}
      <div class="testimonial p-6 bg-(--color-bg) border border-(--color-secondary-500) rounded-xl shadow-md transition hover:shadow-xl group">
        <!-- Profile + Logo Row -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-4">
            <img src={t.img} alt={t.author} class="w-12 h-12 rounded-full object-cover border border-(--color-slateblue)" />
            <div>
              <p class="font-semibold text-(--color-accent-500)">{t.author}</p>
              <div class="flex gap-2 mt-1">
                {#if t.linkedin}
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" class="text-(--color-surface-600) hover:text-(--color-primary-500) transition">
                    <Linkedin size="16" />
                  </a>
                {/if}
                {#if t.github}
                  <a href={t.github} target="_blank" rel="noopener noreferrer" class="text-(--color-surface-600) hover:text-(--color-primary-500) transition">
                    <Github size="16" />
                  </a>
                {/if}
              </div>
            </div>
          </div>
          {#if t.logo}
  <div class="bg-white p-2 rounded-full shadow-sm flex items-center justify-center h-10 w-10">
    <img src={t.logo} alt="Company logo" class="h-6 w-6 object-contain" />
  </div>
{/if}
        </div>

        <!-- Quote -->
        <p class="italic text-(--color-surface-900)">"{t.text}"</p>
      </div>
    {/each}
  </div>
</section> <!-- ✅ Close the section only once, outside the loop -->




  