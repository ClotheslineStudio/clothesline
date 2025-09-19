<script lang="ts">
  import { Switch } from '@clothesline/ui';
</script>

<h1>Switch Test</h1>

<Switch defaultChecked={true} ariaLabel="Test switch" />
<Switch defaultChecked={false} ariaLabel="Another test" />
<Switch defaultChecked={true} disabled ariaLabel="Disabled switch" />

