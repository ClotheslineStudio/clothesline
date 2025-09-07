<script lang="ts">
  export let src: string;
  export let type: 'image' | 'video' | 'audio' | 'document' | 'unknown' = 'image';
  export let alt: string = '';
  export let label: string | null = null;

  // File extension fallback logic (if `type` is not passed)
  const extension = src.split('.').pop()?.toLowerCase();
  const isPdf = extension === 'pdf';
  const isDoc = ['doc', 'docx'].includes(extension || '');
  const isSpreadsheet = ['xls', 'xlsx', 'csv'].includes(extension || '');

  $: inferredType =
    type !== 'unknown'
      ? type
      : isPdf || isDoc || isSpreadsheet
      ? 'document'
      : extension?.match(/(jpg|jpeg|png|gif|webp|svg)/)
      ? 'image'
      : extension?.match(/(mp4|webm|ogg)/)
      ? 'video'
      : extension?.match(/(mp3|wav|m4a)/)
      ? 'audio'
      : 'unknown';
</script>

<div class="cl-media-preview">
  {#if inferredType === 'image'}
    <img src={src} alt={alt} />
  {:else if inferredType === 'video'}
    <video src={src} controls>
      <track kind="captions" label="Captions" />
    </video>
  {:else if inferredType === 'audio'}
    <audio src={src} controls></audio>
  {:else if inferredType === 'document'}
    <iframe src={src} title={alt || 'Document preview'}></iframe>
  {:else}
    <div class="cl-media-preview-unknown">
      <span>📄</span>
      <p>Unsupported file type</p>
    </div>
  {/if}

  {#if label}
    <div class="cl-label">{label}</div>
  {/if}
</div>

<style>
  .cl-media-preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--background-muted, #f0f0f0);
    border: 1px solid var(--border-default-color, #ccc);
    padding: 1rem;
    border-radius: var(--radius-md);
    max-width: 100%;
  }

  img,
  video,
  iframe {
    max-width: 100%;
    border-radius: var(--radius-sm);
  }

  audio {
    width: 100%;
  }

  .cl-media-preview-unknown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .cl-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: center;
  }
</style>
