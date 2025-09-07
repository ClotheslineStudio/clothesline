<script lang="ts">
  import Select from '$lib/components/form/Select/Select.svelte';

  let selected = 'banana';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' }
  ];

  function handleSelectChange(val: string) {
    console.log('Selected:', val);
  }
</script>

<h1 class="text-2xl font-bold mb-4">Select Component</h1>

<div class="space-y-6">

  <Select
    id="fruit"
    label="Favorite Fruit"
    options={fruits}
    bind:value={selected}
    required={true}
    onChange={handleSelectChange}
  />

  <p class="text-sm text-muted-foreground">
    Selected: <strong>{selected}</strong>
  </p>

  <Select
    id="disabled-select"
    label="Disabled Select"
    options={fruits}
    value="apple"
    disabled={true}
  />

</div>
