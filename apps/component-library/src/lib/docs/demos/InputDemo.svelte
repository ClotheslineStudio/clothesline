<script lang="ts">
  import { Field, Input, Stack } from '@clothesline/ui';
</script>

<Stack gap="md">
  <Field label="Email" forId="email" hint="We only use this for account notices.">
    <Input id="email" placeholder="you@company.com" />
  </Field>
  <Field label="Organization" forId="org">
    <Input id="org" placeholder="Clothesline Studio" />
  </Field>
</Stack>
