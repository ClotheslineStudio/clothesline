# QA: Project create/update/archive actions

Use `workspaceId=ws_demo` unless testing a different workspace.

## 1) Create project with missing title

1. Call create endpoint with `title` omitted or blank.
2. Verify response is `ok: false` and includes `fieldErrors.title` with a required-title message.

## 2) Create project with invalid date range

1. Create with both `startDate` and `dueDate`, where `startDate > dueDate`.
2. Verify response is `ok: false` and includes `fieldErrors.dueDate` explaining due date must be on/after start.

## 3) Update project title

1. Create a valid project and capture its id.
2. Call update endpoint (`PATCH /api/projects/:id`) with a new title.
3. Verify API returns `ok: true` and updated title is persisted.

## 4) Archive project

1. Archive the project via `POST /api/projects/:id/archive`.
2. Verify response is `ok: true`.
3. Confirm in Prisma Studio/DB that `archivedAt` is populated and record is not hard-deleted.
4. Confirm update endpoint now returns not found for archived projects.
