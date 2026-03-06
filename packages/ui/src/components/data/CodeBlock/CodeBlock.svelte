<script lang="ts">
  export let code = '';
  export let language: string | undefined = undefined;
  export let filename: string | undefined = undefined;
  export let copyable = true;
  export let showLineNumbers = false;
  export let wrap = false;
  export let className = '';

  let copied = false;
  let copyTimer: ReturnType<typeof setTimeout> | null = null;

  async function copyCode() {
    if (!copyable) return;
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 1600);
    } catch {
      copied = false;
    }
  }

  $: lines = code.split('\n');
</script>

<section class={`cl-codeblock ${className}`.trim()}>
  <header class="cl-codeblock__header">
    <div class="cl-codeblock__meta">
      {#if filename}
        <span class="cl-codeblock__filename">{filename}</span>
      {/if}
      {#if language}
        <span class="cl-codeblock__language">{language}</span>
      {/if}
    </div>
    {#if copyable}
      <button
        type="button"
        class="cl-codeblock__copy"
        on:click={copyCode}
        aria-live="polite"
        aria-label={copied ? 'Code copied' : 'Copy code'}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    {/if}
  </header>

  <pre class={`cl-codeblock__pre ${wrap ? 'cl-codeblock__pre--wrap' : ''}`}>
    {#if showLineNumbers}
      <code>
        {#each lines as line, i}<span class="cl-codeblock__line"><span class="cl-codeblock__line-no">{i + 1}</span>{line || ' '}</span>{/each}
      </code>
    {:else}
      <code>{code}</code>
    {/if}
  </pre>
</section>

<style>
  .cl-codeblock {
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    border-radius: var(--radius-card, var(--radius-md, 0.75rem));
    background: var(--background-panel, var(--color-surface-50));
    box-shadow: var(--shadow-sm, 0 1px 2px rgb(0 0 0 / 0.06));
    overflow: hidden;
  }

  .cl-codeblock__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    border-bottom: var(--border-width-divider, 1px) solid var(--border-default-color, var(--color-surface-300));
    background: color-mix(in oklab, var(--background-panel, var(--color-surface-50)) 92%, var(--color-surface-950) 8%);
  }

  .cl-codeblock__meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    min-width: 0;
  }

  .cl-codeblock__filename {
    font-size: var(--type-scale-xs, 0.75rem);
    font-weight: var(--type-weight-semibold, 600);
    color: var(--base-font-color, var(--color-surface-900));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cl-codeblock__language {
    font-size: var(--type-scale-xs, 0.75rem);
    color: var(--on-surface-muted, var(--color-surface-700));
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .cl-codeblock__copy {
    font-size: var(--type-scale-xs, 0.75rem);
    border: var(--border-width-default, 1px) solid var(--border-default-color, var(--color-surface-300));
    border-radius: var(--radius-interactive, 0.5rem);
    background: var(--background-surface, var(--color-surface-100));
    color: var(--base-font-color, var(--color-surface-900));
    padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem);
    cursor: pointer;
  }

  .cl-codeblock__copy:focus-visible {
    outline: var(--focus-width, 2px) solid var(--focus-color, var(--color-primary-500));
    outline-offset: var(--focus-offset, 2px);
  }

  .cl-codeblock__pre {
    margin: 0;
    padding: var(--spacing-3, 0.75rem);
    overflow-x: auto;
    font-size: var(--type-scale-sm, 0.875rem);
    font-family: var(--type-code-family, ui-monospace, SFMono-Regular, Menlo, monospace);
    line-height: 1.5;
    color: var(--base-font-color, var(--color-surface-900));
    background: var(--background-surface, var(--color-surface-50));
  }

  .cl-codeblock__pre--wrap {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .cl-codeblock__line {
    display: inline-grid;
    width: 100%;
    grid-template-columns: 2.25rem 1fr;
    gap: var(--spacing-2, 0.5rem);
    align-items: baseline;
  }

  .cl-codeblock__line-no {
    color: var(--on-surface-muted, var(--color-surface-700));
    user-select: none;
    text-align: right;
  }
</style>
