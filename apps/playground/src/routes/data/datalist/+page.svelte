<script lang="ts">
  import DataList from '$lib/components/data/DataList/DataList.svelte';

  const items = [
    { label: 'Name', value: 'Ripley' },
    { label: 'Breed', value: 'Australian Shepherd' },
    { label: 'Age', value: 4 },
    { label: 'Vaccinated', value: 'Yes' },
    { label: 'Favorite Toy', value: null }, // intentionally null
  ];
</script>

<h1 class="text-2xl font-bold mb-4">DataList Component</h1>

<DataList {items} />
