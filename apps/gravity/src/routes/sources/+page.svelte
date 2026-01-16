<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  // import { prefetch } from '@sveltejs/kit';

  type SourceType = 'PDF' | 'URL';

  type Source = {
    id: string;
    workspaceId: string;
    title: string;
    type: SourceType;
    url: string | null;
    fileOriginalName: string | null;
    fileSizeBytes: number | null;
    createdAt: string; // ISO
  };

  let status: 'idle' | 'loading' | 'loaded' | 'error' = 'idle';
  let errorMsg = '';

  let sources: Source[] = [];

  // UI controls
  let typeFilter: 'all' | SourceType = 'all';
  let query = '';

  // v1: read workspaceId from querystring, default to ws_demo
  $: workspaceId = $page.url.searchParams.get('workspaceId') ?? 'ws_demo';

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function formatBytes(bytes: number | null) {
    if (!bytes || bytes <= 0) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let v = bytes;
    while (v >= 1024 && i < units.length - 1) {
      v /= 1024;
      i++;
    }
    return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
  }

  function badgeClasses(type: SourceType) {
    const base = 'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium';
    if (type === 'PDF') return `${base} border-amber-200/50 bg-amber-500/10 text-amber-200`;
    return `${base} border-sky-200/50 bg-sky-500/10 text-sky-200`;
  }

  async function loadSources() {
    status = 'loading';
    errorMsg = '';

    try {
      const params = new URLSearchParams();
      params.set('workspaceId', workspaceId);
      params.set('limit', '50');
      if (typeFilter !== 'all') params.set('type', typeFilter);

      const res = await fetch(`/api/sources?${params.toString()}`);
      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      // expecting { sources: [...] } from your list route
      sources = (json.sources ?? []) as Source[];

      status = 'loaded';
    } catch (e) {
      status = 'error';
      errorMsg = e instanceof Error ? e.message : 'Unknown error';
    }
  }

  // Client-side search filter (even if type is server-filtered)
  $: q = query.trim().toLowerCase();
  $: visible =
    sources
      .filter((s) => {
        if (!q) return true;
        return (
          s.title.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          (s.url ?? '').toLowerCase().includes(q) ||
          (s.fileOriginalName ?? '').toLowerCase().includes(q)
        );
      })
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  onMount(() => {
    loadSources();
  });

  // Reload when filter changes (keeps it simple and matches backend)
  $: if (status !== 'idle') {
    // only rerun after mount has happened at least once
    // (this avoids SSR-time firing)
    // eslint-disable-next-line no-unused-expressions
    typeFilter;
  }
</script>

<div class="min-h-screen bg-zinc-950 text-zinc-100">
  <div class="mx-auto max-w-6xl px-4 py-6">
    <!-- Header -->
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div class="text-xs text-zinc-400">Workspace · {workspaceId}</div>
        <h1 class="mt-1 text-2xl font-semibold tracking-tight">Sources</h1>
        <p class="mt-1 text-sm text-zinc-400">Newest-first list of URL and PDF sources.</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10"
          on:click={() => loadSources()}
        >
          Refresh
        </button>

        <a
          class="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:opacity-95"
          href="/_dev/source-upload?workspaceId={workspaceId}"
        >
          Add Source
        </a>
      </div>
    </header>

    <!-- Controls -->
    <section
      class="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <input
          class="w-full rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
          placeholder="Search title, id, URL…"
          bind:value={query}
        />

        <div class="flex items-center gap-2">
          <label for="typeFilter" class="text-xs text-zinc-400">Type</label>
          <select
            id="typeFilter"
            class="rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-white/20"
            bind:value={typeFilter}
            on:change={() => loadSources()}
          >
            <option value="all">All</option>
            <option value="PDF">PDF</option>
            <option value="URL">URL</option>
          </select>
        </div>
      </div>

      <div class="text-sm text-zinc-400">
        Showing
        <span class="text-zinc-200">{status === 'loading' ? '…' : visible.length}</span>
        /
        <span class="text-zinc-200">50</span>
      </div>
    </section>

    <!-- List -->
    <section class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-sm font-medium text-zinc-200">All Sources</h2>
        <div class="text-xs text-zinc-500">Sorted: createdAt desc</div>
      </div>

      {#if status === 'loading'}
        <div class="space-y-3">
          {#each Array(6) as _}
            <div class="grid grid-cols-[auto,1fr,auto] items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div class="h-5 w-12 rounded-full bg-white/10"></div>
              <div class="space-y-2">
                <div class="h-4 w-2/3 rounded bg-white/10"></div>
                <div class="h-3 w-1/3 rounded bg-white/10"></div>
              </div>
              <div class="h-3 w-32 rounded bg-white/10"></div>
            </div>
          {/each}
        </div>
      {:else if status === 'error'}
        <div class="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200">
          <div class="font-medium">Failed to load sources</div>
          <div class="mt-1 opacity-90">{errorMsg}</div>
          <button
            class="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-100 hover:bg-white/10"
            on:click={() => loadSources()}
          >
            Try again
          </button>
        </div>
      {:else if sources.length === 0}
        <!-- Empty workspace state -->
        <div class="rounded-2xl border border-dashed border-white/15 bg-zinc-950/20 p-8 text-center">
          <div class="text-base font-medium">No Sources yet</div>
          <p class="mt-1 text-sm text-zinc-400">Add a URL or upload a PDF to get started.</p>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <a class="rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950" href="/_dev/source/url?workspaceId={workspaceId}">
              Add URL Source
            </a>
            <a class="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10" href="/_dev/source-upload?workspaceId={workspaceId}">
              Upload PDF
            </a>
          </div>
        </div>
      {:else if visible.length === 0}
        <!-- No-results state -->
        <div class="rounded-2xl border border-dashed border-white/15 bg-zinc-950/20 p-8 text-center">
          <div class="text-base font-medium">No results</div>
          <p class="mt-1 text-sm text-zinc-400">Try clearing your search or changing the type filter.</p>
          <div class="mt-4 flex justify-center">
            <button
              class="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
              on:click={() => {
                query = '';
                typeFilter = 'all';
                loadSources();
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      {:else}
        <div class="space-y-2">
          {#each visible as s (s.id)}
            <a
              class="group grid w-full grid-cols-[auto,1fr,auto] items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/20 px-4 py-3 text-left transition hover:border-white/15 hover:bg-white/5"
              href={`/sources/${s.id}?workspaceId=${workspaceId}`}
              use:prefetch
            >
              <span class={badgeClasses(s.type)}>{s.type}</span>

              <div class="min-w-0">
                <div class="truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                  {s.title}
                </div>
                <div class="mt-0.5 truncate text-xs text-zinc-500">
                  {s.type === 'URL' ? s.url : s.fileOriginalName}
                </div>
              </div>

              <div class="text-right">
                <div class="text-xs text-zinc-400">{formatDate(s.createdAt)}</div>
                <div class="mt-0.5 text-xs text-zinc-500">
                  {s.type === 'PDF' ? formatBytes(s.fileSizeBytes) : '\u00A0'}
                </div>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>
