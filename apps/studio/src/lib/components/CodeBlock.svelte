<!-- CodeBlock.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  // Add a reference to the custom prismjs type declaration
  /// <reference types="../../../../types/prismjs" />

  export let lang: string = 'bash';
  export let label: string = '';
  export let code: string = '';

  let highlightedCode = '';

  async function highlight() {
    const Prism = (await import('prismjs')).default;
    await import(`prismjs/components/prism-${lang}.js`).catch(() => {});
    highlightedCode = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup, lang);
  }

  onMount(highlight);

  // Re-highlight if inputs change
  $: lang, code, highlight();

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      // Keep it quiet + non-blocking (no alert)
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  }
</script>

<div class="cl-codeblock">
  {#if label}
    <div class="cl-codeblock__bar">
      <span class="cl-codeblock__label">{label}</span>

      <button type="button" class="cl-codeblock__copy" on:click={copyCode}>
        Copy
      </button>
    </div>
  {/if}

  <pre class="cl-codeblock__pre">
    <code class="language-{lang}">{@html highlightedCode}</code>
  </pre>
</div>

<style>
  /* =========================================================
     Container uses YOUR tokens (no Tailwind colors)
  ========================================================= */

  .cl-codeblock {
    overflow: hidden;
    border-radius: var(--radius-card, var(--radius-base, 12px));
    border: var(--default-border-width, 1px) solid var(--border-muted-color, var(--color-surface-300-vis));
    background: var(--background-elevation-1, var(--background-panel, var(--color-surface-100-vis)));

    /* Local “code theme” vars (so we can force readable fg on dark code bg) */
    --code-bg: var(--background-inverse, var(--color-surface-950-vis));
    --code-fg: var(--on-inverse, var(--color-surface-50-vis));
    --code-muted: color-mix(in oklab, var(--code-fg) 70%, transparent);
    --code-border: color-mix(in oklab, var(--code-fg) 18%, transparent);

    color: var(--base-font-color, var(--color-surface-950-vis));
  }

  /* Top bar */
  .cl-codeblock__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    padding: 0.5rem 0.75rem;
    border-bottom: var(--default-border-width, 1px) solid var(--border-muted-color, var(--color-surface-300-vis));
    background: var(--background-elevation-2, var(--background-panel, var(--color-surface-100-vis)));
  }

  .cl-codeblock__label {
    font-size: var(--type-caption-size, 0.75rem);
    line-height: var(--type-caption-leading, 1.2);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted, var(--color-neutral-700-vis));
  }

  .cl-codeblock__copy {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 28px;
    padding: 0 0.6rem;
    border-radius: var(--radius-interactive, 999px);
    border: var(--default-border-width, 1px) solid var(--border-muted-color, var(--color-surface-300-vis));
    background: var(--background-panel, var(--color-surface-100-vis));
    color: var(--text-muted, var(--base-font-color, var(--color-surface-900-vis)));

    font-size: var(--type-caption-size, 0.75rem);
    line-height: 1;
    cursor: pointer;

    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, transform 120ms ease;
  }

  .cl-codeblock__copy:hover {
    border-color: var(--color-accent-500, var(--color-secondary-500));
    background: var(--background-elevation-2, var(--color-surface-200-vis));
    color: var(--base-font-color, var(--color-surface-950-vis));
  }

  .cl-codeblock__copy:focus-visible {
    outline: 2px solid var(--color-info-500, var(--color-accent-500));
    outline-offset: 2px;
  }

  /* Code area */
  .cl-codeblock__pre {
    margin: 0;
    padding: 0.9rem 0.9rem;

    overflow-x: auto;

    background: var(--code-bg);
    color: var(--code-fg);
  }

  code {
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace);
    font-size: var(--type-code-size, 0.875rem);
    line-height: var(--type-code-leading, 1.55);
  }

  pre code {
    display: block;
    white-space: pre;
  }

  /* =========================================================
     Prism colors: use readable mixes based on --code-fg
     (so light-mode + dark code background is always legible)
  ========================================================= */

  :global(.token.comment),
  :global(.token.prolog),
  :global(.token.doctype),
  :global(.token.cdata) {
    color: color-mix(in oklab, var(--code-fg) 55%, transparent);
  }

  :global(.token.punctuation) {
    color: color-mix(in oklab, var(--code-fg) 75%, transparent);
  }

  :global(.token.property),
  :global(.token.tag),
  :global(.token.boolean),
  :global(.token.number),
  :global(.token.constant),
  :global(.token.symbol),
  :global(.token.deleted) {
    color: color-mix(in oklab, var(--code-fg) 85%, var(--color-error-500, #f87171));
  }

  :global(.token.selector),
  :global(.token.attr-name),
  :global(.token.string),
  :global(.token.char),
  :global(.token.builtin),
  :global(.token.inserted) {
    color: color-mix(in oklab, var(--code-fg) 85%, var(--color-success-500, #34d399));
  }

  :global(.token.operator),
  :global(.token.entity),
  :global(.token.url),
  :global(.language-css .token.string),
  :global(.style .token.string),
  :global(.token.variable) {
    color: color-mix(in oklab, var(--code-fg) 85%, var(--color-warning-500, #fbbf24));
  }

  :global(.token.atrule),
  :global(.token.attr-value),
  :global(.token.function),
  :global(.token.class-name) {
    color: color-mix(in oklab, var(--code-fg) 85%, var(--color-info-500, #60a5fa));
  }

  :global(.token.keyword) {
    color: color-mix(in oklab, var(--code-fg) 85%, var(--color-accent-500, #c084fc));
  }

  /* Optional: selection */
  :global(.cl-codeblock ::selection) {
    background: color-mix(in oklab, var(--code-fg) 18%, transparent);
  }
</style>

