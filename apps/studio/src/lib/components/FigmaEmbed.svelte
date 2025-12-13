<script lang="ts">
  export let url: string;             // public Figma file/link
  export let title = 'Figma design';  // accessible title
  // svelte-ignore export_let_unused
export let height = 600;            // default height in px
</script>

<div class="my-8 rounded-xl border border-(--color-surface-300) bg-(--color-bg) overflow-hidden">
  <div class="px-4 py-2 text-xs font-medium uppercase tracking-wide text-(--color-surface-600)">
    {title}
  </div>

  <div class="aspect-video w-full max-h-[80vh]">
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <iframe
      title={title}
      src={`https://www.figma.com/embed?embed_host=share&url=${encodeURI(url)}`}
      allowfullscreen
      loading="lazy"
      class="h-full w-full border-0"
    />
  </div>
</div>
