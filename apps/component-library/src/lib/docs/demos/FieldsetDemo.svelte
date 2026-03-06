<script lang="ts">
  import { Fieldset, Checkbox, Stack } from '@clothesline/ui';

  let email = true;
  let product = false;
</script>

<Fieldset legend="Notification Preferences" description="Select which updates you want to receive.">
  <Stack gap="sm">
    <Checkbox label="Email updates" bind:checked={email} />
    <Checkbox label="Product announcements" bind:checked={product} />
  </Stack>
</Fieldset>
