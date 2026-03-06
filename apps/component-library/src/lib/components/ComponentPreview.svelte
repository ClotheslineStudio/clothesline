<script lang="ts">
  import { Button } from '@clothesline/ui';
  import { Copy, GridView, Terminal } from '@clothesline/icons';

  export let title = 'Preview (v2)';
  export let code = '';
  export let highlightedCode = '';
  export let language = 'svelte';
  export let className = '';

  let view: 'preview' | 'code' = 'preview';
  let copied = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 1400);
    } catch {
      copied = false;
    }
  }
</script>

<section class={`preview-shell ${className}`.trim()}>
  <header class="preview-head">
    <h3>{title}</h3>

    <div class="preview-actions">
      <div class="view-toggle" role="tablist" aria-label="Preview mode">
        <button
          type="button"
          role="tab"
          aria-selected={view === 'preview'}
          class:active={view === 'preview'}
          on:click={() => (view = 'preview')}
        >
          <GridView width="14" height="14" />
          <span>Preview</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'code'}
          class:active={view === 'code'}
          on:click={() => (view = 'code')}
        >
          <Terminal width="14" height="14" />
          <span>Code</span>
        </button>
      </div>
    </div>
  </header>

  {#if view === 'preview'}
    <div class="preview-body">
      <slot />
    </div>
  {:else}
    <div class="code-wrap">
      <div class="code-toolbar">
        <span class="code-lang">{language}</span>
        <Button size="sm" variant="ghost" on:click={copyCode} className="copy-btn">
          <Copy width="14" height="14" />
          <span>{copied ? 'Copied' : 'Copy code'}</span>
        </Button>
      </div>

      {#if highlightedCode}
        <div class="code-render">
          {@html highlightedCode}
        </div>
      {:else}
        <pre class="code-pre"><code>{code}</code></pre>
      {/if}
    </div>
  {/if}
</section>

<style>
  .preview-shell {
    position: relative;
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-radius: var(--radius-container, 0.875rem);
    overflow: visible;
  }

  .preview-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3, 0.75rem);
    padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
    border-bottom: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 90%, transparent);
    border-top-left-radius: calc(var(--radius-container, 0.875rem) - 1px);
    border-top-right-radius: calc(var(--radius-container, 0.875rem) - 1px);
  }

  .preview-head h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 620;
  }

  .view-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-radius: var(--radius-full);
    padding: 0.2rem;
    background: var(--background-elevation-1, var(--color-surface-100-vis));
  }

  .view-toggle button {
    border: 0;
    background: transparent;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.28rem 0.65rem;
    font-size: 0.81rem;
    cursor: pointer;
  }

  .view-toggle button.active {
    background: color-mix(in oklab, var(--primary, var(--color-primary-500-vis)) 16%, transparent);
    color: var(--on-surface-strong, var(--color-surface-950-vis));
    font-weight: 600;
  }

  .preview-body {
    position: relative;
    padding: clamp(1.5rem, 2vw, 2.25rem);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .code-wrap {
    position: relative;
    padding: var(--spacing-3, 0.75rem);
    background: var(--background-elevation-1, var(--color-surface-100-vis));
    border-top: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    border-bottom-left-radius: calc(var(--radius-container, 0.875rem) - 1px);
    border-bottom-right-radius: calc(var(--radius-container, 0.875rem) - 1px);
  }

  .code-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-2, 0.5rem);
    margin-bottom: var(--spacing-2, 0.5rem);
  }

  .code-lang {
    font-size: 0.78rem;
    text-transform: lowercase;
    letter-spacing: 0.04em;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
    font-family: var(--type-code-family, ui-monospace, SFMono-Regular, Menlo, monospace);
  }

  :global(.copy-btn) {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--on-surface-muted, var(--color-surface-700-vis));
  }

  .code-pre {
    margin: 0;
    padding: 0.95rem 1rem;
    border-radius: var(--radius-lg, 0.75rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 78%, black);
    color: var(--on-surface, var(--color-surface-900-vis));
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    font-family: var(--type-code-family, ui-monospace, SFMono-Regular, Menlo, monospace);
    white-space: pre;
  }

  .code-render :global(pre.shiki) {
    margin: 0;
    padding: 0.95rem 1rem;
    border-radius: var(--radius-lg, 0.75rem);
    border: 1px solid var(--border-color-default, var(--color-surface-300-vis));
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    font-family: var(--type-code-family, ui-monospace, SFMono-Regular, Menlo, monospace);
    white-space: pre;
  }

  .code-render :global(pre.shiki code) {
    font-family: inherit;
  }

  :global(html[data-mode='light'] .code-render .shiki) {
    background-color: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 96%, transparent) !important;
  }

  :global(html[data-mode='light'] .code-render .shiki span) {
    background-color: transparent !important;
  }

  :global(html[data-mode='dark'] .code-render .shiki) {
    color: var(--shiki-dark) !important;
    background-color: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 68%, black) !important;
  }

  :global(html[data-mode='dark'] .code-render .shiki span) {
    color: var(--shiki-dark) !important;
    background-color: transparent !important;
  }

  :global(html[data-mode='dark']) .code-wrap {
    background: color-mix(in oklab, var(--background-elevation-1, var(--color-surface-100-vis)) 84%, black);
    border-top-color: color-mix(in oklab, var(--border-color-default, var(--color-surface-300-vis)) 70%, white);
  }

  :global(html[data-mode='dark']) .code-pre {
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50-vis)) 68%, black);
    border-color: color-mix(in oklab, var(--border-color-default, var(--color-surface-300-vis)) 62%, white);
  }

  :global(html[data-mode='dark'] .code-render pre.shiki) {
    border-color: color-mix(in oklab, var(--border-color-default, var(--color-surface-300-vis)) 62%, white);
  }
</style>
