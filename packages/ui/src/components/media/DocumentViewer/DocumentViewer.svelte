<script lang="ts">
  export let src: string;
  export let type: 'pdf' | 'image' | 'auto' = 'auto';
  export let alt: string = 'Document preview';
  export let downloadLabel: string = 'Download';
  export let fallbackText: string = 'Preview not available';

  // Auto-detect type if needed
  $: resolvedType = type === 'auto'
    ? src.endsWith('.pdf')
      ? 'pdf'
      : src.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      ? 'image'
      : 'unknown'
    : type;
</script>

<div class="cl-doc-viewer">
  {#if resolvedType === 'pdf'}
    <iframe
      src={src}
      class="cl-doc-frame"
      title={alt}
      loading="lazy"
    ></iframe>
  {:else if resolvedType === 'image'}
    <img src={src} alt={alt} class="cl-doc-image" loading="lazy" />
  {:else}
    <p class="cl-doc-fallback">{fallbackText}</p>
  {/if}

  <a href={src} download class="cl-doc-download" target="_blank" rel="noopener noreferrer">
    {downloadLabel}
  </a>
</div>

<style>
  .cl-doc-viewer {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2, 0.5rem);
    border: 1px solid var(--border-default-color, #ccc);
    padding: var(--spacing-4, 1rem);
    border-radius: var(--radius-md, 0.375rem);
    background: var(--background-panel, #fff);
  }

  .cl-doc-frame {
    width: 100%;
    height: 400px;
    border: none;
  }

  .cl-doc-image {
    max-width: 100%;
    border-radius: var(--radius-sm, 0.25rem);
  }

  .cl-doc-fallback {
    color: var(--text-muted, #666);
    font-size: 0.875rem;
  }

  .cl-doc-download {
    font-size: 0.875rem;
    color: var(--color-primary-600, #3355aa);
    text-decoration: underline;
    align-self: flex-start;
  }
</style>
