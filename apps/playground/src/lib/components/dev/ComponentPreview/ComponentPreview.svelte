<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';
  import Tooltip from '$lib/components/feedback/Tooltip/Tooltip.svelte';
  import { Github, Laptop, Tablet, Smartphone, Sun, Moon, Clipboard } from 'lucide-svelte';

  export let title: string = '';
  export let code = '';
  export const language: 'svelte' | 'ts' | 'html' | 'css' = 'svelte';
  export let githubUrl = '';
  export let startTab: 'preview' | 'code' = 'preview';

  let tab: 'preview' | 'code' = startTab;
  let viewport: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  let alignment: 'left' | 'center' | 'right' = 'center';
  let mode: 'light' | 'dark' = 'light';

  onMount(() => {
    if (!browser) return;
    const m = document.documentElement.getAttribute('data-mode');
    mode = (m === 'dark' || m === 'light') ? (m as any) : 'light';
  });

  function toggleMode() {
    if (!browser) return;
    mode = mode === 'light' ? 'dark' : 'light';
    const html = document.documentElement;
    const theme = html.getAttribute('data-theme') || 'clothesline';
    const va = html.getAttribute('data-vision');
    const allowed = ['protanopia','deuteranopia','tritanopia','monochromacy'] as const;
    const vision = (allowed as readonly string[]).includes(va || '') ? (va as any) : undefined;
    setTheme({ theme, mode, vision });
  }

  async function copyCode() {
    if (!browser || !code) return;
    try { await navigator.clipboard.writeText(code); } catch {}
  }

  const viewportClasses = {
    desktop: 'w-full max-w-[960px]',
    tablet: 'w-[680px]',
    mobile: 'w-[380px]'
  } as const;

  $: justify =
    alignment === 'left' ? 'justify-start' :
    alignment === 'right' ? 'justify-end' : 'justify-center';
</script>

