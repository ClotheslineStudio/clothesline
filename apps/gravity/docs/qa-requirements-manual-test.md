# QA manual test: Requirements demo data (`ws_demo`)

## Quick seed command

Run from repo root:

```bash
pnpm --filter @clothesline/gravity run seed:demo
```

(Equivalent from `apps/gravity`: `pnpm run seed:demo`.)

## Manual test checklist

1. **Start Gravity app**
   - From repo root:
     ```bash
     pnpm --filter @clothesline/gravity dev
     ```
2. **Requirements list loads**
   - Open `http://localhost:5173/requirements?workspaceId=ws_demo`.
   - Confirm you see **8 requirements**.
3. **Filters work**
   - Set status filter to `BLOCKED` and confirm `req_demo_3` appears.
   - Set priority filter to `CRITICAL` and confirm `req_demo_1` and/or `req_demo_7` appear.
4. **Needs planning view has at least one item**
   - Open `http://localhost:5173/requirements?workspaceId=ws_demo&tab=needs-planning` (or use the in-page “Needs planning” tab).
   - Confirm at least one requirement appears with no task implementation edge (for example `req_demo_1`).
5. **Requirement detail shows linked Sources**
   - Open `http://localhost:5173/requirements/req_demo_1?workspaceId=ws_demo`.
   - Confirm linked source section includes `src_demo_1`.
6. **Create/edit validation errors show**
   - Go to `New Requirement` and submit with required fields empty.
   - Confirm validation messages are shown.
   - Open `req_demo_4` edit page and submit invalid values (for example blank title) and confirm errors.
7. **Link Sources flow works**
   - From any requirement detail/edit flow, link another source (e.g., add `src_demo_2` to `req_demo_1`).
   - Refresh requirement detail and confirm source link persists.

## Seed data reference

- Workspace: `ws_demo`
- Sources: `src_demo_1..src_demo_3`
- Requirements: `req_demo_1..req_demo_8`
- Tasks: `tsk_demo_1..tsk_demo_2`
- Planned requirements: `req_demo_2`, `req_demo_3` (via `IMPLEMENTS` edges)
- Unplanned requirements: all remaining seeded requirements
