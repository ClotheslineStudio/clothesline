<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const toolkit = data?.toolkit;
</script>

<section class="space-y-4 text-sm">
  <header class="space-y-1">
    <h1 class="text-lg font-semibold">
      {toolkit?.name ?? "Toolkit"} · Requirements
    </h1>
    <p class="text-slate-300">
      {toolkit?.requirements?.length ?? 0} requirements · mock data
    </p>
  </header>

  <div class="overflow-auto rounded-lg border border-slate-800 bg-slate-950/60">
    <table class="min-w-full border-collapse text-xs">
      <thead class="bg-slate-900/80 text-slate-300">
        <tr>
          <th class="px-3 py-2 text-left font-medium">Code</th>
          <th class="px-3 py-2 text-left font-medium">Title</th>
          <th class="px-3 py-2 text-left font-medium">Category</th>
          <th class="px-3 py-2 text-left font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {#if toolkit?.requirements}
          {#each toolkit.requirements as r}
            <tr class="border-t border-slate-800 hover:bg-slate-900/70">
              <td class="px-3 py-2 align-top text-slate-300">{r.code ?? "—"}</td>
              <td class="px-3 py-2 align-top text-slate-100">
                <div class="font-medium">{r.title}</div>
                {#if r.description}
                  <div class="mt-1 text-[11px] text-slate-400">
                    {r.description}
                  </div>
                {/if}
              </td>
              <td class="px-3 py-2 align-top text-slate-300">{r.category ?? "—"}</td>
              <td class="px-3 py-2 align-top">
                <span
                  class={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
                    r.status === "mapped"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : r.status === "in-progress"
                      ? "bg-amber-500/15 text-amber-300"
                      : r.status === "unmapped"
                      ? "bg-slate-700/40 text-slate-200"
                      : ""
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>
