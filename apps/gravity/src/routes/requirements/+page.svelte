<script lang="ts">
  import { goto } from '$app/navigation';
  import { navigating } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  type RequirementListItem = PageData['items'][number];

  const STATUS = ['DRAFT', 'ACTIVE', 'BLOCKED', 'DONE'] as const;
  const PRIORITY = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

  let status = data.filters.status ?? '';
  let priority = data.filters.priority ?? '';
  let ownerId = data.filters.ownerId ?? '';
  let dueAfter = data.filters.dueAfter ?? '';
  let dueBefore = data.filters.dueBefore ?? '';

  // Track whether UI differs from URL-provided filter state (for disabling Apply)
  $: isDirty =
    status !== (data.filters.status ?? '') ||
    priority !== (data.filters.priority ?? '') ||
    ownerId !== (data.filters.ownerId ?? '') ||
    dueAfter !== (data.filters.dueAfter ?? '') ||
    dueBefore !== (data.filters.dueBefore ?? '');

  function setParamsAndGo(opts?: { replace?: boolean }) {
    const u = new URL(window.location.href);

    u.searchParams.set('workspaceId', data.workspaceId);

    if (status) u.searchParams.set('status', status);
    else u.searchParams.delete('status');

    if (priority) u.searchParams.set('priority', priority);
    else u.searchParams.delete('priority');

    if (ownerId.trim()) u.searchParams.set('ownerId', ownerId.trim());
    else u.searchParams.delete('ownerId');

    if (dueAfter) u.searchParams.set('dueAfter', dueAfter);
    else u.searchParams.delete('dueAfter');

    if (dueBefore) u.searchParams.set('dueBefore', dueBefore);
    else u.searchParams.delete('dueBefore');

    // reset pagination when filters change
    u.searchParams.set('offset', '0');

    goto(`${u.pathname}?${u.searchParams.toString()}`, {
      keepFocus: true,
      replaceState: opts?.replace ?? false
    });
  }

  function applyFilters() {
    setParamsAndGo();
  }

  function clearFilters() {
    status = '';
    priority = '';
    ownerId = '';
    dueAfter = '';
    dueBefore = '';
    setParamsAndGo();
  }

  function fmtDate(iso: string | null) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString();
  }

  function ownerLabel(r: RequirementListItem) {
    const o = (r as any).owner ?? null;
    return o?.name || o?.email || (r.ownerId ? r.ownerId.slice(0, 8) : '—');
  }

  function rowHref(id: string) {
    const qs = new URLSearchParams();
    qs.set('workspaceId', data.workspaceId);
    return `/requirements/${id}?${qs.toString()}`;
  }

  function prevPage() {
    const u = new URL(window.location.href);
    const cur = Number(u.searchParams.get('offset') ?? '0');
    const next = Math.max(0, cur - data.limit);
    u.searchParams.set('offset', String(next));
    goto(`${u.pathname}?${u.searchParams.toString()}`);
  }

  function nextPage() {
    if (data.nextOffset == null) return;
    const u = new URL(window.location.href);
    u.searchParams.set('offset', String(data.nextOffset));
    goto(`${u.pathname}?${u.searchParams.toString()}`);
  }

  // Auto-apply for selects/dates (reduces confusion); ownerId applies on Enter.
  function autoApply() {
    if (typeof window === 'undefined') return;
    applyFilters();
  }
</script>

<svelte:head>
  <title>Requirements</title>
</svelte:head>

