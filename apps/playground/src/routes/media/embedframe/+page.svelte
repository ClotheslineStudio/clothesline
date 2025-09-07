<script lang="ts">
  import EmbedFrame from '$lib/components/media/EmbedFrame/EmbedFrame.svelte';

  const figmaEmbed = 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/Sca5BlFNjDsfHoB1XENZAz/Example';
  const codepenEmbed = 'https://codepen.io/team/codepen/embed/preview/PNaGbb?default-tab=result';
  const loomEmbed = 'https://www.loom.com/embed/0fabc1234567890a9876543210abcdef';
  const trelloEmbed = 'https://trello.com/b/abc123/embed';
  const genericEmbed = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
</script>

<h1 class="text-2xl font-bold mb-4">EmbedFrame Component</h1>

<section class="space-y-8">

  <div>
    <h2 class="text-lg font-semibold mb-2">Figma</h2>
    <EmbedFrame provider="figma" src={figmaEmbed} title="Figma File" />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">CodePen</h2>
    <EmbedFrame provider="codepen" src={codepenEmbed} title="CodePen Demo" />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Loom</h2>
    <EmbedFrame provider="loom" src={loomEmbed} title="Loom Video" aspectRatio="4 / 3" />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Trello</h2>
    <EmbedFrame provider="trello" src={trelloEmbed} title="Trello Board" border={false} />
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-2">Generic (YouTube)</h2>
    <EmbedFrame src={genericEmbed} title="YouTube Video" aspectRatio="16 / 9" />
  </div>

</section>
