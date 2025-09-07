<script lang="ts">
  import Image from '$lib/components/media/Image/Image.svelte';

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1716446077482-b27b427d024b?auto=format&fit=crop&w=1200&q=80',
      alt: 'A shark swims through the deep blue ocean'
    },
    {
      src: 'https://images.unsplash.com/photo-1717603392196-e63dc917b1b5?auto=format&fit=crop&w=1200&q=80',
      alt: 'A tree grows on a log in the water'
    },
    {
      src: 'https://images.unsplash.com/photo-1717067833102-3bb7fcfb91be?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Milky Way shines over a dark forest'
    }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Image Component</h1>

<div class="grid gap-6">
  {#each images as img}
    <Image src={img.src} alt={img.alt} width="100%" height="auto" objectFit="cover" />
  {/each}
</div>


