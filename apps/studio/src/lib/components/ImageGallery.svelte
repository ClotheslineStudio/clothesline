<script context="module" lang="ts">
  export interface Image {
    src: string;
    alt?: string;
    caption?: string;
  }
</script>

<script lang="ts">
  export let images: Image[] = [];
</script>

<div class="image-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
  {#each images as img}
    <figure class="rounded-xl overflow-hidden shadow bg-surface">
      <img src={img.src} alt={img.alt} class="w-full h-56 object-cover" />
      {#if img.caption}
        <figcaption class="p-2 text-on-surface-muted text-sm">{img.caption}</figcaption>
      {/if}
    </figure>
  {/each}
</div>
