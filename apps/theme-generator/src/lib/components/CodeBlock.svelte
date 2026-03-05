<script lang="ts">
  let {
    title,
    code,
    onCopy
  }: {
    title: string;
    code: string;
    onCopy: () => void;
  } = $props();
</script>

<div class="surface-card overflow-hidden">
  <div class="flex items-center justify-between border-b border-[color-mix(in_oklab,var(--color-surface-700)_12%,transparent)] px-3 py-2">
    <h3 class="m-0 text-sm font-semibold">{title}</h3>
    <button type="button" class="rounded-md border px-2 py-1 text-xs" onclick={onCopy}>Copy</button>
  </div>
  <pre class="m-0 overflow-auto p-3 text-xs"><code>{code}</code></pre>
</div>