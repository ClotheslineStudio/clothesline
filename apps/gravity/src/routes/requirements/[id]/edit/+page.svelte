<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

  export let data: {
    workspaceId: string;
    requirement: {
      id: string;
      title: string;
      description: string | null; // from detail loader (mapped from DB body)
      status: string;
      priority: string;
      ownerId: string | null;
      dueDate: Date | string | null;
    };
  };

  // Form fields (schema expects `body`, not `description`)
  let title = data.requirement.title ?? '';
  let body = data.requirement.description ?? '';

  // Align with your zod enums
  let status = (data.requirement.status ?? 'DRAFT') as 'DRAFT' | 'ACTIVE' | 'BLOCKED' | 'DONE';
  let priority = (data.requirement.priority ?? 'MEDIUM') as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  let ownerId = data.requirement.ownerId ?? '';
  let dueDate = data.requirement.dueDate ? String(data.requirement.dueDate).slice(0, 10) : '';

  type ActionData = {
    message?: string;
    formError?: string;
    fieldErrors?: Record<string, string[]>;
    values?: Record<string, unknown>;
  };

  let formMessage = '';
  let fieldErrors: Record<string, string[] | undefined> = {};

  // ✅ Correct: pass a SubmitFunction to use:enhance
  const submit: SubmitFunction = () => {
    // clear previous errors on submit
    formMessage = '';
    fieldErrors = {};

    return async ({ result }: { result: ActionResult }) => {
      if (result.type === 'failure') {
        const payload = result.data as ActionData | undefined;
        formMessage = payload?.message ?? payload?.formError ?? 'Fix the errors and try again.';
        fieldErrors = payload?.fieldErrors ?? {};
      }
      // success/redirect will navigate automatically; no need to do anything here
    };
  };
</script>

<form method="POST" action="?/update" use:enhance={submit}>
  <div class="stack">
    <div>
      <label for="title-input">Title</label>
      <input id="title-input" name="title" bind:value={title} />
      {#if fieldErrors.title?.length}
        <p class="error">{fieldErrors.title[0]}</p>
      {/if}
    </div>

    <div>
      <label for="body-input">Description</label>
      <textarea id="body-input" name="body" bind:value={body}></textarea>
      {#if fieldErrors.body?.length}
        <p class="error">{fieldErrors.body[0]}</p>
      {/if}
    </div>

    <div class="row">
      <div>
        <label for="status-select">Status</label>
        <select id="status-select" name="status" bind:value={status}>
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
          <option value="DONE">Done</option>
        </select>
        {#if fieldErrors.status?.length}
          <p class="error">{fieldErrors.status[0]}</p>
        {/if}
      </div>

      <div>
        <label for="priority-select">Priority</label>
        <select id="priority-select" name="priority" bind:value={priority}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        {#if fieldErrors.priority?.length}
          <p class="error">{fieldErrors.priority[0]}</p>
        {/if}
      </div>
    </div>

    <div class="row">
      <div>
        <label for="ownerId-input">Owner (optional)</label>
        <input id="ownerId-input" name="ownerId" bind:value={ownerId} placeholder="user id or blank" />
        {#if fieldErrors.ownerId?.length}
          <p class="error">{fieldErrors.ownerId[0]}</p>
        {/if}
      </div>

      <div>
        <label for="dueDate-input">Due date (optional)</label>
        <input id="dueDate-input" type="date" name="dueDate" bind:value={dueDate} />
        {#if fieldErrors.dueDate?.length}
          <p class="error">{fieldErrors.dueDate[0]}</p>
        {/if}
      </div>
    </div>

    {#if formMessage}
      <div class="error-banner">{formMessage}</div>
    {/if}

    <div class="actions">
      <button type="submit">Save changes</button>
      <a href={`/requirements/${data.requirement.id}?workspaceId=${data.workspaceId}`}>Cancel</a>
    </div>
  </div>
</form>


