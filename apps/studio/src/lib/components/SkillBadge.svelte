
<!-- ToolBadge.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import type { ProofItem } from '$lib/data/tools';

  export let id: string;
  export let label: string;
  export let iconSrc: string;
  export let alt: string = '';
  export let stack: string;
  export let band: 'Core' | 'Active' | 'Familiar' | 'Occasional' | 'Legacy';
  export let lastUsed: string;
  export let context: string;
  export let proof: ProofItem[] = [];
  export let useCases: string[] = [];

  let open = false;
  let pinned = false;
  let popoverEl: HTMLDivElement | null = null;
  let badgeEl: HTMLButtonElement | null = null;

  // Band mapping for segmented bar
  const bandMap = {
    Core: 5,
    Active: 4,
    Familiar: 3,
    Occasional: 2,
    Legacy: 1
  };

  function handleOpen(e?: Event) {
    open = true;
  }
  function handleClose(e?: Event) {
    if (!pinned) open = false;
  }
  function handleTogglePin(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      pinned = !pinned;
      open = pinned || open;
      e.preventDefault();
    } else if (e.key === 'Escape') {
      open = false;
      pinned = false;
      badgeEl?.focus();
    }
  }
  function handleClick(e: MouseEvent) {
    pinned = !pinned;
    open = pinned || open;
  }
  function handleBlur(e: FocusEvent) {
    // Only close if focus moves outside badge and popover
    const related = e.relatedTarget as HTMLElement | null;
    if (!popoverEl?.contains(related) && badgeEl !== related) {
      open = false;
      pinned = false;
    }
  }
</script>


