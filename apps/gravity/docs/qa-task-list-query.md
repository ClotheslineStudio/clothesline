# QA: Task List Query

## Setup

1. Start app: `pnpm -C apps/gravity dev`
2. Ensure seed data exists for workspace `ws_demo`.

## Checklist

1. Default list excludes archived tasks.
2. `status` filter returns only matching statuses.
3. `priority` filter returns only matching priorities.
4. `assigneeId` filter returns only assigned tasks for that user.
5. `projectId` filter returns only tasks for that project.
6. `dueFrom` and `dueTo` filter by inclusive UTC date bounds.
7. Default sorting is `updatedAt:desc`.
8. `sort=dueDate:asc` returns due-date-ordered tasks.
9. `limit` constrains page size and max accepted value is 100.
10. `nextCursor` fetches next page without duplicates.

## Suggested API checks

1. `GET /api/tasks?workspaceId=ws_demo`
2. `GET /api/tasks?workspaceId=ws_demo&status=TODO&status=IN_PROGRESS`
3. `GET /api/tasks?workspaceId=ws_demo&priority=HIGH`
4. `GET /api/tasks?workspaceId=ws_demo&assigneeId=USER_ID`
5. `GET /api/tasks?workspaceId=ws_demo&projectId=prj_demo_1`
6. `GET /api/tasks?workspaceId=ws_demo&dueFrom=2026-02-01&dueTo=2026-02-28`
7. `GET /api/tasks?workspaceId=ws_demo&sort=dueDate:asc`
8. `GET /api/tasks?workspaceId=ws_demo&limit=10`, then reuse `nextCursor`.
