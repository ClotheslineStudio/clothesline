<script lang="ts">
  import Toast from '$lib/components/feedback/Toast/Toast.svelte';

  type ToastType = 'info' | 'success' | 'warning' | 'error';

  const toasts: { type: ToastType; text: string }[] = [
    { type: 'info', text: 'This is an info toast' },
    { type: 'success', text: 'Upload completed successfully' },
    { type: 'warning', text: 'This action is not reversible' },
    { type: 'error', text: 'Failed to connect to the server' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Toast Component</h1>

<div class="flex flex-col gap-4 max-w-md">
  {#each toasts as toast}
    <Toast type={toast.type} duration={6000}>
      {toast.text}
    </Toast>
  {/each}

  <Toast type="success" duration={0} dismissible={true}>
    Persistent toast — must be manually closed
  </Toast>
</div>