<span class="tool-badge-wrapper" style="position: relative; display: inline-block;">
  <button
    bind:this={badgeEl}
    type="button"
    class="tool-badge"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={open ? `${id}-popover` : undefined}
    on:mouseenter={handleOpen}
    on:mouseleave={handleClose}
    on:focus={handleOpen}
    on:blur={handleBlur}
    on:keydown={handleTogglePin}
    on:click={handleClick}
    tabindex="0"
  >
  <img src={iconSrc} alt={alt || label} class="tool-badge__icon" loading="lazy" />
  <span class="tool-badge__label">{label}</span>
  <span class="tool-badge__stack">{stack}</span>
  <span class="tool-badge__band" aria-label={band}>
    {#each Array(5) as _, i}
      <span class="tool-badge__band-segment {i < bandMap[band] ? 'active' : ''}"></span>
    {/each}
  </span>

  </button>

  {#if open}
    <div
      bind:this={popoverEl}
      id={`${id}-popover`}
      class="tool-badge-popover"
      role="dialog"
      tabindex="-1"
      aria-modal="false"
      style="position: absolute; left: 50%; top: calc(100% + 0.5em); transform: translateX(-50%); z-index: 10; min-width: 220px;"
      on:mouseleave={handleClose}
    >
    <button class="tool-badge-popover__close" on:click={() => { open = false; pinned = false; badgeEl?.focus(); }} aria-label="Close popover">×</button>
    <div class="tool-badge-popover__header">
      <img src={iconSrc} alt={alt || label} class="tool-badge-popover__icon" />
      <div>
        <div class="tool-badge-popover__label">{label}</div>
        <div class="tool-badge-popover__stack">{stack}</div>
      </div>
    </div>
    <div class="tool-badge-popover__band-row">
      <span class="tool-badge-popover__band-label">{band}</span>
      <span class="tool-badge-popover__band-meter">
        {#each Array(5) as _, i}
          <span class="tool-badge__band-segment {i < bandMap[band] ? 'active' : ''}"></span>
        {/each}
      </span>
      <span class="tool-badge-popover__lastused">Last used: {lastUsed}</span>
    </div>
    <div class="tool-badge-popover__context">{context}</div>
    {#if proof.length}
      <ul class="tool-badge-popover__proof">
        {#each proof as item}
          <li>
            {#if item.kind === 'repo'}
              <svg class="proof-icon" viewBox="0 0 16 16" width="16" height="16" aria-label="Repo"><circle cx="8" cy="8" r="7" fill="#6e5494" /></svg>
            {:else if item.kind === 'doc'}
              <svg class="proof-icon" viewBox="0 0 16 16" width="16" height="16" aria-label="Doc"><rect x="2" y="2" width="12" height="12" rx="2" fill="#3b82f6" /></svg>
            {:else if item.kind === 'ship'}
              <svg class="proof-icon" viewBox="0 0 16 16" width="16" height="16" aria-label="Shipped"><polygon points="8,2 14,14 2,14" fill="#10b981" /></svg>
            {/if}
            {#if item.href}
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
            {:else}
              {item.label}
            {/if}
            {#if item.note}
              <span class="proof-note">{item.note}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
    {#if useCases && useCases.length}
      <div class="tool-badge-popover__usecases">
        {#each useCases as use}
          <span class="usecase-chip">{use}</span>
        {/each}
      </div>
    {/if}
    </div>
  {/if}
</span>

<style>
/* All tokens now reference the themes package only, no hardcoded fallbacks */
.tool-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-5);
  border-radius: var(--radius-badge);
  border: var(--button-border);
  background: var(--button-bg, var(--color-primary-50-vis));
  color: var(--on-primary);
  font-size: var(--type-body-md);
  font-weight: var(--base-font-weight);
  box-shadow: var(--button-shadow);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, transform 0.2s;
  position: relative;
}
.tool-badge:focus-visible, .tool-badge:hover {
  outline: var(--focus-width) solid var(--color-accent-400);
  background: var(--button-bg-hover, var(--color-primary-100-vis));
  z-index: 2;
}
.tool-badge__icon {
  width: 1.25em;
  height: 1.25em;
  display: inline-block;
}
.tool-badge__label {
  font-weight: var(--type-weight-bold);
}
.tool-badge__stack {
  font-size: var(--type-body-xs);
  color: var(--color-primary-500);
  margin-left: var(--spacing-1);
}
.tool-badge__band {
  display: flex;
  gap: var(--spacing-1);
  margin-left: var(--spacing-2);
}
.tool-badge__band-segment {
  width: 0.5em;
  height: 0.5em;
  border-radius: var(--radius-1);
  background: var(--color-primary-200);
  opacity: 0.5;
  transition: background 0.2s, opacity 0.2s;
}
.tool-badge__band-segment.active {
  background: var(--color-accent-500);
  opacity: 1;
}
.tool-badge-popover {
  background: var(--background-elevation-1, var(--color-surface-1));
  color: var(--on-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--elevation-2);
  border: 1px solid var(--color-surface-300);
  padding: var(--spacing-7) var(--spacing-6);
  margin-top: var(--spacing-3);
  min-width: 260px;
  max-width: 360px;
  filter: none;
  transition: background 0.2s, color 0.2s;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
.tool-badge-popover__close {
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  background: none;
  border: none;
  font-size: var(--type-body-lg);
  color: var(--color-primary-400);
  cursor: pointer;
}
.tool-badge-popover__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-3);
}
.tool-badge-popover__icon {
  width: 2em;
  height: 2em;
}
.tool-badge-popover__label {
  font-weight: var(--type-weight-bold);
  font-size: var(--type-body-lg);
}
.tool-badge-popover__stack {
  font-size: var(--type-body-xs);
  color: var(--color-primary-500);
}
.tool-badge-popover__band-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-3);
}
.tool-badge-popover__band-label {
  font-size: var(--type-body-xs);
  font-weight: var(--type-weight-bold);
  color: var(--color-accent-500);
}
.tool-badge-popover__band-meter {
  display: flex;
  gap: var(--spacing-1);
}
.tool-badge-popover__lastused {
  font-size: var(--type-body-xs);
  color: var(--on-surface-muted);
  margin-left: auto;
}
.tool-badge-popover__context {
  font-size: var(--type-body-md);
  margin-bottom: var(--spacing-3);
  color: var(--on-surface);
}
.tool-badge-popover__proof {
  list-style: none;
  padding: 0;
  margin: var(--spacing-3) 0 var(--spacing-3) 0;
}
.tool-badge-popover__proof li {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-size: var(--type-body-md);
  margin-bottom: var(--spacing-2);
}
.proof-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
.proof-note {
  font-size: var(--type-body-xs);
  color: var(--on-surface-muted);
  margin-left: var(--spacing-2);
}
.tool-badge-popover__usecases {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
}
.usecase-chip {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--radius-badge);
  padding: 0.2em 0.7em;
  font-size: var(--type-body-xs);
  font-weight: var(--type-weight-bold);
}
</style>


  