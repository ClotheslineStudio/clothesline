<script lang="ts">
  import Gallery from '$lib/components/media/Gallery/Gallery.svelte';

  const images = [
    { src: 'https://placekitten.com/400/300', alt: 'Kitten 1' },
    { src: 'https://placekitten.com/401/300', alt: 'Kitten 2' },
    { src: 'https://placekitten.com/402/300', alt: 'Kitten 3' },
    { src: 'https://placekitten.com/403/300', alt: 'Kitten 4' },
    { src: 'https://placekitten.com/404/300', alt: 'Kitten 5' },
    { src: 'https://placekitten.com/405/300', alt: 'Kitten 6' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Gallery Component</h1>

<Gallery {images} />
