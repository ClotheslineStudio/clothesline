<script lang="ts">
  import Textarea from '$lib/components/form/Textarea/Textarea.svelte';

  let message = '';
</script>

<h1 class="text-2xl font-bold mb-4">Textarea Component</h1>

<div class="space-y-6">

  <!-- Bound textarea -->
  <div>
    <label for="message" class="block text-sm font-medium mb-1">Your Message</label>
    <Textarea
      id="message"
      name="message"
      placeholder="Type your message here..."
      bind:value={message}
      required={true}
      rows={5}
    />
    <p class="text-sm text-muted-foreground mt-1">Live preview: {message}</p>
  </div>

  <!-- Disabled textarea -->
  <div>
    <label for="readonly" class="block text-sm font-medium mb-1">Disabled</label>
    <Textarea
      id="readonly"
      value="This is a disabled textarea"
      disabled={true}
    />
  </div>

</div>
