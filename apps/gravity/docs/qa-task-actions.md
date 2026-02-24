# QA: Task create/update/archive actions

## Preconditions
- App running locally with database configured.
- Workspace available (`workspaceId=ws_demo` by default).
- Optional: have a project in `ws_demo` for `projectId` linkage testing.

## Test cases

### 1) Create task with missing title
1. Call `POST /api/tasks?workspaceId=ws_demo` with `{}` or `{"title":""}`.
2. Expect `400` with `ok:false` and `fieldErrors.title`.

### 2) Create task with invalid dueDate
1. Call `POST /api/tasks?workspaceId=ws_demo` with `{"title":"Bad due date","dueDate":"not-a-date"}`.
2. Expect `400` with `ok:false` and actionable `fieldErrors.dueDate`.

### 3) Create task with projectId in same workspace
1. Call `POST /api/tasks?workspaceId=ws_demo` with valid `title` and `projectId` that exists in `ws_demo`.
2. Expect `200` with `ok:true` and `id`.
3. Verify DB row has `projectId` set and `workspaceId=ws_demo`.

### 4) Create or update with projectId from another workspace
1. Call create or patch with `projectId` that exists, but not in `ws_demo`.
2. Expect `400` with `ok:false` and `fieldErrors.projectId = "Project not found in this workspace"`.

### 5) Update task fields
1. Call `PATCH /api/tasks/:id?workspaceId=ws_demo` with one or more allowed fields.
2. Expect `200` with `ok:true`.
3. Verify updated fields persisted.

### 6) Archive task
1. Call `POST /api/tasks/:id/archive?workspaceId=ws_demo`.
2. Expect `200` with `ok:true`.
3. Verify `archivedAt` is set (task not deleted).
4. Verify default list queries exclude archived tasks.
