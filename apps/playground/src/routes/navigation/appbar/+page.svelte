<script lang="ts">
  import { AppBar } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';
  import { Menu, Search, Bell, User, Sparkles } from 'lucide-svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/navigation/AppBar/AppBar.svelte';

  const densities = ['sm', 'md', 'lg'] as const;
</script>

<h1 class="text-2xl font-bold mb-4">AppBar Component</h1>

<section class="space-y-10">
  <!-- Basic -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Basic</h2>
    <ComponentPreview {githubUrl}
      code={`<AppBar sticky elevated>\n  <div slot="left"><strong>Clothesline</strong></div>\n  <div slot="center">Dashboard</div>\n  <div slot="right"><button>Sign in</button></div>\n</AppBar>`}
    >
      <AppBar sticky elevated>
        <div slot="left" class="flex items-center gap-2">
          <Menu size={18} />
          <strong>Clothesline</strong>
        </div>
        <div slot="center">Dashboard</div>
        <div slot="right" class="flex items-center gap-2">
          <button class="btn-icon" aria-label="Search"><Search size={16} /></button>
          <button class="btn-icon" aria-label="Notifications"><Bell size={16} /></button>
          <button class="btn"><User size={16} /> <span class="ml-1">Sign in</span></button>
        </div>
      </AppBar>
    </ComponentPreview>
  </div>

  <!-- Densities -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Density</h2>
    <ComponentPreview {githubUrl}
      code={densities.map(d => `<AppBar density="${d}"><div slot="left">density=${d}</div></AppBar>`).join('\\n')}
    >
      <div class="flex flex-col gap-3">
        {#each densities as d}
          <AppBar density={d}>
            <div slot="left">density={d}</div>
            <div slot="center"></div>
            <div slot="right"><button class="btn">Action</button></div>
          </AppBar>
        {/each}
      </div>
    </ComponentPreview>
  </div>

  <!-- Borders, elevation, glass -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Border • Elevated • Glass</h2>
    <ComponentPreview {githubUrl}
      code={`<AppBar border elevated sticky>Border + shadow</AppBar>\n<AppBar glass sticky>Glass blur</AppBar>`}
    >
      <div class="flex flex-col gap-3">
        <AppBar border elevated sticky>
          <div slot="left"><strong>Border + shadow</strong></div>
          <div slot="right"><button class="btn">Action</button></div>
        </AppBar>

        <AppBar glass sticky>
          <div slot="left"><Sparkles size={16} /> Glass blur</div>
          <div slot="right"><button class="btn">Action</button></div>
        </AppBar>
      </div>
    </ComponentPreview>
  </div>

  <!-- Wrap vs horizontal scroll -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Wrap vs Scroll</h2>
    <ComponentPreview {githubUrl}
      code={`<AppBar wrap={false} scrollOverflow>\n  <!-- many items on right -->\n</AppBar>`}
    >
      <AppBar>
        <div slot="left" class="flex items-center gap-2">
          <strong>Long actions</strong>
        </div>
        <div slot="center">Center stays centered</div>
        <div slot="right" class="flex items-center gap-2">
          {#each Array(12) as _, i}
            <button class="btn">Item {i + 1}</button>
          {/each}
        </div>
      </AppBar>
    </ComponentPreview>
  </div>

  <!-- Subbar (tabs / filters) -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Subbar</h2>
    <ComponentPreview {githubUrl}
      code={`<AppBar>\n  <div slot="left">Project</div>\n  <div slot="subbar">Tab One · Tab Two · Tab Three</div>\n</AppBar>`}
    >
      <AppBar>
        <div slot="left" class="flex items-center gap-2"><strong>Project Alpha</strong></div>
        <div slot="right" class="flex items-center gap-2"><button class="btn">New</button></div>
        <div slot="subbar" class="flex gap-4">
          <a class="tab active" href="#">Overview</a>
          <a class="tab" href="javascript:void(0);">Tokens</a>
          <a class="tab" href="#">Components</a>
          <a class="tab" href="#">Themes</a>
        </div>
      </AppBar>
    </ComponentPreview>
  </div>

  <!-- Semantic variants -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Semantic Variants</h2>
    <ComponentPreview {githubUrl}
      code={`<AppBar as="div" roleAttr="toolbar" ariaLabel="Formatting toolbar">…</AppBar>`}
    >
      <AppBar as="div" roleAttr="toolbar" ariaLabel="Formatting toolbar" density="sm">
        <div slot="left" class="flex gap-2">
          <button class="btn">B</button><button class="btn">I</button><button class="btn">U</button>
        </div>
        <div slot="center">Toolbar</div>
        <div slot="right" class="flex gap-2">
          <button class="btn">Undo</button><button class="btn">Redo</button>
        </div>
      </AppBar>
    </ComponentPreview>
  </div>
</section>

<style>
  /* Tiny helper styles for demo buttons/tabs (use your kit buttons if available) */
  .btn, .btn-icon {
    display: inline-flex; align-items: center; justify-content: center;
    padding: .375rem .6rem; border-radius: .5rem; border: 1px solid var(--color-surface-300);
    background: color-mix(in oklab, var(--color-surface-100) 80%, transparent);
    color: var(--base-font-color);
    transition: background .15s ease, border-color .15s ease;
    font-size: .875rem;
  }
  .btn:hover, .btn-icon:hover { background: color-mix(in oklab, var(--base-font-color) 8%, transparent); }
  .btn-icon { width: 32px; height: 32px; padding: .25rem; }

  :global(html[data-mode="dark"]) .btn,
  :global(html[data-mode="dark"]) .btn-icon {
    border-color: var(--color-surface-700);
    background: color-mix(in oklab, var(--color-surface-900) 85%, transparent);
    color: var(--base-font-color-dark);
  }

  .tab {
    padding: .35rem .5rem; border-radius: .5rem;
    color: var(--text-muted);
    border: 1px solid transparent;
  }
  .tab.active { color: var(--base-font-color); border-color: var(--color-surface-300); }
  :global(html[data-mode="dark"]) .tab.active { border-color: var(--color-surface-700); }
</style>
