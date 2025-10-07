<script lang="ts">
  import Tooltip from '$lib/components/feedback/Tooltip/Tooltip.svelte';
  import { setTheme } from '@clothesline/themes';
  import { Github, Laptop, Tablet, Smartphone, AlignLeft, AlignCenter, AlignRight, Sun, Moon, Clipboard } from 'lucide-svelte';

  export let code = '';
  export const language: 'svelte' | 'ts' | 'html' | 'css' = 'svelte';
  export let githubUrl = '';
  export let showCode = true;

  let viewport: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  let alignment: 'left' | 'center' | 'right' = 'center';

  // theme toggling
  let mode: 'light' | 'dark' = (document.documentElement.getAttribute('data-mode') as any) || 'light';
  function toggleMode() {
    mode = mode === 'light' ? 'dark' : 'light';
    const theme = document.documentElement.getAttribute('data-theme') || 'clothesline';
    const visionAttr = document.documentElement.getAttribute('data-vision');
    const allowed = ['protanopia','deuteranopia','tritanopia','monochromacy'];
    const vision = allowed.includes(visionAttr as string) ? (visionAttr as any) : undefined;
    setTheme(theme, mode, vision);
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  const viewportClasses = {
    desktop: 'w-full max-w-[960px]',
    tablet: 'w-[640px]',
    mobile: 'w-[360px]'
  } as const;

  $: alignStyle =
    alignment === 'left'
      ? 'margin-left:0;margin-right:auto;'
      : alignment === 'center'
      ? 'margin-left:auto;margin-right:auto;'
      : 'margin-left:auto;margin-right:0;';
</script>

<div class="component-preview rounded-xl border shadow-sm">
  <!-- Toolbar -->
  <div class="toolbar flex items-center justify-between gap-2 px-4 py-2 border-b">
    <div class="flex items-center gap-3">
      {#if githubUrl}
        <Tooltip text="Edit on GitHub" position="bottom">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Open on GitHub">
            <Github size={18} />
          </a>
        </Tooltip>
      {/if}
    </div>

    <div class="flex items-center gap-1">
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

      <Tooltip text={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} position="bottom">
        <button on:click={toggleMode} aria-label="Toggle light/dark" class="ml-2">
          {#if mode === 'light'} <Moon size={18} /> {:else} <Sun size={18} /> {/if}
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

  <!-- Preview body -->
  <div class="preview-body px-4 py-8">
    <div class={`${viewportClasses[viewport]} max-w-full`} style={alignStyle}>
      <slot />
    </div>
  </div>

  {#if showCode && code}
    <div class="code-header flex items-center justify-end px-4 py-2 border-t">
      <Tooltip text="Copy code" position="bottom">
        <button on:click={copyCode} aria-label="Copy code" class="icon-btn">
          <Clipboard size={18} />
        </button>
      </Tooltip>
    </div>
    <div class="code-block px-4 pb-4">
      <pre><code class="code-content">{code}</code></pre>
    </div>
  {/if}
</div>

<style>
  /* ---------- Preview palette (light defaults) ---------- */
  .component-preview {
    --preview-bg: var(--color-surface-50);
    --preview-fg: var(--base-font-color, var(--color-surface-950));
    --preview-border: var(--color-surface-300);
    --preview-header-bg: var(--color-surface-100);

    /* form fields inside preview */
    --field-bg: var(--color-surface-50);
    --field-fg: var(--base-font-color, var(--color-surface-950));
    --field-border: var(--color-surface-300);
    --field-placeholder: var(--text-muted, var(--color-surface-600));

    /* code area */
    --code-bg: var(--color-surface-950);
    --code-fg: var(--color-surface-50);
    --code-border: var(--color-surface-800);

    background: var(--preview-bg);
    color: var(--preview-fg);
    border-color: var(--preview-border);
    border-radius: var(--radius-lg, 0.75rem);
    box-shadow: var(--shadow-md, 0 1px 2px rgba(0,0,0,.06));
    overflow: clip;
  }

  /* Dark overrides (scoped) */
  :global(html[data-mode="dark"]) .component-preview {
    --preview-bg: var(--color-surface-900);
    --preview-fg: var(--base-font-color-dark, var(--color-surface-50));
    --preview-border: var(--color-surface-700);
    --preview-header-bg: var(--color-surface-800);

    --field-bg: var(--color-surface-900);
    --field-fg: var(--base-font-color-dark, var(--color-surface-50));
    --field-border: var(--color-surface-700);
    --field-placeholder: var(--text-muted, var(--color-surface-400));

    --code-bg: var(--color-surface-950);
    --code-fg: var(--color-surface-100);
    --code-border: var(--color-surface-800);
  }

  /* Sections */
  .toolbar {
    background: var(--preview-header-bg);
    border-color: var(--preview-border);
    border-top-left-radius: var(--radius-lg, 0.75rem);
    border-top-right-radius: var(--radius-lg, 0.75rem);
  }
  .preview-body {
    background: var(--preview-bg);
    color: var(--preview-fg);
    min-height: var(--preview-body-min-h, 6rem);
    overflow: hidden;
  }

  /* Controls */
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .375rem;
    border-radius: var(--radius-md, .5rem);
    transition: background .15s ease, opacity .15s ease, color .15s ease;
    color: var(--preview-fg);
    opacity: .85;
  }
  button:hover { opacity: 1; background: color-mix(in oklab, var(--preview-fg) 8%, transparent); }
  button.active { background: color-mix(in oklab, var(--preview-fg) 14%, transparent); }

  .icon-link { color: inherit; opacity: .8; }
  .icon-link:hover { opacity: 1; }

  .icon-btn { color: inherit; opacity: .85; }
  .icon-btn:hover { opacity: 1; }

  /* Code area */
  .code-header { background: var(--preview-header-bg); border-color: var(--preview-border); }
  .code-block { background: var(--code-bg); color: var(--code-fg); }
  .code-content {
    display: block;
    border: 1px solid var(--code-border);
    border-radius: var(--radius-md, .5rem);
    padding: .75rem;
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: .875rem;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  /* ---- Form field safety inside preview (fixes dark-mode unreadable inputs) ---- */
  .preview-body input,
  .preview-body textarea,
  .preview-body select {
    background: var(--field-bg);
    color: var(--field-fg);
    border: 1px solid var(--field-border);
    border-radius: var(--radius-md, .5rem);
    padding: .5rem .75rem;
  }
  .preview-body input::placeholder,
  .preview-body textarea::placeholder {
    color: var(--field-placeholder);
  }

  /* Tooltip layer */
  :global(.cl-tooltip) { z-index: 60; }
</style>





