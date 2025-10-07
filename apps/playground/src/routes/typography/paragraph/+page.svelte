<script lang="ts">
  import { Paragraph } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/typography/Paragraph/Paragraph.svelte';

  const tones = ['default','muted','primary','success','warning','error','info'] as const;
  const aligns = ['start','center','end','justify'] as const;

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Paragraph Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl} code={`<Paragraph>Body paragraph text.</Paragraph>\n<Paragraph lead>Lead paragraph text.</Paragraph>`}>
      <div class="space-y-2">
        <Paragraph>Body paragraph text.</Paragraph>
        <Paragraph lead>Lead paragraph text.</Paragraph>
      </div>
    </ComponentPreview>
  </div>

  <!-- Tones -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Tones</h2>
    <ComponentPreview
      {githubUrl}
      code={tones.map(t => `<Paragraph tone="${t}">${t} tone paragraph</Paragraph>`).join('\n')}
    >
      <div class="space-y-1">
        {#each tones as t}
          <Paragraph tone={t}>{t} tone paragraph</Paragraph>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Alignment -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Alignment</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Paragraph align="start">start</Paragraph>\n<Paragraph align="center">center</Paragraph>\n<Paragraph align="end">end</Paragraph>\n<Paragraph align="justify">justify … long text …</Paragraph>`}
    >
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Paragraph align="start">start</Paragraph></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Paragraph align="center">center</Paragraph></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60"><Paragraph align="end">end</Paragraph></div>
        <div class="p-3 rounded-md border border-[color:var(--color-surface-300)]/60">
          <Paragraph align="justify">
            justify • The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
          </Paragraph>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Truncate & Clamp -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Truncate & Clamp</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Paragraph truncate style="max-width: 280px;">Very long single line that will truncate with an ellipsis when space runs out.</Paragraph>\n<Paragraph clamp={3} style="max-width: 320px;">Multi-line clamp example. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus, orci eu vehicula tempus, mauris lectus fermentum libero, vitae suscipit nunc velit non ipsum.</Paragraph>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <div style="max-width: 280px;">
          <Paragraph truncate>Very long single line that will truncate with an ellipsis when space runs out.</Paragraph>
        </div>
        <div style="max-width: 320px;">
          <Paragraph clamp={3}>
            Multi-line clamp example. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus, orci eu vehicula tempus, mauris lectus fermentum libero, vitae suscipit nunc velit non ipsum.
          </Paragraph>
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Mixed sample -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Mixed Sample</h2>
    <ComponentPreview
      {githubUrl}
      code={`<Paragraph lead tone="muted">Lead paragraph introducing a section.</Paragraph>\n<Paragraph>Normal body paragraph following the lead.</Paragraph>`}
    >
      <div class="space-y-1">
        <Paragraph lead tone="muted">Lead paragraph introducing a section.</Paragraph>
        <Paragraph>Normal body paragraph following the lead.</Paragraph>
      </div>
    </ComponentPreview>
  </div>
</section>
