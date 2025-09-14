<script lang="ts">
  import { ToastHost, toasts } from '@clothesline/ui';
  import ComponentPreview from '$lib/components/dev/ComponentPreview/ComponentPreview.svelte';

  const githubUrl =
    'https://github.com/clotheslinestudio/ui/blob/main/src/components/feedback/Toast/ToastHost.svelte';

  function fire(kind: 'neutral'|'info'|'success'|'warning'|'error') {
    toasts.push({
      variant: kind,
      title: kind[0].toUpperCase() + kind.slice(1),
      message: `This is a ${kind} toast.`,
      duration: 3000
    });
  }

  const previewCenter = 'flex items-center justify-center min-h-24';
  const rowWrapCenter = 'flex flex-wrap items-center justify-center gap-3';
</script>

<h1 class="text-2xl font-bold mb-4">Toast</h1>

<section class="space-y-10">
  <!-- Triggers -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Fire Toasts</h2>
    <ComponentPreview
      {githubUrl}
      code={`<button on:click={() => toasts.push({ message: 'Saved!', variant: 'success' })}>Success</button>`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <button class="px-3 py-2 rounded border" on:click={() => fire('neutral')}>Neutral</button>
        <button class="px-3 py-2 rounded border" on:click={() => fire('info')}>Info</button>
        <button class="px-3 py-2 rounded border" on:click={() => fire('success')}>Success</button>
        <button class="px-3 py-2 rounded border" on:click={() => fire('warning')}>Warning</button>
        <button class="px-3 py-2 rounded border" on:click={() => fire('error')}>Error</button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Sticky -->
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">Sticky (duration=0)</h2>
    <ComponentPreview
      {githubUrl}
      code={`toasts.push({ title: 'Needs action', message: 'Click to dismiss', duration: 0 })`}
    >
      <div class={`${previewCenter} ${rowWrapCenter}`}>
        <button
          class="px-3 py-2 rounded border"
          on:click={() => toasts.push({ title: 'Needs action', message: 'Click to dismiss', duration: 0 })}
        >
          Fire sticky toast
        </button>
      </div>
    </ComponentPreview>
  </div>

  <!-- Host -->
  <ToastHost />
</section>

