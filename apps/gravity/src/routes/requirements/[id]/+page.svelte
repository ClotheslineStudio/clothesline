<script lang="ts">
  import { navigating } from '$app/stores';
  import SectionPanel from '$lib/components/detail/SectionPanel.svelte';
   import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { toast } from '$lib/stores/toast';

  export let data: {
    workspaceId: string;
    requirement: any;
  };

  onMount(() => {
    const updated = $page.url.searchParams.get('updated') === '1';
    if (!updated) return;

    toast.success('Saved');

    // remove ?updated=1 so it doesn't re-toast on refresh
    const u = new URL(window.location.href);
    u.searchParams.delete('updated');
    history.replaceState({}, '', u.toString());
    });


  const r = data.requirement;

  const fmtDate = (value: any) => {
    if (!value) return '—';
    const d = typeof value === 'string' ? new Date(value) : value;
    if (Number.isNaN(d?.getTime?.())) return '—';
    return d.toLocaleDateString();
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
            {r.title}
          {/if}
        </h1>
      </div>

      <div class="actions">
        <a class="btn" href={`/requirements/${r.id}/edit?workspaceId=${data.workspaceId}`}>Edit</a>
      </div>
    </div>

    <div class="pills" aria-label="Requirement summary fields">
      <span class="pill"><span class="pill__k">Status</span> {r.status ?? '—'}</span>
      <span class="pill"><span class="pill__k">Priority</span> {r.priority ?? '—'}</span>
    </div>
  </header>

  <div class="grid">
    <main class="main">
      <section class="card" aria-label="Requirement description">
        <h2 class="h2">Description</h2>
        <div class="desc">
          {#if r.description}
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
          <div class="row"><dt>Status</dt><dd>{r.status ?? '—'}</dd></div>
          <div class="row"><dt>Priority</dt><dd>{r.priority ?? '—'}</dd></div>
          <div class="row"><dt>Owner</dt><dd>{r.ownerId ?? '—'}</dd></div>
          <div class="row"><dt>Due date</dt><dd>{fmtDate(r.dueDate)}</dd></div>
        </dl>
      </section>
    </aside>
  </div>

  <div class="panels">
    <SectionPanel
      title="Derived from Sources"
      count={r.sources?.length ?? 0}
      emptyText="No sources linked yet"
      hint=""
    >
      <ul class="list">
        {#each r.sources as s (s.id)}
          <li class="item">
            <div class="item__title">{s.id}</div>
          </li>
        {/each}
      </ul>
    </SectionPanel>

    <SectionPanel
      title="Implementing Tasks"
      count={r.tasks?.length ?? 0}
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
      count={r.pages?.length ?? 0}
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
      count={r.evidence?.length ?? 0}
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
  }

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

  .skeleton { display: inline-block; border-radius: 10px; background: rgba(255,255,255,0.08); animation: pulse 1.2s ease-in-out infinite; }
  .skeleton--title { width: 420px; max-width: 72vw; height: 24px; vertical-align: middle; }
  @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
</style>
