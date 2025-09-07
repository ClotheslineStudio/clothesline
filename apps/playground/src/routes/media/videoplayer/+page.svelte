<script lang="ts">
  import VideoPlayer from '$lib/components/media/VideoPlayer/VideoPlayer.svelte';

  const sampleVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';
</script>

<h1 class="text-2xl font-bold mb-4">🎬 VideoPlayer Demo</h1>

<VideoPlayer
  src={sampleVideo}
  type="video/mp4"
  controls
  autoplay={false}
  loop={false}
  muted={false}
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
/>
