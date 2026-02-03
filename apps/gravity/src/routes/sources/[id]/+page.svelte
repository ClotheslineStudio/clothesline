<script lang="ts">
  import { navigating } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data: {
    source: any;
    workspaceId: string;
  };

  const s = () => data.source;
  let showPreview = false;

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleString();
  }

  function fmtBytes(bytes?: number | null) {
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

  $: fileUrl = `/api/sources/${encodeURIComponent(s().id)}/file?workspaceId=${encodeURIComponent(
    data.workspaceId
  )}`;
</script>

<div class="mx-auto max-w-4xl px-6 py-8">
  <div class="mb-6 flex items-start justify-between gap-4">
    <div>
      <div class="text-sm text-zinc-500">Workspace: {data.workspaceId}</div>
      <h1 class="mt-1 text-2xl font-semibold">{s().title}</h1>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        <span class="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium">
          {s().type}
        </span>
        <span>Created: {fmtDate(s().createdAt)}</span>
        <span class="text-zinc-400">•</span>
        <span>ID: {s().id}</span>
      </div>
    </div>

    <button
      class="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      on:click={() => goto(`/sources?workspaceId=${encodeURIComponent(data.workspaceId)}`)}
      type="button"
    >
      Back to Sources
    </button>
  </div>

  {#if $navigating}
    <div class="rounded-xl border border-zinc-200 bg-white p-6">
      <div class="h-4 w-40 rounded bg-zinc-100"></div>
      <div class="mt-3 h-4 w-2/3 rounded bg-zinc-100"></div>
      <div class="mt-2 h-4 w-1/2 rounded bg-zinc-100"></div>
    </div>
  {:else}
    <!-- Metadata / Content -->
    <div class="grid gap-6">
      <div class="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 class="text-sm font-medium text-zinc-900">Source</h2>

        {#if s().type === 'URL'}
          <div class="mt-4 grid gap-2">
            <div class="text-sm text-zinc-700">External link</div>
            <div class="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 break-all">
              {s().url}
            </div>
            <div class="mt-2">
              <a
                class="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:opacity-95"
                href={s().url}
                target="_blank"
                rel="noreferrer"
              >
                Open URL
              </a>
            </div>
          </div>
        {:else}
          <div class="mt-4 grid gap-2">
            <div class="text-sm text-zinc-700">File</div>
            <div class="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
              <div class="font-medium">{s().fileOriginalName ?? 'PDF'}</div>
              <div class="text-xs text-zinc-500">Size: {fmtBytes(s().fileSizeBytes)}</div>
            </div>

            <div class="mt-2 flex flex-wrap gap-2">
              <a
                class="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:opacity-95"
                href={fileUrl}
              >
                Download PDF
              </a>

              <button
                class="inline-flex rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                type="button"
                on:click={() => (showPreview = !showPreview)}
              >
                {showPreview ? 'Hide preview' : 'Show preview'}
              </button>
            </div>

            {#if showPreview}
              <div class="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                <iframe class="h-[70vh] w-full" src={fileUrl} title="PDF preview"></iframe>
              </div>
              <p class="mt-2 text-xs text-zinc-500">
                Preview is optional; if the browser blocks it, download will still work.
              </p>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Related Requirements placeholder -->
      <div class="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 class="text-sm font-medium text-zinc-900">Related Requirements</h2>
        <div class="mt-3 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
          No related requirements yet. Once Requirements are linked to this Source, they’ll appear here.
        </div>
      </div>
    </div>
  {/if}
</div>
