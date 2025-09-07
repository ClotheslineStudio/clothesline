<script lang="ts">
  export let currentPage = 1;
  export let totalPages = 1;
  export let onPageChange = (page: number) => {};

  function goToPage(page: number) {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }
</script>

<nav class="cl-pagination" aria-label="Pagination">
  <button
    on:click={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    aria-label="Previous page"
  >
    ← Prev
  </button>

  {#each Array(totalPages) as _, i}
    <button
      class:selected={i + 1 === currentPage}
      on:click={() => goToPage(i + 1)}
      aria-current={i + 1 === currentPage ? 'page' : undefined}
    >
      {i + 1}
    </button>
  {/each}

  <button
    on:click={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    aria-label="Next page"
  >
    Next →
  </button>
</nav>

<style>
  .cl-pagination {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .cl-pagination button {
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-sm, 0.25rem);
    border: 1px solid var(--border-default-color, #ccc);
    background-color: var(--color-surface-50, #f9f9f9);
    color: var(--text-default-color, #333);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .cl-pagination button.selected {
    background-color: var(--color-primary-100, #cce);
    font-weight: bold;
  }

  .cl-pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .cl-pagination button:hover:not(:disabled) {
    background-color: var(--color-surface-100, #eee);
  }
</style>
