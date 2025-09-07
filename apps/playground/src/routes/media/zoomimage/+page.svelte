<script lang="ts">
  import ZoomImage from '$lib/components/media/ZoomImage/ZoomImage.svelte';

  const imageUrl =
    'https://images.unsplash.com/photo-1601758174682-71861c78f62b?auto=format&fit=crop&w=1600&q=80';
</script>

<h1 class="text-2xl font-bold mb-4">🖼️ ZoomImage Demo</h1>

<ZoomImage src={imageUrl} alt="Mountain lake view" />
