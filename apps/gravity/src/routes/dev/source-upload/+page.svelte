<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  type SourceRecord = {
    id: string;
    workspaceId: string;
    title: string;
    type: 'URL' | 'PDF';
    url?: string | null;

    fileStorageKey?: string | null;
    fileOriginalName?: string | null;
    fileMimeType?: string | null;
    fileSizeBytes?: number | null;

    notes?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };

  let workspaceId = '';
  let title = '';
  let file: File | null = null;

  let error = '';
  let isUploading = false;

  let created: SourceRecord | null = null;

  onMount(() => {
    if (!browser) return;
    const saved = localStorage.getItem('gravity.dev.workspaceId');
    if (saved) workspaceId = saved;
  });

  async function upload() {
    error = '';
    created = null;

    if (!workspaceId.trim()) {
      error = 'Workspace ID is required.';
      return;
    }
    if (!file) {
      error = 'Pick a PDF first.';
      return;
    }

    isUploading = true;
    try {
      const form = new FormData();
      form.set('workspaceId', workspaceId.trim());
      if (title.trim()) form.set('title', title.trim());
      form.set('file', file);

      const res = await fetch('/api/sources', {
        method: 'POST',
        body: form
      });

      if (!res.ok) {
        error = await res.text();
        return;
      }

      const json = (await res.json()) as SourceRecord;
      created = json;

      if (browser) {
        localStorage.setItem('gravity.dev.workspaceId', workspaceId.trim());
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Upload failed.';
    } finally {
      isUploading = false;
    }
  }
</script>

<h1>Dev: Upload Source PDF</h1>

<div style="display: grid; gap: 12px; max-width: 720px;">
  <label>
    <div>Workspace ID</div>
    <input
      value={workspaceId}
      on:input={(e) => (workspaceId = (e.currentTarget as HTMLInputElement).value)}
      placeholder="ws_..."
      style="width: 100%; padding: 8px;"
    />
    <small>Tip: get this from Prisma Studio (Workspace table).</small>
  </label>

  <label>
    <div>Title (optional)</div>
    <input
      value={title}
      on:input={(e) => (title = (e.currentTarget as HTMLInputElement).value)}
      placeholder="Defaults to the original file name"
      style="width: 100%; padding: 8px;"
    />
  </label>

  <label>
    <div>PDF</div>
    <input
      type="file"
      accept="application/pdf"
      on:change={(e) => (file = (e.currentTarget as HTMLInputElement).files?.[0] ?? null)}
    />
  </label>

  <button on:click={upload} disabled={isUploading || !file} style="padding: 10px 12px;">
    {isUploading ? 'Uploading…' : 'Upload'}
  </button>

  {#if error}
    <p style="color: red; white-space: pre-wrap;">{error}</p>
  {/if}

  {#if created}
    <h2>Created Source</h2>

    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <a href={`/api/sources/${created.id}/file`} target="_blank" rel="noreferrer">
        Open PDF
      </a>

      <span style="opacity: 0.7;">Source ID: {created.id}</span>
    </div>

    <pre style="background: rgba(0,0,0,0.06); padding: 12px; overflow: auto;">
{JSON.stringify(created, null, 2)}
    </pre>
  {/if}
</div>