<div class="page">
  <div class="container">
    <header class="header">
      <div>
        <h1>Requirements</h1>
        <div class="subtle">
          Workspace: <code>{data.workspaceId}</code>
        </div>
      </div>

      {#if $navigating}
        <div class="subtle">Loading…</div>
      {/if}

      <a class="btn primary" href={`/requirements/new?workspaceId=${data.workspaceId}`}>New</a>
    </header>

    <section class="card">
      <div class="filters">
        <label>
          <span>Status</span>
          <select bind:value={status} on:change={autoApply}>
            <option value="">All</option>
            {#each STATUS as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select bind:value={priority} on:change={autoApply}>
            <option value="">All</option>
            {#each PRIORITY as p}
              <option value={p}>{p}</option>
            {/each}
          </select>
        </label>

        <label>
          <span>Owner (id)</span>
          <input
            bind:value={ownerId}
            placeholder="ownerId…"
            on:keydown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </label>

        <label>
          <span>Due after</span>
          <input type="date" bind:value={dueAfter} on:change={autoApply} />
        </label>

        <label>
          <span>Due before</span>
          <input type="date" bind:value={dueBefore} on:change={autoApply} />
        </label>
      </div>

      <div class="actions">
        <button class="btn primary" type="button" on:click={applyFilters} disabled={!isDirty}>
          Apply
        </button>
        <button class="btn" type="button" on:click={clearFilters} disabled={!status && !priority && !ownerId && !dueAfter && !dueBefore}>
          Clear
        </button>

        <div class="hint">
          Tip: selects & dates auto-apply • Owner applies on <kbd>Enter</kbd>
        </div>
      </div>

      {#if data.error}
        <div class="error">{data.error}</div>
      {/if}
    </section>

    {#if !data.error && data.items.length === 0}
      <section class="empty">
        <div class="empty-title">No requirements yet</div>
        <div class="subtle">Create your first Requirement to start planning work.</div>
      </section>
    {:else if data.items.length > 0}
      <section class="tableWrap">
        <table>
          <thead>
            <tr>
              <th class="colTitle">Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th class="colOwner">Owner</th>
              <th class="colDue">Due</th>
            </tr>
          </thead>
          <tbody>
            {#each data.items as r (r.id)}
              <tr>
                <td class="colTitle">
                  <a class="rowLink" href={rowHref(r.id)}>{r.title}</a>
                </td>
                <td><span class="pill">{r.status}</span></td>
                <td><span class="pill">{r.priority}</span></td>
                <td class="colOwner">{ownerLabel(r)}</td>
                <td class="colDue">{fmtDate(r.dueDate)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>

      <footer class="pager">
        <button class="btn" type="button" on:click={prevPage} disabled={data.offset === 0}>Prev</button>
        <div class="subtle">Showing {data.items.length} • offset {data.offset}</div>
        <button class="btn" type="button" on:click={nextPage} disabled={data.nextOffset == null}>Next</button>
      </footer>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 24px;
  }
  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    gap: 14px;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  h1 {
    margin: 0;
    font-size: 20px;
  }
  .subtle {
    font-size: 12px;
    opacity: 0.75;
  }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
  }

  .card {
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    gap: 10px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(6px);
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 10px;
  }

  label {
    display: grid;
    gap: 6px;
  }
  label > span {
    font-size: 12px;
    opacity: 0.8;
  }

  input, select {
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.25);
    color: inherit;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid rgba(255,255,255,0.10);
    padding-top: 10px;
  }
  .hint {
    margin-left: auto;
    font-size: 12px;
    opacity: 0.7;
  }
  kbd {
    padding: 2px 6px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.06);
    font-size: 11px;
  }

  .btn {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.06);
    color: inherit;
    cursor: pointer;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn.primary {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.22);
  }

  .error {
    color: #ffb4b4;
    font-size: 13px;
  }

  .empty {
    border: 1px dashed rgba(255,255,255,0.14);
    border-radius: 12px;
    padding: 18px;
    background: rgba(255,255,255,0.02);
  }
  .empty-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .tableWrap {
    overflow: auto;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    text-align: left;
    font-size: 13px;
  }
  th {
    font-size: 12px;
    opacity: 0.85;
    background: rgba(255,255,255,0.03);
  }

  .colTitle { width: 50%; }
  .colOwner { width: 220px; }
  .colDue { width: 140px; }

  .rowLink {
    color: inherit;
    text-decoration: none;
  }
  .rowLink:hover {
    text-decoration: underline;
  }

  .pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
    font-size: 12px;
  }

  .pager {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>

