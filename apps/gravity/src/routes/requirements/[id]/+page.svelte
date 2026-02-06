<script lang="ts">
  import { navigating, page } from '$app/stores';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { SubmitFunction } from '@sveltejs/kit';

  import SectionPanel from '$lib/components/detail/SectionPanel.svelte';
  import { toast } from '$lib/stores/toast';

  export let data: {
    workspaceId: string;
    requirement: any;
    availableSources: Array<{
      id: string;
      title: string;
      type: string;
      url: string | null;
      createdAt?: string | Date;
    }>;
  };

  // reactive so it updates after invalidateAll()
  let r: any;
  $: r = data.requirement;

  // Saved toast (edit form redirect -> detail?updated=1)
  onMount(() => {
    const updated = $page.url.searchParams.get('updated') === '1';
    if (!updated) return;

    toast.success('Saved');

    const u = new URL(window.location.href);
    u.searchParams.delete('updated');
    history.replaceState({}, '', u.toString());
  });

  const fmtDate = (value: any) => {
    if (!value) return '—';
    const d = typeof value === 'string' ? new Date(value) : value;
    if (Number.isNaN(d?.getTime?.())) return '—';
    return d.toLocaleDateString();
  };

  // ---- Link Sources modal state ----
  let addOpen = false;
  let q = '';
  let modalMessage = '';

  $: filteredSources =
    (data.availableSources ?? []).filter((s) => {
      const hay = `${s.title} ${s.id} ${s.url ?? ''}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });

  const linkSubmit: SubmitFunction = () => {
    modalMessage = '';
    return async ({ result, update }) => {
      if (result.type === 'failure') {
        const payload = result.data as any;
        modalMessage = payload?.message ?? 'Could not link Sources.';
        await update({ reset: false });
        return;
      }

      await update(); // apply action
      toast.success('Sources linked');
      addOpen = false;
      q = '';
      modalMessage = '';
      await invalidateAll(); // refresh requirement.sources + availableSources
    };
  };
</script>

<div class="wrap">
  <header class="top">
    <div class="titleRow">
      <div>
        <p class="kicker">Requirement</p>
        <h1 class="title">
          {#if $navigating}
            <span class="skeleton skeleton--title" aria-hidden="true"></span>
            <span class="sr-only">Loading…</span>
          {:else}
            {r?.title}
          {/if}
        </h1>
      </div>

      <div class="actions">
        <a class="btn" href={`/requirements/${r.id}/edit?workspaceId=${data.workspaceId}`}>Edit</a>
      </div>
    </div>

    <div class="pills" aria-label="Requirement summary fields">
      <span class="pill"><span class="pill__k">Status</span> {r?.status ?? '—'}</span>
      <span class="pill"><span class="pill__k">Priority</span> {r?.priority ?? '—'}</span>
    </div>
  </header>

  <div class="grid">
    <main class="main">
      <section class="card" aria-label="Requirement description">
        <h2 class="h2">Description</h2>
        <div class="desc">
          {#if r?.description}
            {r.description}
          {:else}
            <span class="muted">No description yet.</span>
          {/if}
        </div>
      </section>
    </main>

    <aside class="side">
      <section class="card" aria-label="Requirement fields">
        <h2 class="h2">Fields</h2>
        <dl class="dl">
          <div class="row"><dt>Status</dt><dd>{r?.status ?? '—'}</dd></div>
          <div class="row"><dt>Priority</dt><dd>{r?.priority ?? '—'}</dd></div>
          <div class="row"><dt>Owner</dt><dd>{r?.ownerId ?? '—'}</dd></div>
          <div class="row"><dt>Due date</dt><dd>{fmtDate(r?.dueDate)}</dd></div>
        </dl>
      </section>
    </aside>
  </div>

  <div class="panels">
    <!-- Derived from Sources -->
   <SectionPanel
  title="Derived from Sources"
  count={r?.sources?.length ?? 0}
  emptyText="No sources linked yet"
  hint=""
>
  <svelte:fragment slot="actions">
    <button class="btn" type="button" on:click={() => (addOpen = true)}>Add Source</button>
  </svelte:fragment>

  <ul class="list">
    {#each r.sources as s (s.id)}
      <li class="item">
        <div class="item__title">{s.title ?? s.id}</div>
        <div class="item__meta">
          {#if s.type}<span class="mono">{s.type}</span>{/if}
          <span class="mono">{s.id}</span>
        </div>
        {#if s.url}
          <div class="item__url">{s.url}</div>
        {/if}
      </li>
    {/each}
  </ul>
</SectionPanel>


    <SectionPanel
      title="Implementing Tasks"
      count={r?.tasks?.length ?? 0}
      emptyText="No tasks linked yet"
      hint=""
    >
      <ul class="list">
        {#each r.tasks as t (t.id)}
          <li class="item">
            <div class="item__title">{t.id}</div>
          </li>
        {/each}
      </ul>
    </SectionPanel>

    <SectionPanel
      title="Documentation Pages"
      count={r?.pages?.length ?? 0}
      emptyText="No pages linked yet"
      hint=""
    >
      <ul class="list">
        {#each r.pages as p (p.id)}
          <li class="item">
            <div class="item__title">{p.id}</div>
          </li>
        {/each}
      </ul>
    </SectionPanel>

    <SectionPanel
      title="Evidence"
      count={r?.evidence?.length ?? 0}
      emptyText="No evidence linked yet"
      hint=""
    >
      <ul class="list">
        {#each r.evidence as e (e.id)}
          <li class="item">
            <div class="item__title">{e.id}</div>
          </li>
        {/each}
      </ul>
    </SectionPanel>
  </div>
</div>

<!-- Add Sources Modal -->
{#if addOpen}
  <div class="backdrop" role="presentation" on:click={() => (addOpen = false)}></div>

  <div class="modal" role="dialog" aria-modal="true" aria-label="Add Sources">
    <div class="modal__head">
      <div>
        <div class="kicker">Provenance</div>
        <h2 class="h2" style="margin: 0;">Link Sources</h2>
      </div>
      <button class="iconBtn" type="button" aria-label="Close" on:click={() => (addOpen = false)}>×</button>
    </div>

    <div class="modal__body">
      <input class="input" placeholder="Search sources…" bind:value={q} />

      {#if modalMessage}
        <div class="banner">{modalMessage}</div>
      {/if}

      <form method="POST" action="?/linkSources" use:enhance={linkSubmit}>
        <div class="picker">
          {#if filteredSources.length === 0}
            <div class="muted">No available sources (already linked or none in workspace).</div>
          {:else}
            {#each filteredSources as s (s.id)}
              <label class="pickRow">
                <input type="checkbox" name="sourceIds" value={s.id} />
                <div class="pickText">
                  <div class="pickTitle">{s.title}</div>
                  <div class="pickMeta">
                    <span class="mono">{s.type}</span>
                    {#if s.url}<span class="mono">{s.url}</span>{/if}
                  </div>
                </div>
              </label>
            {/each}
          {/if}
        </div>

        <div class="modal__foot">
          <button class="btn btn--ghost" type="button" on:click={() => (addOpen = false)}>Cancel</button>
          <button class="btn btn--primary" type="submit">Link selected</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }

  .wrap { padding: 18px; max-width: 1200px; margin: 0 auto; }
  .top { margin-bottom: 14px; }
  .kicker { margin: 0 0 4px; font-size: 12px; opacity: 0.7; letter-spacing: 0.2px; }
  .title { margin: 0; font-size: 22px; line-height: 1.2; }

  .titleRow { display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; flex-wrap: wrap; }
  .actions { display:flex; gap: 8px; }

  .btn {
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255,255,255,0.04);
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }
  .btn--primary { background: rgba(120,180,255,0.20); border-color: rgba(120,180,255,0.35); }
  .btn--ghost { background: transparent; }

  .pills { display:flex; gap:8px; margin-top: 10px; flex-wrap: wrap; }
  .pill { font-size: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--gp-border, rgba(255,255,255,0.12)); background: rgba(255,255,255,0.04); }
  .pill__k { opacity: 0.7; margin-right: 6px; }

  .grid { display:grid; grid-template-columns: 1.4fr 0.9fr; gap: 12px; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }

  .card {
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: var(--gp-surface, rgba(255,255,255,0.03));
    border-radius: 12px;
    padding: 14px;
  }
  .h2 { margin: 0 0 10px; font-size: 14px; letter-spacing: 0.2px; }
  .desc { font-size: 14px; line-height: 1.5; white-space: pre-wrap; }

  .dl { margin: 0; display: grid; gap: 10px; }
  .row { display:grid; grid-template-columns: 120px 1fr; gap: 10px; align-items: baseline; }
  dt { font-size: 12px; opacity: 0.75; }
  dd { margin: 0; font-size: 13px; }

  .muted { opacity: 0.75; }

  .panels { margin-top: 12px; display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 900px) { .panels { grid-template-columns: 1fr; } }

  .list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
  .item { padding: 10px 10px; border: 1px solid var(--gp-border, rgba(255,255,255,0.12)); border-radius: 10px; background: rgba(255,255,255,0.02); }
  .item__title { font-size: 13px; }
  .item__meta { display:flex; gap: 8px; margin-top: 6px; opacity: 0.85; flex-wrap: wrap; }
  .item__url { margin-top: 6px; font-size: 12px; opacity: 0.75; word-break: break-word; }
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; }

  .skeleton { display: inline-block; border-radius: 10px; background: rgba(255,255,255,0.08); animation: pulse 1.2s ease-in-out infinite; }
  .skeleton--title { width: 420px; max-width: 72vw; height: 24px; vertical-align: middle; }
  @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }

  /* Modal */
  .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 9998; }
  .modal {
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    width: min(760px, calc(100vw - 24px));
    border-radius: 14px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(20,20,24,0.96);
    backdrop-filter: blur(10px);
    z-index: 9999;
    overflow: clip;
  }
  .modal__head {
    display:flex;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--gp-border, rgba(255,255,255,0.12));
  }
  .modal__body { padding: 12px 14px; display: grid; gap: 10px; }
  .modal__foot { display:flex; justify-content: flex-end; gap: 10px; padding-top: 10px; }
  .iconBtn { border: 0; background: transparent; color: inherit; opacity: .7; cursor: pointer; font-size: 18px; padding: 4px 8px; }
  .iconBtn:hover { opacity: 1; }

  .input {
    width: 100%;
    font-size: 13px;
    padding: 10px 10px;
    border-radius: 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.14));
    background: rgba(255,255,255,0.04);
    color: inherit;
  }

  .picker {
    max-height: 45vh;
    overflow: auto;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.10));
    border-radius: 12px;
    padding: 8px;
    background: rgba(255,255,255,0.02);
  }
  .pickRow {
    display:flex;
    gap: 10px;
    align-items:flex-start;
    padding: 8px 8px;
    border-radius: 10px;
    cursor: pointer;
  }
  .pickRow:hover { background: rgba(255,255,255,0.04); }
  .pickText { display:grid; gap: 2px; }
  .pickTitle { font-size: 13px; }
  .pickMeta { display:flex; gap: 8px; opacity: 0.75; flex-wrap: wrap; }

  .banner {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255, 120, 120, 0.10);
    font-size: 13px;
  }
</style>

