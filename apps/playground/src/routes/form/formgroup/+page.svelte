<script lang="ts">
  import FormGroup from '$lib/components/form/FormGroup/FormGroup.svelte';

  let name = '';
  let email = '';
</script>

<h1 class="text-2xl font-bold mb-4">FormGroup Component</h1>

<div class="space-y-6">

  <!-- Valid example -->
  <FormGroup
    id="name"
    label="Full Name"
    required={true}
    description="Enter your legal name."
  >
    <input
      id="name"
      type="text"
      bind:value={name}
      class="border px-2 py-1 rounded w-full"
      placeholder="e.g., Jane Doe"
    />
  </FormGroup>

  <!-- Invalid example -->
  <FormGroup
    id="email"
    label="Email"
    description="We'll never share your email."
    error="Email is required."
  >
    <input
      id="email"
      type="email"
      bind:value={email}
      class="border px-2 py-1 rounded w-full border-red-500"
      placeholder="you@example.com"
    />
  </FormGroup>

</div>
