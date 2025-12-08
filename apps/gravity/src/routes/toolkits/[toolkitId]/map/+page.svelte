<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const { toolkit } = data;
</script>

<section class="space-y-4 text-sm">
  <header class="space-y-1">
    <h1 class="text-lg font-semibold">
      {toolkit ? `${toolkit.name} · Mapping` : "Mapping"}
    </h1>
    <p class="text-slate-300">
      Sandbox view for mapping requirements to plans, owners, and docs.
    </p>
  </header>

  <div class="grid gap-4 md:grid-cols-2">
    <!-- Left: requirements list -->
    <div class="flex flex-col rounded-lg border border-slate-800 bg-slate-950/70">
      <div class="border-b border-slate-800 px-3 py-2 text-xs font-medium text-slate-300">
        Requirements
      </div>
      <div class="flex-1 overflow-auto p-2 space-y-1">
        {#if toolkit}
          {#each toolkit.requirements as r}
            <button
              type="button"
              class="w-full rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 text-left text-xs text-slate-100 hover:border-sky-500/60 hover:bg-slate-900"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="font-medium">
                  {r.code ? `${r.code} · ${r.title}` : r.title}
                </div>
                <span class="text-[10px] text-slate-400">{r.status}</span>
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Right: mapping details placeholder -->
    <div class="flex flex-col rounded-lg border border-slate-800 bg-slate-950/70">
      <div class="border-b border-slate-800 px-3 py-2 text-xs font-medium text-slate-300">
        Mapping detail
      </div>
      <div class="flex-1 p-4 text-xs text-slate-300 space-y-2">
        <p>
          This panel will show the selected requirement and let you connect it
          to:
        </p>
        <ul class="list-disc pl-4 space-y-1">
          <li>One or more plans / boards</li>
          <li>Owners and teams</li>
          <li>Docs, notes, and evidence</li>
        </ul>
        <p class="text-[11px] text-slate-500">
          For now this is just a stub so you can see the shape of the workflow.
          Later we&apos;ll hook this into your Blocks editor and plan boards.
        </p>
      </div>
    </div>
  </div>
</section>
