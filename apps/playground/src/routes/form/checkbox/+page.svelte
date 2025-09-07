<script lang="ts">
  import Checkbox from '$lib/components/form/Checkbox/Checkbox.svelte';

  let acceptTerms = false;
  let selectedFruits: string[] = [];
</script>

<h1 class="text-2xl font-bold mb-4">Checkbox Component</h1>

<div class="space-y-6">

  <!-- Basic checkbox -->
  <div>
    <Checkbox id="terms" bind:checked={acceptTerms} label="I accept the terms and conditions" />
    <p class="text-sm text-muted-foreground mt-1">Checked: {acceptTerms ? 'Yes' : 'No'}</p>
  </div>

  <!-- Checkbox group -->
  <div>
    <p class="font-semibold mb-2">Select your favorite fruits:</p>
    <div class="flex flex-col gap-2">
      <Checkbox
        name="fruits"
        value="apple"
        checked={selectedFruits.includes('apple')}
        on:change={() => {
          if (selectedFruits.includes('apple')) {
            selectedFruits = selectedFruits.filter(fruit => fruit !== 'apple');
          } else {
            selectedFruits = [...selectedFruits, 'apple'];
          }
        }}
        label="Apple"
      />
      <Checkbox
        name="fruits"
        value="banana"
        checked={selectedFruits.includes('banana')}
        on:change={() => {
          if (selectedFruits.includes('banana')) {
            selectedFruits = selectedFruits.filter(fruit => fruit !== 'banana');
          } else {
            selectedFruits = [...selectedFruits, 'banana'];
          }
        }}
        label="Banana"
      />
      <Checkbox
        name="fruits"
        value="cherry"
        checked={selectedFruits.includes('cherry')}
        on:change={() => {
          if (selectedFruits.includes('cherry')) {
            selectedFruits = selectedFruits.filter(fruit => fruit !== 'cherry');
          } else {
            selectedFruits = [...selectedFruits, 'cherry'];
          }
        }}
        label="Cherry"
      />
    </div>
    <p class="text-sm text-muted-foreground mt-1">Selected: {selectedFruits.join(', ')}</p>
  </div>

  <!-- Disabled checkbox -->
  <div>
    <Checkbox id="disabled" label="Disabled checkbox" disabled />
  </div>

</div>
