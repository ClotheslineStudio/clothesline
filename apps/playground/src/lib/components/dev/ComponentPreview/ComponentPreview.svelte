<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { setTheme } from '@clothesline/themes';
  import { Tooltip } from '@clothesline/ui';
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
    function toggleMode() {
  mode = mode === 'light' ? 'dark' : 'light';
}

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

<div class="pg" data-mode={mode}>
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
      <div class="pg__stage" data-align={alignment}>
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
  /* ==========================================================
     ComponentPreview (token-driven, local mode capable)
     Depends on:
       foundation: spacing / radius / borders / focus / motion / elevation / typography
       theme foundation: base-font-color(+dark), body-background-color(+dark), anchor-color
       theme colors for accents: --color-info-500(-vis), --color-secondary-500(-vis)
       opacity tokens: --opacity-interactive-hover, --opacity-active, --opacity-border
  ========================================================== */

  .pg {
    /* Local mode palette source (paired tokens) */
    --pg-text:        var(--base-font-color);
    --pg-bg:          var(--body-background-color);

    /* Derive contained surfaces from bg/text using opacity tokens */
    --pg-panel: color-mix(in oklab, var(--pg-bg) 94%, var(--pg-text) calc(var(--opacity-surface-raised) * 100%));
    --pg-header: color-mix(in oklab, var(--pg-bg) 90%, var(--pg-text) calc(var(--opacity-surface-overlay) * 100%));

    /* Borders + focus */
    --pg-border: color-mix(in oklab, var(--pg-text) calc(var(--opacity-border) * 100%), transparent);
    --pg-focus:  var(--color-info-500-vis, var(--color-info-500));
    --pg-accent: var(--color-secondary-500-vis, var(--color-secondary-500));

    /* Sizing + rhythm */
    --pg-radius: var(--radius-container);
    --pg-radius-sm: var(--radius-interactive);
    --pg-gap: var(--spacing-2);
    --pg-pad: var(--spacing-3);

    /* Control sizes (touch-safe) */
    --pg-ctl: var(--size-control-sm);

    border: var(--border-width-default) solid var(--pg-border);
    border-radius: var(--pg-radius);
    background: var(--pg-panel);
    color: var(--pg-text);
    overflow: clip;
    box-shadow: var(--elevation-card);
  }

  /* Local dark mode (no dependency on html[data-mode]) */
  .pg[data-mode="dark"] {
    --pg-text: var(--base-font-color-dark);
    --pg-bg:   var(--body-background-color-dark);
  }

  /* ===== Header (L/C/R) ===== */
  .pg__hdr {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--pg-gap);
    padding: var(--spacing-2) var(--pg-pad);
    background: var(--pg-header);
    border-bottom: var(--border-width-divider) solid var(--pg-border);
  }
  .pg__hdr-left,
  .pg__hdr-center,
  .pg__hdr-right {
    display: flex;
    align-items: center;
    gap: var(--pg-gap);
    min-width: 0;
  }
  .pg__hdr-left { justify-content: flex-start; }
  .pg__hdr-center { justify-content: center; gap: var(--spacing-3); }
  .pg__hdr-right { justify-content: flex-end; gap: var(--spacing-1); }

  .pg__title {
    font-weight: var(--type-weight-semibold);
    font-size: var(--type-scale-sm);
    letter-spacing: var(--type-tracking-normal);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 34ch;
  }

  /* ===== Icon buttons ===== */
  .btn {
    border: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    border-radius: var(--pg-radius-sm);
    min-width: var(--pg-ctl);
    min-height: var(--pg-ctl);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    transition:
      background var(--motion-duration-fast) var(--motion-ease),
      transform 120ms var(--motion-ease);
  }
  .btn:hover {
    background: color-mix(
      in oklab,
      currentColor calc(var(--opacity-interactive-hover) * 100%),
      transparent
    );
  }
  .btn:active { transform: translateY(1px); }
  .btn:focus-visible {
    outline: var(--focus-width) solid var(--pg-focus);
    outline-offset: var(--focus-offset);
  }

  /* ===== Segmented controls ===== */
  .seg,
  .tabs {
    display: inline-flex;
    border: var(--border-width-default) solid var(--pg-border);
    border-radius: var(--radius-interactive);
    overflow: hidden;
    background: color-mix(in oklab, var(--pg-header) 92%, transparent);
  }

  .seg button,
  .tabs button {
    border: 0;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    min-height: calc(var(--pg-ctl) - 2px);
    padding: 0 var(--spacing-2);
    font-size: var(--type-scale-xs);
    letter-spacing: var(--type-tracking-normal);

    transition:
      background var(--motion-duration-fast) var(--motion-ease),
      box-shadow var(--motion-duration-fast) var(--motion-ease);
  }
  .seg button:hover,
  .tabs button:hover {
    background: color-mix(
      in oklab,
      currentColor calc(var(--opacity-interactive-hover) * 100%),
      transparent
    );
  }

  .seg button.active {
    background: color-mix(in oklab, var(--pg-accent) calc(var(--opacity-active) * 100%), transparent);
    box-shadow: inset 0 0 0 var(--border-width-default) color-mix(in oklab, var(--pg-accent) 45%, transparent);
  }
  .tabs button.active {
    background: color-mix(in oklab, var(--pg-focus) calc(var(--opacity-active) * 100%), transparent);
    box-shadow: inset 0 0 0 var(--border-width-default) color-mix(in oklab, var(--pg-focus) 45%, transparent);
  }

  .seg button:focus-visible,
  .tabs button:focus-visible {
    outline: var(--focus-width) solid var(--pg-focus);
    outline-offset: var(--focus-offset);
  }

  /* ===== Canvas / Stage ===== */
  .pg__canvas {
    padding: var(--spacing-5);
    background: var(--pg-bg);
  }

  .pg__stage {
    display: flex;
    align-items: flex-start;
    min-height: 7rem;
  }

  /* Replace tailwind justify-classes with attributes (optional but cleaner) */
  .pg__stage[data-align="left"]   { justify-content: flex-start; }
  .pg__stage[data-align="center"] { justify-content: center; }
  .pg__stage[data-align="right"]  { justify-content: flex-end; }

  .pg__device {
    width: min(100%, var(--pg-device-w, 960px));
    background: var(--pg-panel);
    border: var(--border-width-default) solid var(--pg-border);
    border-radius: var(--radius-container);
    padding: var(--spacing);
    box-shadow: var(--elevation-popover);
  }

  /* ===== Code ===== */
  .pg__code {
    background: color-mix(in oklab, var(--pg-bg) 82%, var(--pg-text) 18%);
    border-top: var(--border-width-divider) solid var(--pg-border);
    padding: var(--spacing-3);
  }

  .pg__code-content {
    display: block;
    white-space: pre-wrap;

    border: var(--border-width-default) solid var(--pg-border);
    border-radius: var(--radius-container);
    padding: var(--spacing-3);

    font-family: var(--type-code-family);
    font-size: var(--type-scale-sm);
    line-height: var(--type-leading-normal);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn, .seg button, .tabs button { transition: none; }
    .btn:active { transform: none; }
  }
</style>





