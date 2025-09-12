<script lang="ts">
  import Tooltip from '$lib/components/feedback/Tooltip/Tooltip.svelte';
  import {
    Github, Laptop, Tablet, Smartphone,
    AlignLeft, AlignCenter, AlignRight,
    Sun, Moon, Clipboard
  } from 'lucide-svelte';

  // props
  export let code = '';
  export let githubUrl = '';
  export let showCode = true;

  // controls
  let viewport: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  let alignment: 'left' | 'center' | 'right' = 'center';

  // LOCAL theme state (scoped to this preview only)
  let mode: 'light' | 'dark' =
    ((document?.documentElement?.getAttribute('data-mode') as 'light' | 'dark') || 'light');

  let scopeEl: HTMLElement; // the element we’ll attach data-theme/mode to

  function applyScopeAttrs() {
    if (!scopeEl) return;
    // mirror current site theme name + vision, but keep it LOCAL
    const theme = document.documentElement.getAttribute('data-theme') || 'clothesline';
    const vision = document.documentElement.getAttribute('data-vision') || '';
    scopeEl.setAttribute('data-theme', theme);
    scopeEl.setAttribute('data-mode', mode);
    vision ? scopeEl.setAttribute('data-vision', vision) : scopeEl.removeAttribute('data-vision');
  }

  function toggleMode() {
    mode = mode === 'light' ? 'dark' : 'light';
    applyScopeAttrs();
  }

  // initialize on mount
  import { onMount } from 'svelte';
  onMount(() => {
    applyScopeAttrs();
  });

  function copyCode() {
    if (code) navigator.clipboard.writeText(code);
  }

  // layout values
  $: pvWidth =
    viewport === 'desktop' ? '960px' :
    viewport === 'tablet'  ? '640px' :
                             '360px';

  $: justify =
    alignment === 'left'  ? 'start'  :
    alignment === 'right' ? 'end'    :
                            'center';
</script>

<!-- Root is a THEME SCOPE -->
<div class="component-preview rounded-xl border shadow-sm" bind:this={scopeEl}>
  <!-- Toolbar -->
  <div class="toolbar flex items-center justify-between gap-2 px-4 py-2 border-b"
       style="background:var(--preview-header-bg); border-color:var(--border-default-color)">
    <div class="flex items-center gap-3">
      {#if githubUrl}
        <Tooltip text="Edit on GitHub" position="bottom">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="icon-link">
            <Github size={18} />
          </a>
        </Tooltip>
      {/if}
    </div>

    <div class="flex items-center gap-1">
      <!-- Viewports -->
      <Tooltip text="Desktop" position="bottom">
        <button class:active={viewport==='desktop'} on:click={() => (viewport = 'desktop')} aria-label="Desktop">
          <Laptop size={18} />
        </button>
      </Tooltip>
      <Tooltip text="Tablet" position="bottom">
        <button class:active={viewport==='tablet'} on:click={() => (viewport = 'tablet')} aria-label="Tablet">
          <Tablet size={18} />
        </button>
      </Tooltip>
      <Tooltip text="Mobile" position="bottom">
        <button class:active={viewport==='mobile'} on:click={() => (viewport = 'mobile')} aria-label="Mobile">
          <Smartphone size={18} />
        </button>
      </Tooltip>

      <!-- Mode (scoped) -->
      <Tooltip text={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} position="bottom">
        <button on:click={toggleMode} aria-label="Toggle light/dark" class="ml-2">
          {#if mode === 'light'} <Moon size={18} /> {:else} <Sun size={18} /> {/if}
        </button>
      </Tooltip>

      <!-- Alignment -->
      <Tooltip text="Left align" position="bottom">
        <button class:active={alignment==='left'} on:click={() => (alignment = 'left')} aria-label="Left align">
          <AlignLeft size={18} />
        </button>
      </Tooltip>
      <Tooltip text="Center align" position="bottom">
        <button class:active={alignment==='center'} on:click={() => (alignment = 'center')} aria-label="Center align">
          <AlignCenter size={18} />
        </button>
      </Tooltip>
      <Tooltip text="Right align" position="bottom">
        <button class:active={alignment==='right'} on:click={() => (alignment = 'right')} aria-label="Right align">
          <AlignRight size={18} />
        </button>
      </Tooltip>
    </div>
  </div>

  <!-- Preview body: compact grid; justify the item, not the container -->
  <div class="preview-body grid px-4 py-8"
       style="
        background:var(--preview-bg);
        min-height:var(--preview-body-min-h, 8rem);
        justify-items:{justify};
      ">
    <div class="pv-inner"
         style="width:min(100%, {pvWidth});">
      <slot />
    </div>
  </div>

  {#if showCode && code}
    <div class="code-tools px-4 py-2 border-t"
         style="background:var(--preview-header-bg); border-color:var(--border-subtle)">
      <div class="ml-auto">
        <Tooltip text="Copy code" position="bottom">
          <button on:click={copyCode} aria-label="Copy code" class="icon-btn">
            <Clipboard size={18} />
          </button>
        </Tooltip>
      </div>
    </div>

    <div class="code-block px-4 py-3"
         style="background:var(--preview-code-bg); color:var(--base-font-color)">
      <pre><code style="
        display:block;
        border:1px solid var(--border-subtle);
        border-radius:var(--radius-md);
        padding:.75rem;
        font-family:var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size:var(--preview-code-font-size, .875rem);
        line-height:1.5;
      ">{code}</code></pre>
    </div>
  {/if}
</div>

<style>
  .component-preview {
    /* Preview surface tokens (read from theme, with safe fallbacks) */
    --preview-bg: var(--color-surface-100);
    --preview-header-bg: var(--color-surface-200);
    border-color: var(--border-default-color, #c9c9c9);
    border-radius: var(--radius-lg, .75rem);
    box-shadow: var(--shadow-md, 0 1px 2px rgba(0,0,0,.06));
    overflow: visible; /* let tooltips escape */
  }

  .preview-body { overflow: hidden; }

  /* Buttons */
  button {
    display:inline-flex; align-items:center; justify-content:center;
    padding:.375rem; border-radius:var(--radius-md,.5rem);
    transition:background .15s ease, color .15s ease, opacity .15s ease;
    color: var(--text-muted, #777);
  }
  button:hover { background: var(--color-surface-300,#e8e8e8); color: var(--base-font-color,#111); }
  button.active { background: var(--color-surface-400,#ddd); color: var(--base-font-color,#111); }

  .icon-link { color: var(--text-muted, #777); }
  .icon-link:hover { color: var(--base-font-color, #111); }
  .icon-btn { color: var(--text-muted, #777); }
  .icon-btn:hover { color: var(--base-font-color, #111); }
</style>





