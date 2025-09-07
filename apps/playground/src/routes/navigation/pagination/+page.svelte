<script lang="ts">
  import Pagination from '$lib/components/navigation/Pagination/Pagination.svelte';

  let currentPage = 1;
  const totalPages = 7;

  function handlePageChange(page: number) {
    currentPage = page;
  }
</script>

<h1 class="text-2xl font-bold mb-4">📄 Pagination Demo</h1>

<p class="mb-4">Current page: {currentPage}</p>

<Pagination
  {currentPage}
  {totalPages}
  onPageChange={handlePageChange}
/>
