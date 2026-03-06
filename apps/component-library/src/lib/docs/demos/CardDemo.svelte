<script lang="ts">
  import { Card, Heading, Paragraph, Stack } from '@clothesline/ui';
</script>

<Stack direction="row" gap="md" wrap>
  <Card tone="surface" shadow="sm" padding="md" className="w-[260px]">
    <Heading level={3}>Surface Card</Heading>
    <Paragraph tone="muted">Balanced spacing and soft elevation.</Paragraph>
  </Card>
  <Card tone="primary" shadow="sm" padding="md" className="w-[260px]">
    <Heading level={3}>Primary Card</Heading>
    <Paragraph>Useful for featured callouts.</Paragraph>
  </Card>
</Stack>
