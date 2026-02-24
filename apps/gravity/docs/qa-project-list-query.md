# QA: Project list query

## Setup

- Start Gravity app and ensure demo workspace data exists.
- Use `workspaceId=ws_demo` unless another workspace is required.

## Manual checks

1. **List default (non-archived only)**
   - Call `GET /api/projects?workspaceId=ws_demo`
   - Confirm archived projects (`archivedAt != null`) are excluded.
2. **Include archived**
   - Call `GET /api/projects?workspaceId=ws_demo&includeArchived=true`
   - Confirm archived + non-archived projects are returned.
3. **Status filter**
   - Call with `status=ACTIVE` and `status=ACTIVE&status=DRAFT`
   - Confirm only matching statuses are returned.
4. **Owner filter**
   - Call with `ownerId=<userId>`
   - Confirm only projects for that owner are returned.
5. **Due date range**
   - Call with `dueFrom=2026-02-01&dueTo=2026-02-28`
   - Bounds are interpreted as inclusive UTC date bounds:
     - `dueFrom` => `00:00:00.000Z`
     - `dueTo` => `23:59:59.999Z`
6. **Limit**
   - Call with `limit=10`
   - Confirm at most 10 projects returned.
7. **Cursor**
   - Call first page with `limit=10`, then pass returned `nextCursor`
   - Confirm second page has no duplicates and follows sort order.

## Expected sort

- Default sort is `updatedAt DESC`, then `id DESC` for stable tie-breaking.
