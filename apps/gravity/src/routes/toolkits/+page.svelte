<script lang="ts">
  import type { ToolkitsPageData } from "./+page";

  export let data: ToolkitsPageData;
</script>

<section class="space-y-4">
  <header class="flex items-center justify-between gap-3">
    <div>
      <h1 class="text-xl font-semibold">Toolkits</h1>
      <p class="mt-1 text-sm text-slate-300">
        Frameworks and guidance that drive your plans.
      </p>
    </div>

    <a
      href="/toolkits/new"
      class="inline-flex items-center rounded-md bg-sky-500 px-3 py-2 text-xs font-medium text-slate-950 hover:bg-sky-400"
    >
      Import toolkit
    </a>
  </header>

  <div class="space-y-2">
    {#each data.toolkits as tk}
      <a
        href={`/toolkits/${tk.id}`}
        class="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm hover:border-sky-500/60 hover:bg-slate-900"
      >
        <div>
          <div class="font-medium">{tk.name}</div>
          <div class="text-xs text-slate-400">
            {tk.source}
            {#if tk.version} · {tk.version}{/if}
          </div>
          <div class="mt-1 text-[11px] text-slate-500">
            {tk.requirements.length} requirements · Imported {tk.importedAt}
          </div>
        </div>

        <span class="text-[11px] rounded-full border border-slate-700 px-2 py-1 text-slate-300">
          Draft sandbox
        </span>
      </a>
    {/each}
  </div>
</section>
