<script lang="ts">
  import { Button, Dialog, Stack, Heading, Paragraph } from '@clothesline/ui';

  let open = false;
</script>

<Button on:click={() => (open = true)}>Open dialog</Button>

<Dialog bind:open={open} labelledBy="dialog-title" describedBy="dialog-body">
  <Stack gap="sm">
    <Heading level={3} className="m-0" id="dialog-title">Delete project?</Heading>
    <Paragraph id="dialog-body" tone="muted">This action cannot be undone.</Paragraph>
    <Stack direction="row" gap="sm">
      <Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
      <Button color="error" on:click={() => (open = false)}>Delete</Button>
    </Stack>
  </Stack>
</Dialog>
