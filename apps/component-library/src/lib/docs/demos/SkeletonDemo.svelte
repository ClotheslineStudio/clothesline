<script lang="ts">
  import { Skeleton, Stack } from '@clothesline/ui';
</script>

<div class="skeleton-demo">
  <Stack gap="sm">
    <Skeleton height="1.25rem" width="35%" />
    <Skeleton height="0.875rem" width="100%" />
    <Skeleton height="0.875rem" width="92%" />
    <Skeleton height="0.875rem" width="76%" />
  </Stack>
</div>

<style>
  .skeleton-demo {
    width: min(100%, 34rem);
  }
</style>
