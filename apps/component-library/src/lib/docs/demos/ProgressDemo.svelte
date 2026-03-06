<script lang="ts">
  import { Progress, Stack } from '@clothesline/ui';
</script>

<div class="progress-demo">
  <Stack gap="md">
    <Progress value={28} max={100} label="Deployment progress" />
    <Progress value={72} max={100} label="Upload progress" />
    <Progress label="Indeterminate operation" />
  </Stack>
</div>

<style>
  .progress-demo {
    width: min(100%, 34rem);
  }
</style>
