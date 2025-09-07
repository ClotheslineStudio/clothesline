<script lang="ts">
  import { Button } from '@clothesline/ui';
</script>

<div class="flex gap-3 flex-wrap">
  <Button>Default</Button>
  <Button color="success">Success</Button>
  <Button color="warning" variant="outline">Outline</Button>
  <Button color="error" variant="ghost">Ghost</Button>
  <Button color="primary" variant="link" href="/docs">Link to Docs</Button>
  <Button loading>Saving…</Button>
  <Button disabled>Disabled</Button>
  <Button size="lg" color="accent">
    <span slot="icon-left">🌟</span>
    Large Accent
  </Button>
</div>

