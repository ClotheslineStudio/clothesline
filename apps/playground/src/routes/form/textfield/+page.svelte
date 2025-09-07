<script lang="ts">
  import TextField from '$lib/components/form/TextField/TextField.svelte';

  let name = '';
  let email = '';
</script>

<h1 class="text-2xl font-bold mb-4">TextField Component</h1>

<div class="space-y-6">

  <!-- Basic input -->
  <div>
    <label for="name" class="block text-sm font-medium mb-1">Full Name</label>
    <TextField
      id="name"
      name="name"
      placeholder="Jane Doe"
      bind:value={name}
      required={true}
    />
    <p class="text-sm text-muted-foreground mt-1">Live value: {name}</p>
  </div>

  <!-- Email input -->
  <div>
    <label for="email" class="block text-sm font-medium mb-1">Email Address</label>
    <TextField
      id="email"
      name="email"
      type="email"
      placeholder="you@example.com"
      bind:value={email}
    />
  </div>

  <!-- Disabled input -->
  <div>
    <label for="disabled" class="block text-sm font-medium mb-1">Disabled Field</label>
    <TextField
      id="disabled"
      value="Disabled value"
      disabled={true}
    />
  </div>

</div>
