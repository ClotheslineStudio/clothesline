<script lang="ts">
  import AudioPlayer from '$lib/components/media/AudioPlayer/AudioPlayer.svelte';

  const sampleAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
</script>

<h1 class="text-2xl font-bold mb-4">AudioPlayer Component</h1>

<div class="space-y-4">

  <!-- Basic audio player -->
  <AudioPlayer src={sampleAudio} />

  <!-- Looping muted autoplay -->
  <AudioPlayer
    src={sampleAudio}
    autoplay={true}
    loop={true}
    muted={true}
  />

</div>
