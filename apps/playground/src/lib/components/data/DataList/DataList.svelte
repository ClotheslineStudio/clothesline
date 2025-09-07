<script lang="ts">
  export let items: { label: string; value: string | number | null }[] = [];
  export let className = '';
</script>

<dl class="cl-datalist {className}">
  {#each items as item (item.label)}
    <div class="cl-datalist-row">
      <dt class="cl-datalist-label">{item.label}</dt>
      <dd class="cl-datalist-value">{item.value ?? '—'}</dd>
    </div>
  {/each}
</dl>

<style>
  .cl-datalist {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
  }

  .cl-datalist-row {
    display: flex;
    flex-direction: column;
  }

  .cl-datalist-label {
    font-size: 0.75rem;
    color: var(--muted-foreground, #666);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .cl-datalist-value {
    font-size: 1rem;
    font-weight: 500;
    color: var(--base-font-color, #111);
    word-break: break-word;
  }
</style>
