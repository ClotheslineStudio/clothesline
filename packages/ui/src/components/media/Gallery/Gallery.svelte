<script lang="ts">
  export let images: { src: string; alt?: string }[] = [];
  let activeIndex: number | null = null;

  const open = (index: number) => (activeIndex = index);
  const close = () => (activeIndex = null);
  const next = () => activeIndex !== null && (activeIndex = (activeIndex + 1) % images.length);
  const prev = () => activeIndex !== null && (activeIndex = (activeIndex - 1 + images.length) % images.length);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
</script>

<div class="cl-gallery">
  {#each images as img, i}
    <button class="cl-gallery-item" on:click={() => open(i)} aria-label="Open image preview">
      <img src={img.src} alt={img.alt || ''} loading="lazy" />
    </button>
  {/each}
</div>

{#if activeIndex !== null}
  <div class="cl-gallery-overlay" on:keydown={handleKeydown} role="dialog" aria-modal="true" tabindex="0">
    <div class="cl-gallery-modal">
      <button class="cl-gallery-close" on:click={close}>✕</button>
      <img src={images[activeIndex].src} alt={images[activeIndex].alt || ''} />
      <button class="cl-gallery-prev" on:click={prev}>‹</button>
      <button class="cl-gallery-next" on:click={next}>›</button>
    </div>
  </div>
{/if}

<style>
  .cl-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--spacing-2, 0.5rem);
  }

  .cl-gallery-item {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .cl-gallery-item img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-sm, 0.25rem);
    object-fit: cover;
  }

  .cl-gallery-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cl-gallery-modal {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
  }

  .cl-gallery-modal img {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--radius-md, 0.375rem);
  }

  .cl-gallery-close,
  .cl-gallery-prev,
  .cl-gallery-next {
    position: absolute;
    top: 1rem;
    background: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }

  .cl-gallery-close {
    right: 1rem;
  }

  .cl-gallery-prev {
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .cl-gallery-next {
    right: -2rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
