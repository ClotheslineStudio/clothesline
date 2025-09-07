<script lang="ts">
  import Popover from '$lib/components/overlays/Popover/Popover.svelte'; // singular "overlay"
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl = 'https://github.com/clotheslinestudio/ui/blob/main/src/components/overlays/Popover/Popover.svelte'; // adjust if you keep singular
  const codeDefault = `<Popover ariaLabel="Details">
  <button slot="trigger" class="btn">Open popover</button>
  <div style="max-width:24rem">
    <h4 class="text-lg font-semibold mb-2">Panel title</h4>
    <p class="text-sm opacity-80">Any content goes here — forms, text, actions.</p>
  </div>
</Popover>`;
</script>

<h1 class="text-2xl font-bold mb-4">Popover Component</h1>

<section class="space-y-10">
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Default</h2>
    <ComponentPreview {githubUrl} code={codeDefault}>
      <Popover ariaLabel="Details">
        <button slot="trigger" class="btn">Open popover</button>
        <div style="max-width:24rem">
          <h4 class="text-lg font-semibold mb-2">Panel title</h4>
          <p class="text-sm opacity-80">Any content goes here — forms, text, actions.</p>
        </div>
      </Popover>
    </ComponentPreview>
  </div>

  <!-- add your other variants (placements, align, no arrow, trapFocus) here as needed -->
</section>

