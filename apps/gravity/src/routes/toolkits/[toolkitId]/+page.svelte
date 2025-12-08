<script lang="ts">
	import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { toolkit, stats } = data ?? {};

  const tabs = toolkit
    ? [
        { href: `/toolkits/${toolkit.id}`, label: "Overview" },
        { href: `/toolkits/${toolkit.id}/requirements`, label: "Requirements" },
        { href: `/toolkits/${toolkit.id}/map`, label: "Mapping" }
      ]
    : [];
</script>

<section class="space-y-6">
  {#if toolkit}
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold">{toolkit.name}</h1>
        <p class="text-sm text-slate-300">
          {toolkit.source}
          {#if toolkit.version} · {toolkit.version}{/if}
        </p>
        <p class="text-xs text-slate-500">
          Imported {toolkit.importedAt}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 text-xs">
        <a
          href={`/toolkits/${toolkit.id}/requirements`}
          class="inline-flex items-center rounded-md border border-slate-700 px-3 py-1.5 text-slate-200 hover:border-sky-500"
        >
          View requirements
        </a>
        <a
          href={`/toolkits/${toolkit.id}/map`}
          class="inline-flex items-center rounded-md bg-sky-500 px-3 py-1.5 font-medium text-slate-950 hover:bg-sky-400"
        >
          Start mapping
        </a>
      </div>
    </header>
  {/if}

  <!-- Tabs -->
  <nav class="flex gap-4 border-b border-slate-800 text-sm">
    {#each tabs as tab}
      <a
        href={tab.href}
        class="border-b-2 border-transparent px-1 pb-2 text-slate-300 hover:text-sky-300"
        aria-current={tab.href === $page.url.pathname ? "page" : undefined}
      >
        {tab.label}
      </a>
    {/each}
  </nav>

  <!-- Overview stats -->
  <section class="grid gap-4 md:grid-cols-4 text-sm">
    <div class="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div class="text-xs text-slate-400">Total requirements</div>
      <div class="mt-1 text-2xl font-semibold">{stats?.total}</div>
    </div>
    <div class="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div class="text-xs text-slate-400">Mapped</div>
      <div class="mt-1 text-2xl font-semibold text-emerald-300">{stats?.mapped}</div>
    </div>
    <div class="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div class="text-xs text-slate-400">In progress</div>
      <div class="mt-1 text-2xl font-semibold text-amber-300">
        {stats?.inProgress}
      </div>
    </div>
    <div class="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
      <div class="text-xs text-slate-400">Unmapped</div>
      <div class="mt-1 text-2xl font-semibold text-slate-200">
        {stats?.unmapped}
      </div>
    </div>
  </section>

  <section class="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
    <h2 class="text-sm font-semibold mb-2">What happens here?</h2>
    <p class="mb-2">
      This overview keeps track of how fully this toolkit is mapped into your
      world. You&apos;ll use the <span class="font-medium">Requirements</span> tab
      to review the list, and the <span class="font-medium">Mapping</span> tab
      to connect each requirement to plans, owners, and evidence.
    </p>
    <p class="text-xs text-slate-400">
      For now, everything is mock data so you can see the flow. We&apos;ll
      connect this to real imports later.
    </p>
  </section>
</section>
