<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

  export let data: {
    workspaceId: string;
    requirement: {
      id: string;
      title: string;
      description: string | null; // mapped from DB body
      status: string;
      priority: string;
      ownerId: string | null;
      dueDate: Date | string | null;
    };
  };

  // Helpers
  function toDateInputValue(value: Date | string | null): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  // Form fields (schema expects `body`, not `description`)
  let title = data.requirement.title ?? '';
  let body = data.requirement.description ?? '';

  // Align with your zod enums
  let status = (data.requirement.status ?? 'DRAFT') as 'DRAFT' | 'ACTIVE' | 'BLOCKED' | 'DONE';
  let priority = (data.requirement.priority ?? 'MEDIUM') as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  let ownerId = data.requirement.ownerId ?? '';
  let dueDate = toDateInputValue(data.requirement.dueDate);

  type ActionData = {
    message?: string;
    formError?: string;
    fieldErrors?: Record<string, string[]>;
    values?: Record<string, unknown>;
  };

  let formMessage = '';
  let fieldErrors: Record<string, string[] | undefined> = {};

  const hasErr = (name: string) => (fieldErrors[name]?.length ?? 0) > 0;
  const errId = (name: string) => (hasErr(name) ? `${name}-error` : undefined);

  const submit: SubmitFunction = () => {
    formMessage = '';
    fieldErrors = {};

    return async ({ result }: { result: ActionResult }) => {
      if (result.type === 'failure') {
        const payload = result.data as ActionData | undefined;
        formMessage = payload?.message ?? payload?.formError ?? 'Fix the errors and try again.';
        fieldErrors = payload?.fieldErrors ?? {};
      }
    };
  };
</script>

