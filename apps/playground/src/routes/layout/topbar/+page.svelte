<script lang="ts">
  import Topbar from '$lib/components/layout/Topbar/Topbar.svelte';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl = 'https://github.com/clotheslinestudio/ui/blob/main/src/components/layout/Topbar/Topbar.svelte';
  const densities: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

  // helpers for code previews
  const codeDefault = `<Topbar>
  <div slot="left">Breadcrumbs · Page Title</div>
  <div slot="center">[ Tabs ]</div>
  <div slot="right">[ Filters ] [ Actions ]</div>
</Topbar>`;

  const codeStickyGlass = `<Topbar sticky glass density="sm">
  <div slot="left">Page · Context</div>
  <div slot="center">[ Segments ]</div>
  <div slot="right">[ Date ] [ Export ]</div>
  <div slot="subbar">Secondary filters or summary</div>
</Topbar>`;

  const codeDensity = (d: 'sm' | 'md' | 'lg') => `<Topbar density="${d}">
  <div slot="left">Title (${d})</div>
  <div slot="center">[ Tabs ]</div>
  <div slot="right">[ Actions ]</div>
</Topbar>`;

  const codeScrollVsWrap = `<Topbar density="sm" wrap={false} scrollOverflow={true}>
  <div slot="left">Very long title that won’t wrap easily</div>
  <div slot="center">[ Tab A ] [ Tab B ] [ Tab C ] [ Tab D ] [ Tab E ]</div>
  <div slot="right">[ Filter 1 ] [ Filter 2 ] [ Apply ]</div>
</Topbar>`;
</script>

<h1 class="text-2xl font-bold mb-4">Topbar Component</h1>

<section class="space-y-10">

  <!-- Default -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Default</h2>
    <ComponentPreview
      githubUrl={githubUrl}
      code={codeDefault}
    >
      <Topbar>
        <div slot="left">Breadcrumbs · <strong>Customers</strong></div>
        <div slot="center">[ Tabs ]</div>
        <div slot="right">[ Filters ] [ Actions ]</div>
      </Topbar>
    </ComponentPreview>
  </div>

  <!-- Sticky + Glass -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sticky + Glass</h2>
    <ComponentPreview
      githubUrl={githubUrl}
      code={codeStickyGlass}
    >
      <div style="height: 240px; overflow:auto; border: 1px solid var(--border-default-color, #ddd); border-radius: 0.5rem;">
        <Topbar sticky glass density="sm">
          <div slot="left">Orders · Q3</div>
          <div slot="center">[ Segments ]</div>
          <div slot="right">[ Date ] [ Export ]</div>
          <div slot="subbar">Showing last 30 days · 124 results</div>
        </Topbar>

        <!-- scroll content to demonstrate sticky -->
        <div style="padding: 1rem">
          {#each Array(20) as _, i}
            <p style="opacity: 0.9">Scrollable content line {i + 1}</p>
          {/each}
        </div>
      </div>
    </ComponentPreview>
  </div>

  <!-- Densities -->
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">Density</h2>
    {#each densities as d}
      <ComponentPreview
        githubUrl={githubUrl}
        code={codeDensity(d)}
      >
        <Topbar density={d}>
          <div slot="left"><strong>Topbar</strong> · {d.toUpperCase()}</div>
          <div slot="center">[ Overview ] [ Activity ] [ Usage ]</div>
          <div slot="right">[ Invite ] [ Settings ]</div>
        </Topbar>
      </ComponentPreview>
    {/each}
  </div>

  <!-- Wrap vs Scroll -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Wrap vs Horizontal Scroll</h2>
    <ComponentPreview
      githubUrl={githubUrl}
      code={codeScrollVsWrap}
    >
      <!-- turn off wrapping, enable horizontal scroll -->
      <Topbar density="sm" wrap={false} scrollOverflow={true}>
        <div slot="left">Very long section title that will overflow</div>
        <div slot="center">[ Tab A ] [ Tab B ] [ Tab C ] [ Tab D ] [ Tab E ] [ Tab F ]</div>
        <div slot="right">[ Filter 1 ] [ Filter 2 ] [ Apply ]</div>
      </Topbar>
    </ComponentPreview>
    <p class="text-sm opacity-70">Tip: set <code>wrap</code> to <code>true</code> (default) to allow the Topbar to flow to two lines instead.</p>
  </div>

</section>
