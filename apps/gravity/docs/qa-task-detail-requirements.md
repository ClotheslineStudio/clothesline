# Task Detail Requirements QA

## Seed expectations

- `tsk_demo_1` implements `req_demo_2`
- `tsk_demo_2` implements `req_demo_3`

## Manual checks

1. Start app with seeded demo data.
2. Request `GET /api/tasks/tsk_demo_1?workspaceId=ws_demo`.
3. Confirm `requirements` includes `req_demo_2` with summary fields: `id`, `title`, `status`, `priority`.
4. Add an `IMPLEMENTS` edge from a task to another requirement and re-request task detail; confirm it appears.
5. Archive a requirement linked by an `IMPLEMENTS` edge and request task detail again; confirm archived requirement is excluded by default.
6. Request unknown task id (`/api/tasks/tsk_unknown?workspaceId=ws_demo`); confirm `404` with `{ ok: false, message: "Task not found" }`.
