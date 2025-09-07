<script lang="ts">
  export let label: string = 'Upload File';
  export let accept: string = '*/*';
  export let multiple: boolean = false;
  export let onChange: (files: FileList | null) => void = () => {};

  let inputEl: HTMLInputElement;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onChange(target.files);
  }

  function triggerClick() {
    inputEl?.click();
  }
</script>

<div class="cl-upload">
  <label class="cl-upload-label">
    <button type="button" class="cl-upload-btn" on:click={triggerClick}>
      {label}
    </button>
    <input
      bind:this={inputEl}
      type="file"
      accept={accept}
      {multiple}
      on:change={handleChange}
      class="cl-upload-input"
    />
  </label>
</div>

<style>
  .cl-upload {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
  }

  .cl-upload-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-primary-900, #113);
    background-color: var(--color-primary-50, #eef);
    border: 1px solid var(--border-default-color, #ccc);
    border-radius: var(--radius-sm, 0.25rem);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .cl-upload-btn:hover {
    background-color: var(--color-primary-100, #dde);
  }

  .cl-upload-btn:focus {
    outline: 2px solid var(--color-primary-500, #3399ff);
    outline-offset: 2px;
  }

  .cl-upload-input {
    display: none;
  }
</style>
