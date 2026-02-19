# Requirements validation QA checklist

## 1) Create requirement with missing title

1. Open `/requirements/new?workspaceId=ws_demo`.
2. Leave **Title** empty.
3. Click **Create**.
4. Confirm a top-level error banner appears and the Title field shows `Title is required`.

## 2) Create/edit requirement with invalid due date

1. Open create or edit requirement form.
2. Enter an invalid date value (for example by editing the DOM/input payload to `2025-02-30`).
3. Submit.
4. Confirm the Due date field shows `Enter a valid due date (YYYY-MM-DD)`.

## 3) Link the same source twice from requirement detail

1. Open requirement detail and launch **Link source(s)** modal.
2. Link one valid source.
3. Attempt to link the same source again.
4. Confirm modal/banner shows `Already linked.` / `This source is already linked.`

## 4) Link source from different workspace

1. Open requirement detail for workspace A.
2. Attempt to link a source id that belongs to workspace B.
3. Confirm modal/banner shows `Source is in a different workspace.`

If cross-workspace UI selection is not possible, simulate via API request:

- `POST /api/requirements/:id/derived-from?workspaceId=<workspaceA>`
- body: `{ "sourceId": "<source-from-workspaceB>" }`
