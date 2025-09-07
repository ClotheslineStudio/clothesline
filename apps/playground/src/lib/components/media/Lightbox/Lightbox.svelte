<script lang="ts">
  import { onMount } from 'svelte';

  export let items: string[] = []; // Array of image URLs or video URLs
  export let startIndex = 0;

  let current = startIndex;
  let open = false;

  function openLightbox(index: number) {
    current = index;
    open = true;
  }

  function closeLightbox() {
    open = false;
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
  }

  function next() {
    current = (current + 1) % items.length;
  }

  function handleKey(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  }

  onMount(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
</script>

<div class="cl-lightbox-thumbnails">
  {#each items as src, i}
    <button
      type="button"
      class="cl-thumb-btn"
      aria-label="Open lightbox"
      on:click={() => openLightbox(i)}
    >
      <img
        src={src}
        class="cl-thumb"
        alt="Thumbnail"
      />
    </button>
  {/each}
</div>

{#if open}
  <div
    class="cl-lightbox-overlay"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    on:click|self={closeLightbox}
    on:keydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        closeLightbox();
      }
    }}
  >
    <div class="cl-lightbox-content">
      <button class="cl-lightbox-close" on:click={closeLightbox}>×</button>
      <button class="cl-lightbox-prev" on:click={prev}>‹</button>
      <button class="cl-lightbox-next" on:click={next}>›</button>
      <img src={items[current]} alt="Lightbox" class="cl-lightbox-img" />
    </div>
  </div>
{/if}

<style>
  .cl-thumb-btn {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: var(--radius-sm);
    display: inline-block;
  }

  .cl-thumb {
    height: 4rem;
    border-radius: var(--radius-sm);
    object-fit: cover;
    display: block;
  }
  .cl-thumb {
    height: 4rem;
    cursor: pointer;
    border-radius: var(--radius-sm);
    object-fit: cover;
  }

  .cl-lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cl-lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cl-lightbox-img {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--radius-md);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }

  .cl-lightbox-close,
  .cl-lightbox-prev,
  .cl-lightbox-next {
    position: absolute;
    background: var(--background-panel, #fff);
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    opacity: 0.8;
  }

  .cl-lightbox-close {
    top: 1rem;
    right: 1rem;
  }

  .cl-lightbox-prev {
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .cl-lightbox-next {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
