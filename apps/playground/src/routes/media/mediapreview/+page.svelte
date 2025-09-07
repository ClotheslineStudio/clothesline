<script lang="ts">
  import MediaPreview from '$lib/components/media/MediaPreview/MediaPreview.svelte';

  type MediaType = "video" | "audio" | "image" | "document" | "unknown";
  interface Sample {
    src: string;
    label: string;
    type: MediaType;
  }

  const samples: Sample[] = [
    {
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      label: 'Sample Video',
      type: 'video'
    },
    {
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      label: 'Sample Audio',
      type: 'audio'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
      label: 'Sample Image',
      type: 'image'
    },
    {
      src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      label: 'Sample PDF Document',
      type: 'document'
    },
    {
      src: 'https://example.com/unknownfile.xyz',
      label: 'Unknown File Type',
      type: 'unknown'
    }
  ];
</script>

<h1 class="text-2xl font-bold mb-6">🖼 MediaPreview Component Demo</h1>

<div class="grid gap-6">
  {#each samples as item}
    <MediaPreview {...item} />
  {/each}
</div>
