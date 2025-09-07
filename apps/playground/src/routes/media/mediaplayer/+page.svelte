<script lang="ts">
  import MediaPlayer from '$lib/components/media/MediaPlayer/MediaPlayer.svelte';

  const videoSrc =
    'https://www.w3schools.com/html/mov_bbb.mp4';
  const audioSrc =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
</script>

<h1 class="text-2xl font-bold mb-4">MediaPlayer Component</h1>

<h2 class="text-lg font-semibold mt-4 mb-2">🎥 Video</h2>
<MediaPlayer type="video" src={videoSrc} poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg" />

<h2 class="text-lg font-semibold mt-8 mb-2">🎵 Audio</h2>
<MediaPlayer type="audio" src={audioSrc} />
