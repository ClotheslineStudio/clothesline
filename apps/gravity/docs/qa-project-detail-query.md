# QA: Project Detail Query

## Preconditions
- Start the app locally (`pnpm -C apps/gravity dev`).
- Ensure demo data is available in `ws_demo` (seed if needed).

## Manual checks
1. Fetch an active project detail in `ws_demo`.
- Expect `200` with `{ ok: true, project, tasks }`.
- Expect task objects include only summary fields: `id`, `title`, `status`, `priority`, `dueDate`, `assignee`.

2. Archive a task linked to that project.
- Fetch detail without `includeArchivedTasks`.
- Expect archived task is excluded.

3. Fetch detail with `includeArchivedTasks=true`.
- Expect archived task is included.

4. Archive the project itself.
- Fetch detail again.
- Expect project is still returned (archived project detail remains viewable).

5. Use wrong workspace id.
- Fetch same project id with `workspaceId=ws_other`.
- Expect `404` with `{ ok: false, message: "Project not found" }`.

6. Use unknown project id in correct workspace.
- Expect `404` with `{ ok: false, message: "Project not found" }`.
