<script lang="ts">
  const options = [
    {
      id: "upload",
      title: "Upload file",
      description: "PDF, Word, or CSV toolkit that we can parse."
    },
    {
      id: "paste",
      title: "Paste structured text",
      description: "Copy-paste a table or outline and map it manually."
    },
    {
      id: "blank",
      title: "Start from scratch",
      description: "Manually create requirements in Gravity."
    }
  ];

  let selected = "upload";
</script>

<section class="space-y-4 text-sm">
  <header class="space-y-1">
    <h1 class="text-xl font-semibold">Import a toolkit</h1>
    <p class="text-slate-300">
      This is a sandbox screen for now. We&apos;ll wire real parsing and
      mapping later.
    </p>
  </header>

  <div class="grid gap-3 md:grid-cols-3">
    {#each options as opt}
      <button
        type="button"
        on:click={() => (selected = opt.id)}
        class="flex flex-col rounded-lg border px-4 py-3 text-left
          {selected !== opt.id
            ? 'border-slate-800 bg-slate-950/60 text-slate-200'
            : 'border-sky-500 bg-slate-900/80'}"
      >
        <span class="text-sm font-semibold">{opt.title}</span>
        <span class="mt-1 text-xs text-slate-400">
          {opt.description}
        </span>
      </button>
    {/each}
  </div>

  <div class="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
    {#if selected === "upload"}
      <p class="mb-2 font-semibold">Upload file (future behavior)</p>
      <p>
        Here we&apos;ll add a file upload, show a quick preview of detected
        sections, and let you confirm how they should become requirements.
      </p>
    {:else if selected === "paste"}
      <p class="mb-2 font-semibold">Paste structured text</p>
      <p>
        Here we&apos;ll add a textarea for pasting tables/outlines and a quick
        parser so you can review generated requirements.
      </p>
    {:else}
      <p class="mb-2 font-semibold">Start from scratch</p>
      <p>
        Here we&apos;ll add an inline editor to define requirement codes,
        titles, and categories directly in Gravity.
      </p>
    {/if}
  </div>
</section>
