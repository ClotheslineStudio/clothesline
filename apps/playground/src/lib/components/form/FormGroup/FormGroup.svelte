<script lang="ts">
  export let label: string = '';
  export let description: string = '';
  export let error: string = '';
  export let required: boolean = false;
  export let className: string = '';
  export let id: string = '';
</script>

<div class="cl-form-group {className}">
  {#if label}
    <label class="cl-form-label" {id} for={id}>
      {label} {required ? '*' : ''}
    </label>
  {/if}
  <div class="cl-form-field">
    <slot {id} />
  </div>

  {#if description}
    <div class="cl-form-description">{description}</div>
  {/if}

  {#if error}
    <div class="cl-form-error">{error}</div>
  {/if}
</div>

<style>
  .cl-form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cl-form-label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-default-color, #111);
  }

  .cl-form-field {
    display: flex;
    flex-direction: column;
  }

  .cl-form-description {
    font-size: 0.75rem;
    color: var(--text-muted-color, #666);
  }

  .cl-form-error {
    font-size: 0.75rem;
    color: var(--color-error-700, #c00);
  }
</style>
