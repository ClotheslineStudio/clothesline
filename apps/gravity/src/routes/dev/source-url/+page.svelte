<script lang="ts">
  let workspaceId = '';
  let title = '';
  let url = '';

  let error = '';
  let created: any = null;
  let isSubmitting = false;

  async function createUrlSource() {
    error = '';
    created = null;

    if (!workspaceId.trim()) {
      error = 'Workspace ID is required.';
      return;
    }
    if (!title.trim()) {
      error = 'Title is required for v1.';
      return;
    }
    if (!url.trim()) {
      error = 'URL is required.';
      return;
    }

    isSubmitting = true;
    try {
      const res = await fetch('/api/sources/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workspaceId: workspaceId.trim(),
          title: title.trim(),
          url: url.trim()
        })
      });

      if (!res.ok) {
        error = await res.text();
        return;
      }

      created = await res.json();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Request failed.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<h1>Dev: Create URL Source</h1>

<div style="display: grid; gap: 12px; max-width: 720px;">
  <label>
    <div>Workspace ID</div>
    <input bind:value={workspaceId} placeholder="ws_..." style="width: 100%; padding: 8px;" />
  </label>

  <label>
    <div>Title</div>
    <input bind:value={title} placeholder="User-entered title (v1)" style="width: 100%; padding: 8px;" />
  </label>

  <label>
    <div>URL</div>
    <input bind:value={url} placeholder="https://example.com" style="width: 100%; padding: 8px;" />
  </label>

  <button on:click={createUrlSource} disabled={isSubmitting} style="padding: 10px 12px;">
    {isSubmitting ? 'Creating…' : 'Create URL Source'}
  </button>

  {#if error}
    <p style="color: red; white-space: pre-wrap;">{error}</p>
  {/if}

  {#if created}
    <h2>Created Source</h2>
    <pre style="background: rgba(0,0,0,0.06); padding: 12px; overflow: auto;">
{JSON.stringify(created, null, 2)}
    </pre>
  {/if}
</div>
