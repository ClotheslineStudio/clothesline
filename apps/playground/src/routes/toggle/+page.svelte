<script lang="ts">
  import { ToggleButton } from '@clothesline/ui';
  let isOn = false;
</script>

<ToggleButton on={isOn} onChange={(val) => (isOn = val)} label="Power" />

<p>Status: {isOn ? 'Active' : 'Inactive'}</p>