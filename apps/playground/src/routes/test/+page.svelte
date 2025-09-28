<script lang="ts">
  import { iconRegistry } from '@clothesline/icons';
  import Card from '$lib/components/core/Card/Card.svelte';

  type Variant = 'stroke' | 'filled' | 'duotone' | 'animated';
  type Role = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';

  // Controls
  let query = '';
  let variant: Variant = 'stroke';
  let role: Role = 'default';
  let secondaryRole: Role = 'muted';
  let size = 24;
  let strokeWidthInput = ''; // blank → use token

  // Theme toggles (writes attributes on <html>)
  let mode: 'light' | 'dark' = 'light';
  let highContrast = false;
  $: {
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
  }

  // Data
  const entries = Object.entries(iconRegistry) as [string, any][];
  $: filtered = entries.filter(([name]) =>
    name.toLowerCase().includes(query.trim().toLowerCase())
  );

  // Derived
  $: isDuotone = variant === 'duotone';

  // strokeWidth prop: undefined when input empty OR not a finite number
  function toStrokeWidth(v: string) {
    const n = Number(v);
    return v.trim() === '' || !Number.isFinite(n) ? undefined : n;
  }
  $: strokeWidthProp = toStrokeWidth(strokeWidthInput);

  function setSize(v: number) {
    size = v;
  }
</script>

<div class="page">
  <!-- Controls -->
  <Card className="controls" padding="lg" shadow="sm">
    <div class="controls-grid">
      <label class="ctrl">
        <span>Search</span>
        <input placeholder="filter icons…" bind:value={query} />
      </label>

      <label class="ctrl">
        <span>Variant</span>
        <select bind:value={variant}>
          <option value="stroke">stroke</option>
          <option value="filled">filled</option>
          <option value="duotone">duotone</option>
          <option value="animated">animated</option>
        </select>
      </label>

      <label class="ctrl">
        <span>Role</span>
        <select bind:value={role}>
          <option value="default">default</option>
          <option value="muted">muted</option>
          <option value="primary">primary</option>
          <option value="success">success</option>
          <option value="warning">warning</option>
          <option value="error">error</option>
        </select>
      </label>

      <label class="ctrl">
        <span>Secondary (duotone)</span>
        <select bind:value={secondaryRole} disabled={!isDuotone} title={!isDuotone ? 'Only used for duotone' : ''}>
          <option value="muted">muted</option>
          <option value="default">default</option>
          <option value="primary">primary</option>
          <option value="success">success</option>
          <option value="warning">warning</option>
          <option value="error">error</option>
        </select>
      </label>

      <label class="ctrl">
        <span>Size (px)</span>
        <input type="number" min="12" max="256" bind:value={size} />
        <div class="chips">
          <button type="button" on:click={() => setSize(16)}>16</button>
          <button type="button" on:click={() => setSize(20)}>20</button>
          <button type="button" on:click={() => setSize(24)}>24</button>
          <button type="button" on:click={() => setSize(32)}>32</button>
        </div>
      </label>

      <label class="ctrl">
        <span>Stroke width (blank = token)</span>
        <input
          type="number"
          min="0"
          step="0.25"
          placeholder="var(--cl-icon-stroke)"
          bind:value={strokeWidthInput}
        />
      </label>

      <div class="toggles">
        <label class="check">
          <input type="checkbox" bind:checked={highContrast} />
          <span>High contrast</span>
        </label>

        <button class="mode" on:click={() => (mode = mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? 'Switch to dark' : 'Switch to light'}
        </button>
      </div>
    </div>
  </Card>

  <!-- Grid -->
  <div class="grid">
    {#if filtered.length === 0}
      <div class="empty">No icons match “{query}”.</div>
    {/if}

    {#each filtered as [name, Comp]}
      <Card className="item" padding="md" shadow="sm" rounded border>
        <div class="preview">
          <svelte:component
            this={Comp}
            {size}
            {variant}
            role={role}
            secondaryRole={secondaryRole}
            strokeWidth={strokeWidthProp}
            ariaLabel={name}
          />
        </div>
        <div class="meta">
          <div class="name" title={name}>{name}</div>
          <div class="sub">{variant} · {role}</div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<style>
  /* Page scaffolding */
  .page {
    display: grid;
    gap: 1rem;
    padding: clamp(1rem, 2vw, 1.5rem);
  }

  /* Controls */
  :global(.controls) { width: 100%; }
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: .75rem;
  }
  .ctrl {
    display: flex; flex-direction: column; gap: .375rem;
  }
  .ctrl > span {
    font-size: .8125rem; opacity: .8;
  }
  .ctrl input,
  .ctrl select {
    padding: .5rem .625rem;
    border: 1px solid var(--border-default-color, #d1d5db);
    border-radius: .5rem;
    background: var(--background-elevated, white);
    color: inherit;
    outline: none;
  }
  .ctrl:nth-child(1) { grid-column: span 2; }
  .ctrl:nth-child(n+2):nth-child(-n+6) { grid-column: span 1; }

  .chips { display:flex; gap:.4rem; margin-top:.35rem; }
  .chips > button {
    padding:.15rem .45rem; border:1px solid var(--border-default-color, #d1d5db);
    border-radius:.375rem; background:var(--background-elevated, white); cursor:pointer;
    font-size:.75rem;
  }

  .toggles {
    grid-column: 1 / -1;
    display: flex; align-items: center; gap: .75rem; padding-top: .25rem;
  }
  .check { display: inline-flex; align-items: center; gap: .5rem; }
  .mode {
    padding: .4rem .7rem; border-radius: .5rem; cursor: pointer;
    border: 1px solid var(--border-default-color, #d1d5db);
    background: var(--background-elevated, white);
  }

  /* Grid of icon cards */
  .grid {
    display: grid;
    gap: .75rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  /* Each card */
  :global(.item) {
    display:grid;
    grid-template-rows: 1fr auto;
    min-height: 120px;
  }

  /* Perfect centering */
  .preview {
    display: grid;
    place-items: center;
    min-height: 72px;
  }
  .preview :global(svg) {
    display: block;
  }

  .meta {
    margin-top: .25rem;
    display: grid; gap: .15rem;
  }
  .name {
    font-size: .875rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sub {
    font-size: .75rem; opacity: .7; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .empty {
    grid-column: 1 / -1;
    opacity: .7;
    padding: .75rem 0;
  }
</style>