<div class="page">
  <header class="header">
    <a class="back" href={`/requirements?workspaceId=${data.workspaceId}`} aria-label="Back to Requirements">
      ← Requirements
    </a>

    <div class="headMain">
      <p class="kicker">Edit</p>
      <h1 class="h1">Requirement</h1>
      <p class="subtle">Update fields, then save.</p>
    </div>

    <div class="headActions">
      <a class="btn btn--ghost" href={`/requirements/${data.requirement.id}?workspaceId=${data.workspaceId}`}>
        View
      </a>
      <button class="btn btn--primary" type="submit" form="req-edit-form">
        Save
      </button>
    </div>
  </header>

  {#if formMessage}
    <div class="banner" role="status" aria-live="polite">
      <div class="banner__dot" aria-hidden="true"></div>
      <div class="banner__text">{formMessage}</div>
    </div>
  {/if}

  <form id="req-edit-form" method="POST" action="?/update" use:enhance={submit}>
    <div class="layout">
      <!-- Main card -->
      <section class="card">
        <div class="card__head">
          <h2 class="h2">Core</h2>
          <div class="pillRow" aria-label="Current status and priority">
            <span class="pill"><span class="pill__k">Status</span>{status}</span>
            <span class="pill"><span class="pill__k">Priority</span>{priority}</span>
          </div>
        </div>

        <div class="form">
          <div class="field">
            <label class="label" for="title-input">
              Title <span class="req" aria-hidden="true">*</span>
            </label>
            <input
              id="title-input"
              class="input"
              name="title"
              bind:value={title}
              required
              aria-invalid={hasErr('title')}
              aria-describedby={errId('title')}
              placeholder="Short, actionable requirement title"
            />
            {#if fieldErrors.title?.length}
              <p class="error" id="title-error">{fieldErrors.title[0]}</p>
            {/if}
          </div>

          <div class="field">
            <label class="label" for="body-input">Description</label>
            <textarea
              id="body-input"
              class="textarea"
              name="body"
              bind:value={body}
              rows={7}
              aria-invalid={hasErr('body')}
              aria-describedby={errId('body')}
              placeholder="Add context, scope, constraints, and success criteria…"
            ></textarea>
            {#if fieldErrors.body?.length}
              <p class="error" id="body-error">{fieldErrors.body[0]}</p>
            {/if}
          </div>
        </div>

        <div class="card__foot">
          <a class="btn btn--ghost" href={`/requirements/${data.requirement.id}?workspaceId=${data.workspaceId}`}>
            Cancel
          </a>
          <button class="btn btn--primary" type="submit">Save changes</button>
        </div>
      </section>

      <!-- Side card -->
      <aside class="card">
        <div class="card__head">
          <h2 class="h2">Fields</h2>
          <p class="subtle">Operational metadata used for planning and reporting.</p>
        </div>

        <div class="form form--dense">
          <div class="grid2">
            <div class="field">
              <label class="label" for="status-select">Status</label>
              <select
                id="status-select"
                class="select"
                name="status"
                bind:value={status}
                aria-invalid={hasErr('status')}
                aria-describedby={errId('status')}
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
                <option value="DONE">Done</option>
              </select>
              {#if fieldErrors.status?.length}
                <p class="error" id="status-error">{fieldErrors.status[0]}</p>
              {/if}
            </div>

            <div class="field">
              <label class="label" for="priority-select">Priority</label>
              <select
                id="priority-select"
                class="select"
                name="priority"
                bind:value={priority}
                aria-invalid={hasErr('priority')}
                aria-describedby={errId('priority')}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
              {#if fieldErrors.priority?.length}
                <p class="error" id="priority-error">{fieldErrors.priority[0]}</p>
              {/if}
            </div>
          </div>

          <div class="field">
            <label class="label" for="ownerId-input">Owner (optional)</label>
            <input
              id="ownerId-input"
              class="input"
              name="ownerId"
              bind:value={ownerId}
              placeholder="User id (for now)"
              aria-invalid={hasErr('ownerId')}
              aria-describedby={errId('ownerId')}
            />
            {#if fieldErrors.ownerId?.length}
              <p class="error" id="ownerId-error">{fieldErrors.ownerId[0]}</p>
            {/if}
          </div>

          <div class="field">
            <label class="label" for="dueDate-input">Due date (optional)</label>
            <input
              id="dueDate-input"
              class="input"
              type="date"
              name="dueDate"
              bind:value={dueDate}
              aria-invalid={hasErr('dueDate')}
              aria-describedby={errId('dueDate')}
            />
            {#if fieldErrors.dueDate?.length}
              <p class="error" id="dueDate-error">{fieldErrors.dueDate[0]}</p>
            {/if}
          </div>
        </div>
      </aside>
    </div>
  </form>
</div>

<style>
  /* Page shell */
  .page {
    padding: 18px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 12px;
    align-items: start;
    margin-bottom: 12px;
  }

  .back {
    font-size: 12px;
    opacity: 0.85;
    text-decoration: none;
  }

  .headMain { min-width: 240px; }
  .kicker { margin: 0 0 4px; font-size: 12px; opacity: 0.7; }
  .h1 { margin: 0; font-size: 18px; line-height: 1.2; }
  .subtle { margin: 6px 0 0; font-size: 12px; opacity: 0.75; }

  .headActions { display: flex; gap: 8px; justify-content: flex-end; }

  /* Banner */
  .banner {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255, 120, 120, 0.08);
    margin: 10px 0 12px;
  }
  .banner__dot {
    width: 10px;
    height: 10px;
    margin-top: 3px;
    border-radius: 999px;
    background: rgba(255, 120, 120, 0.9);
  }
  .banner__text { font-size: 13px; opacity: 0.9; }

  /* Layout */
  .layout {
    display: grid;
    grid-template-columns: 1.4fr 0.9fr;
    gap: 12px;
  }
  @media (max-width: 920px) {
    .header { grid-template-columns: 1fr; }
    .headActions { justify-content: flex-start; }
    .layout { grid-template-columns: 1fr; }
  }

  /* Cards */
  .card {
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: var(--gp-surface, rgba(255,255,255,0.03));
    border-radius: 14px;
    overflow: clip;
  }
  .card__head {
    padding: 12px 14px;
    border-bottom: 1px solid var(--gp-border, rgba(255,255,255,0.12));
  }
  .card__foot {
    padding: 12px 14px;
    border-top: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .h2 { margin: 0; font-size: 14px; letter-spacing: 0.2px; }

  .pillRow { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
  .pill {
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255,255,255,0.04);
  }
  .pill__k { opacity: 0.7; margin-right: 6px; }

  /* Form */
  .form { padding: 12px 14px; display: grid; gap: 12px; }
  .form--dense { gap: 10px; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 520px) { .grid2 { grid-template-columns: 1fr; } }

  .field { display: grid; gap: 6px; }
  .label { font-size: 12px; opacity: 0.85; }
  .req { opacity: 0.8; }

  .input, .textarea, .select {
    width: 100%;
    font-size: 13px;
    padding: 10px 10px;
    border-radius: 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.14));
    background: rgba(255,255,255,0.04);
    color: inherit;
    outline: none;
  }
  .textarea { resize: vertical; min-height: 120px; }

  .input:focus, .textarea:focus, .select:focus {
    border-color: rgba(120, 180, 255, 0.55);
    box-shadow: 0 0 0 3px rgba(120, 180, 255, 0.18);
  }

  .error {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 150, 150, 0.95);
  }

  /* Buttons */
  .btn {
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 12px;
    border: 1px solid var(--gp-border, rgba(255,255,255,0.12));
    background: rgba(255,255,255,0.04);
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  .btn--ghost { background: transparent; }
  .btn--primary {
    background: rgba(120, 180, 255, 0.20);
    border-color: rgba(120, 180, 255, 0.35);
  }
</style>




