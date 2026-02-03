<script lang="ts">
  export let src: string;
  export let type: 'audio' | 'video' = 'video';
  export let poster: string | null = null;
  let playerEl: HTMLMediaElement;

  let isPlaying = false;
  let progress = 0;
  let volume = 1;

  function togglePlay() {
    if (playerEl.paused) {
      playerEl.play();
      isPlaying = true;
    } else {
      playerEl.pause();
      isPlaying = false;
    }
  }

  function updateProgress() {
    if (playerEl?.duration) {
      progress = (playerEl.currentTime / playerEl.duration) * 100;
    }
  }
  function seek(event: Event) {
    const input = event.target as HTMLInputElement;
    if (playerEl?.duration) {
      playerEl.currentTime = (parseFloat(input.value) / 100) * playerEl.duration;
    }
  }

  // Sync local volume variable with player element when available
  $: if (playerEl && playerEl.volume !== volume) {
    playerEl.volume = volume;
  }
  // Update local volume if player element changes (e.g., on mount)
  $: if (playerEl && volume !== playerEl.volume) {
    volume = playerEl.volume;
  }
</script>

<div class="cl-media-player">
  {#if type === 'video'}
    <video
      bind:this={playerEl}
      src={src}
      poster={poster}
      controls={false}
      on:timeupdate={updateProgress}
      on:ended={() => (isPlaying = false)}
    >
      <track kind="captions" label="Captions" src="" srclang="en" default />
    </video>
  {:else}
    <audio
      bind:this={playerEl}
      src={src}
      controls={false}
      on:timeupdate={updateProgress}
      on:ended={() => (isPlaying = false)}
    ></audio>
  {/if}

  <div class="cl-controls">
    <button on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
      {#if isPlaying}⏸️{:else}▶️{/if}
    </button>

    <input type="range" min="0" max="100" value={progress} on:input={seek} aria-label="Seek" />

    <input type="range" min="0" max="1" step="0.01" bind:value={volume} aria-label="Volume" />
  </div>
</div>

<style>
  .cl-media-player {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--background-panel, #f8f8f8);
    border: 1px solid var(--border-default-color, #ccc);
    border-radius: var(--radius-md);
    padding: 1rem;
    max-width: 100%;
  }

  video,
  audio {
    width: 100%;
    border-radius: var(--radius-sm);
  }

  .cl-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  input[type="range"] {
    flex: 1;
  }
</style>
