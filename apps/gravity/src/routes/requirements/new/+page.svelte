<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import { readErrorMessage } from '$lib/client/http';

  export let data: PageData;

  const STATUS = ['DRAFT', 'ACTIVE', 'BLOCKED', 'DONE'] as const;
  const PRIORITY = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

  type Status = (typeof STATUS)[number];
  type Priority = (typeof PRIORITY)[number];

  let title = '';
  let body = '';
  let status: Status = 'DRAFT';
  let priority: Priority = 'MEDIUM';
  let ownerId = '';
  let dueDate = ''; // YYYY-MM-DD from <input type="date">

  let submitting = false;

  // error UX
  let formError: string | null = null;
  let fieldErrors: Record<string, string> = {};

  function validateClient() {
    const fe: Record<string, string> = {};
    if (!title.trim()) fe.title = 'Title is required';
    fieldErrors = fe;
    formError = null;
    return Object.keys(fe).length === 0;
  }

  function setServerErrors(resBody: any) {
    // expected shape: { error: { message, fieldErrors? } }
    const err = resBody?.error ?? null;
    formError = err?.message ?? 'Request failed.';
    fieldErrors = err?.fieldErrors ?? {};
  }

  async function submit() {
    if (!validateClient()) return;

    submitting = true;
    formError = null;
    fieldErrors = {};

    const workspaceId = data.workspaceId;

    const payload = {
      title: title.trim(),
      body: body.trim() ? body.trim() : undefined,
      status,      // optional but fine; backend has defaults too
      priority,    // optional but fine; backend has defaults too
      ownerId: ownerId.trim() ? ownerId.trim() : undefined,
      dueDate: dueDate ? dueDate : undefined
    };

    const res = await fetch(`/api/requirements?workspaceId=${encodeURIComponent(workspaceId)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // Prefer structured fieldErrors if present
      const bodyJson = await res.json().catch(() => null);
      if (bodyJson?.error) setServerErrors(bodyJson);
      else formError = await readErrorMessage(res);
      submitting = false;
      return;
    }

    const ok = await res.json().catch(() => null);
    const id = ok?.id as string | undefined;

    submitting = false;

    if (!id) {
      formError = 'Created, but missing id in response.';
      return;
    }

    // Success behavior: go to detail page
    await goto(`/requirements/${id}?workspaceId=${encodeURIComponent(workspaceId)}`);
  }

  function cancel() {
    goto(`/requirements?workspaceId=${encodeURIComponent(data.workspaceId)}`);
  }
</script>

<svelte:head>
  <title>New Requirement</title>
</svelte:head>

<div class="page">
  <div class="container">
    <header class="header">
      <div>
        <h1>Create Requirement</h1>
        <div class="subtle">
          Workspace: <code>{data.workspaceId}</code>
        </div>
      </div>

      <div class="actions">
        <button class="btn" type="button" on:click={cancel} disabled={submitting}>Cancel</button>
        <button class="btn primary" type="button" on:click={submit} disabled={submitting}>
          {submitting ? 'Creating…' : 'Create'}
        </button>
      </div>
    </header>

    <section class="card">
      {#if formError}
        <div class="error">{formError}</div>
      {/if}

      <div class="grid">
        <label class="field span2">
          <span>Title <span class="req">*</span></span>
          <input
            bind:value={title}
            placeholder="Short requirement title…"
            aria-invalid={fieldErrors.title ? 'true' : 'false'}
          />
          {#if fieldErrors.title}
            <div class="fieldError">{fieldErrors.title}</div>
          {/if}
        </label>

        <label class="field">
          <span>Status</span>
          <select bind:value={status}>
            {#each STATUS as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
          {#if fieldErrors.status}
            <div class="fieldError">{fieldErrors.status}</div>
          {/if}
        </label>

        <label class="field">
          <span>Priority</span>
          <select bind:value={priority}>
            {#each PRIORITY as p}
              <option value={p}>{p}</option>
            {/each}
          </select>
          {#if fieldErrors.priority}
            <div class="fieldError">{fieldErrors.priority}</div>
          {/if}
        </label>

        <label class="field">
          <span>Owner (id)</span>
          <input bind:value={ownerId} placeholder="optional ownerId…" />
          {#if fieldErrors.ownerId}
            <div class="fieldError">{fieldErrors.ownerId}</div>
          {/if}
        </label>

        <label class="field">
          <span>Due date</span>
          <input type="date" bind:value={dueDate} />
          {#if fieldErrors.dueDate}
            <div class="fieldError">{fieldErrors.dueDate}</div>
          {/if}
        </label>

        <label class="field span2">
          <span>Description</span>
          <textarea bind:value={body} rows="6" placeholder="Optional description / notes…"></textarea>
          {#if fieldErrors.body}
            <div class="fieldError">{fieldErrors.body}</div>
          {/if}
        </label>
      </div>

      <div class="footer">
        <div class="subtle">
          Title is required. Status/Priority default if not set.
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .page { padding: 24px; }
  .container { max-width: 920px; margin: 0 auto; display: grid; gap: 14px; }

  .header { display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; }
  h1 { margin: 0; font-size: 20px; }
  .subtle { font-size: 12px; opacity: 0.75; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; }

  .actions { display:flex; gap: 10px; }

  .card {
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    gap: 12px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(6px);
  }

  .error { color: #ffb4b4; font-size: 13px; }

  .grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .span2 { grid-column: span 2; }

  .field { display:grid; gap: 6px; }
  .field > span { font-size: 12px; opacity: 0.8; }
  .req { opacity: 1; }

  input, select, textarea {
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.25);
    color: inherit;
  }
  textarea { resize: vertical; }

  .fieldError { color: #ffb4b4; font-size: 12px; opacity: 0.95; }

  .btn {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.06);
    color: inherit;
    cursor: pointer;
  }
  .btn.primary {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.22);
  }
  .btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .footer { display:flex; justify-content: space-between; align-items:center; }
</style>
