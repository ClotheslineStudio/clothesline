<script lang="ts">
  import Alert from '$lib/components/feedback/Alert/Alert.svelte';
</script>

<h1 class="text-2xl font-bold mb-4">Alert Component</h1>

<div class="flex flex-col gap-4">

  <Alert
    variant="info"
    title="Heads up!"
    message="This is an informational alert."
  />

  <Alert
    variant="success"
    title="Success!"
    message="Your operation was completed successfully."
  />

  <Alert
    variant="warning"
    title="Warning!"
    message="Be careful — something might be off."
  />

  <Alert
    variant="error"
    title="Error!"
    message="Something went wrong. Please try again."
  />

</div>
