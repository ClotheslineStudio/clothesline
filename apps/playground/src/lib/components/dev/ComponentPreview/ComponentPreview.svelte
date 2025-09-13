<script lang="ts">
  import Icon from '$lib/components/core/Icon/Icon.svelte';
  import Tooltip from '$lib/components/feedback/Tooltip/Tooltip.svelte';
  import { Text } from '@clothesline/ui';
  import { setTheme } from '@clothesline/themes';

  import {
    Github, Laptop, Tablet, Smartphone,
    AlignLeft, AlignCenter, AlignRight,
    Sun, Moon, Clipboard
  } from 'lucide-svelte';

  export let code = '';
  export const language: 'svelte' | 'ts' | 'html' | 'css' = 'svelte';
  export let githubUrl = '';
  export let showCode = true;

  // controls
  let viewport: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  let alignment: 'left' | 'center' | 'right' = 'center';

  

  // use global theme toggle so tokens update
  let mode: 'light' | 'dark' = (document.documentElement.getAttribute('data-mode') as any) || 'light';
  function toggleMode() {
    mode = mode === 'light' ? 'dark' : 'light';
    const theme = document.documentElement.getAttribute('data-theme') || 'clothesline';
    const visionAttr = document.documentElement.getAttribute('data-vision');
    const allowedVisions = ['protanopia', 'deuteranopia', 'tritanopia', 'monochromacy'];
    const vision = allowedVisions.includes(visionAttr as string) ? (visionAttr as 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochromacy') : undefined;
    setTheme(theme, mode, vision);
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  // viewport widths: desktop = centered, max width
  const viewportClasses = {
    desktop: 'w-full max-w-[960px]',   // was 'w-full'
    tablet: 'w-[640px]',
    mobile: 'w-[360px]'
  } as const;

  // margin strategy for alignment on the inner wrapper
  $: alignStyle =
    alignment === 'left'
      ? 'margin-left:0;margin-right:auto;'
      : alignment === 'center'
      ? 'margin-left:auto;margin-right:auto;'
      : 'margin-left:auto;margin-right:0;';
</script>

<div class="component-preview rounded-xl border bg-preview-bg shadow-sm">
  <!-- Header toolbar (no title) -->
  <div class="toolbar flex items-center justify-between gap-2 px-4 py-2 border-b bg-preview-header">
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

      <!-- Mode -->
      <Tooltip text={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} position="bottom">
        <button on:click={toggleMode} aria-label="Toggle light/dark" class="ml-2">
          {#if mode === 'light'}
            <Moon size={18} />
          {:else}
            <Sun size={18} />
          {/if}
        </button>
      </Tooltip>
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

  <!-- Preview area (let tooltips escape) -->
 <div class="preview-body px-4 py-8" style="background:var(--preview-bg)">
  <div class={`${viewportClasses[viewport]} max-w-full`} style={alignStyle}>
    <slot />
  </div>
</div>

  {#if showCode && code}
    <!-- Code header -->
    <Tooltip text="Copy code" position="bottom">
      <button on:click={copyCode} aria-label="Copy code" class="icon-btn">
        <Clipboard size={18} />
      </button>
    </Tooltip>

    <!-- Code block -->
    <div class="code-block px-4 py-3 border-t">
      <pre><code class="cl-text cl-text-code">{code}</code></pre>
    </div>
  {/if}
</div>

<style>
  /* ===== tokens used (override in your tokens/theme files) ===== */
  .component-preview {
    --preview-bg: var(--color-surface-100);
    --preview-header-bg: var(--color-surface-200);
    --preview-border: var(--border-default-color, #c9c9c9);
    --preview-radius: var(--radius-lg, 0.75rem);
    --preview-shadow: var(--shadow-md, 0 1px 2px rgba(0,0,0,.06));

    --code-bg: var(--color-surface-900, #111);         /* dark-safe fallback */
    --code-text: var(--color-surface-50, #f5f5f5);     /* dark-safe fallback */
    --code-border: var(--color-surface-700, #333);

    border-color: var(--preview-border);
    background: var(--preview-bg);
    border-radius: var(--preview-radius);
    box-shadow: var(--preview-shadow);
    /* Allow tooltips to render outside */
    overflow: clip;
  }

  .toolbar {
  background: var(--preview-header-bg);
  border-top-left-radius: var(--preview-radius);
  border-top-right-radius: var(--preview-radius);
}

  .preview-body {
    /* keeps things compact; override via --preview-body-min-h if needed */
    min-height: var(--preview-body-min-h, 6rem);
    overflow: hidden;
  }

  /* Buttons */
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .375rem;
    border-radius: var(--radius-md, .5rem);
    transition: background .15s ease, opacity .15s ease;
  }
  button:hover { background: var(--color-surface-300, #e8e8e8); }
  button.active { background: var(--color-surface-400, #ddd); }
  .icon-link { color: var(--color-text-muted, #666); }
  .icon-link:hover { color: var(--color-text-strong, #111); }
  .icon-btn { color: var(--color-text-muted, #777); }
  .icon-btn:hover { color: var(--color-text-strong, #111); }

  /* Code area: dark-mode friendly by default */
  .code-header { background: var(--preview-header-bg); }
  .code-block {
    background: var(--code-bg);
    color: var(--code-text);
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: .875rem;
    line-height: 1.5;
  }
  .code-block pre { white-space: pre-wrap; }
  .code-block code {
    display: block;
    border: 1px solid var(--code-border);
    border-radius: var(--radius-md, .5rem);
    padding: .75rem;
  }

  /* Tooltip should be above borders */
  :global(.cl-tooltip) { z-index: 60; }
</style>




