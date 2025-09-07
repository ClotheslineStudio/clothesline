<script lang="ts">
  import Lightbox from '$lib/components/media/Lightbox/Lightbox.svelte';

  const images = [
    'https://images.unsplash.com/photo-1716446077482-b27b427d024b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1717603392196-e63dc917b1b5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1717067833102-3bb7fcfb91be?auto=format&fit=crop&w=1200&q=80'
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Lightbox Component</h1>

<Lightbox items={images} />