<div class="pg">
  <div class="pg__hdr">
    <!-- Left -->
    <div class="pg__hdr-left">
      {#if title}<div class="pg__title">{title}</div>{/if}
      {#if githubUrl}
        <Tooltip text="Open on GitHub" position="bottom">
          <a class="btn icon" href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
        </Tooltip>
      {/if}
    </div>

    <!-- Center -->
    <div class="pg__hdr-center">
      <div class="seg">
        <button class:active={viewport==='desktop'} on:click={() => viewport='desktop'} aria-label="Desktop"><Laptop size={14}/></button>
        <button class:active={viewport==='tablet'}  on:click={() => viewport='tablet'}  aria-label="Tablet"><Tablet size={14}/></button>
        <button class:active={viewport==='mobile'}  on:click={() => viewport='mobile'}  aria-label="Mobile"><Smartphone size={14}/></button>
      </div>
      <div class="seg">
        <button class:active={alignment==='left'}   on:click={() => alignment='left'}   aria-label="Align left">L</button>
        <button class:active={alignment==='center'} on:click={() => alignment='center'} aria-label="Align center">C</button>
        <button class:active={alignment==='right'}  on:click={() => alignment='right'}  aria-label="Align right">R</button>
      </div>
    </div>

    <!-- Right -->
    <div class="pg__hdr-right">
      <button class="btn icon" on:click={toggleMode} aria-label="Toggle light/dark">
        {#if mode==='light'}<Moon size={16}/>{:else}<Sun size={16}/>{/if}
      </button>

      {#if code}
        <div class="tabs" role="tablist" aria-label="Preview/code tabs">
          <button role="tab" aria-selected={tab==='preview'} class:active={tab==='preview'} on:click={() => tab='preview'}>Preview</button>
          <button role="tab" aria-selected={tab==='code'}    class:active={tab==='code'}    on:click={() => tab='code'}>Code</button>
        </div>
        <Tooltip text="Copy code" position="bottom">
          <button class="btn icon" on:click={copyCode} aria-label="Copy code"><Clipboard size={16}/></button>
        </Tooltip>
      {/if}
    </div>
  </div>

  {#if tab === 'preview'}
    <div class="pg__canvas">
      <div class={`pg__stage ${justify}`}>
        <div class={`pg__device ${viewportClasses[viewport]} max-w-full`}>
          <slot />
        </div>
      </div>
    </div>
  {:else}
    <div class="pg__code">
      <pre><code class="pg__code-content">{code}</code></pre>
    </div>
  {/if}
</div>

<style>
  /* ===== Palette (token-driven) ===== */
  .pg {
    --pg-fg-strong: var(--on-surface-strong, var(--color-surface-950));
    --pg-fg:        var(--on-surface, var(--color-surface-900));
    --pg-muted:     var(--on-surface-subtle, var(--color-surface-600));
    --pg-border:    var(--color-surface-300);
    --pg-header:    var(--color-surface-100);
    --pg-bg:        var(--color-surface-50);

    /* Vision-aware accents for states */
    --pg-accent:    var(--color-secondary-500-vis, var(--color-secondary-500));
    --pg-info:      var(--color-info-500-vis, var(--color-info-500));

    border: 1px solid var(--pg-border);
    border-radius: var(--radius-xl, 12px);
    background: var(--pg-bg);
    color: var(--pg-fg);
    overflow: clip;
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,.08));
  }

  :global(html[data-mode="dark"]) .pg {
    --pg-fg-strong: var(--on-surface-strong, var(--color-surface-50));
    --pg-fg:        var(--on-surface, var(--color-surface-100));
    --pg-muted:     var(--on-surface-subtle, var(--color-surface-400));
    --pg-border:    var(--color-surface-700);
    --pg-header:    var(--color-surface-800);
    --pg-bg:        var(--color-surface-900);
  }

  /* ===== Header (L/C/R) ===== */
  .pg__hdr {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: .5rem;
    padding: .5rem .75rem;
    background: var(--pg-header);
    border-bottom: 1px solid var(--pg-border);
    color: var(--pg-fg-strong);
  }
  .pg__hdr-left, .pg__hdr-center, .pg__hdr-right { display:flex; align-items:center; gap:.5rem; }
  .pg__hdr-left { justify-content:flex-start; }
  .pg__hdr-center { justify-content:center; gap:.75rem; }
  .pg__hdr-right { justify-content:flex-end; gap:.375rem; }
  .pg__title { font-weight: 700; font-size: .95rem; letter-spacing: .01em; color: var(--pg-fg-strong); }

  /* ===== Buttons (no opacity fades; high contrast) ===== */
  .btn { border:0; background:transparent; color: var(--pg-fg-strong); cursor:pointer; border-radius:.5rem; }
  .btn.icon { width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; }
  .btn:hover { background: color-mix(in oklab, var(--pg-fg-strong) 10%, transparent); }
  .btn:focus-visible { outline: 2px solid var(--pg-info); outline-offset: 2px; }

  /* Segmented control */
  .seg { display:inline-flex; border:1px solid var(--pg-border); border-radius:.6rem; overflow:hidden; background: color-mix(in oklab, var(--pg-header) 96%, transparent); }
  .seg button { padding:.35rem .5rem; font-size:.8rem; line-height:1; color: var(--pg-fg-strong); }
  .seg button:hover { background: color-mix(in oklab, var(--pg-fg-strong) 10%, transparent); }
  .seg button.active {
    background: color-mix(in oklab, var(--pg-accent) 22%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--pg-accent) 40%, transparent);
  }
  .seg button:focus-visible { outline: 2px solid var(--pg-info); outline-offset: 2px; }

  /* Tabs */
  .tabs { display:inline-flex; border:1px solid var(--pg-border); border-radius:.6rem; overflow:hidden; }
  .tabs button { padding:.35rem .6rem; font-size:.8rem; color: var(--pg-fg-strong); background: transparent; }
  .tabs button:hover { background: color-mix(in oklab, var(--pg-fg-strong) 10%, transparent); }
  .tabs button.active {
    background: color-mix(in oklab, var(--pg-info) 22%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--pg-info) 40%, transparent);
  }
  .tabs button:focus-visible { outline: 2px solid var(--pg-info); outline-offset: 2px; }

  /* ===== Canvas / Stage ===== */
  .pg__canvas {
    padding: 1.25rem;
    background:
      radial-gradient(circle at 8px 8px, color-mix(in oklab, var(--pg-fg-strong) 6%, transparent) 1px, transparent 1px) 0 0 / 16px 16px,
      var(--pg-bg);
  }
  .pg__stage { display:flex; align-items:flex-start; min-height: 7rem; }

  .pg__device {
    background: var(--color-surface-50);
    color: var(--pg-fg);
    border: 1px solid var(--pg-border);
    border-radius: 14px;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08);
  }
  :global(html[data-mode="dark"]) .pg__device {
    background: var(--color-surface-850, var(--color-surface-800)); /* a touch lighter than page bg for separation */
    border-color: var(--color-surface-650, var(--color-surface-700));
    box-shadow: 0 1px 2px rgba(0,0,0,.35), 0 8px 24px rgba(0,0,0,.40);
  }

  /* ===== Code ===== */
  .pg__code { background: var(--color-surface-950); color: var(--color-surface-50); padding: .75rem; border-top: 1px solid var(--pg-border); }
  .pg__code-content {
    display:block; white-space: pre-wrap;
    border: 1px solid var(--color-surface-800);
    border-radius: .6rem;
    padding: .75rem;
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: .875rem; line-height: 1.45;
  }
</style>





