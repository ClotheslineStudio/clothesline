<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let label: string = 'Loading...';
  export let className = '';
</script>

<div
  role="status"
  class="cl-spinner {className}"
  aria-label={label}
  data-size={size}
>
  <span class="cl-spinner-icon"></span>
  <span class="sr-only">{label}</span>
</div>

<style>
  .cl-spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .cl-spinner-icon {
    display: inline-block;
    border: 3px solid var(--color-primary-200, #ccc);
    border-top-color: var(--color-primary-600, #333);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .cl-spinner-icon {
    width: var(--spinner-size, 1.5rem);
    height: var(--spinner-size, 1.5rem);
  }

  .cl-spinner[data-size='sm'] .cl-spinner-icon {
    --spinner-size: 1rem;
  }

  .cl-spinner[data-size='md'] .cl-spinner-icon {
    --spinner-size: 1.5rem;
  }

  .cl-spinner[data-size='lg'] .cl-spinner-icon {
    --spinner-size: 2rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
