<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Card } from '@clothesline/ui';

  const { Story } = defineMeta({
    title: 'Core/Card',
    component: Card,
  });
</script>

<Story name="Default">
  <Card>
    <p>This is a default card with medium padding and shadow.</p>
  </Card>
</Story>

<Story name="Elevated">
  <Card elevated={true}>
    <p>This card has elevated shadow.</p>
  </Card>
</Story>

<Story name="No Border, No Padding">
  <Card border={false} padding="none">
    <p>This card has no border and no padding.</p>
  </Card>
</Story>

<Story name="Primary Tone">
  <Card tone="primary">
    <p>This card uses the primary tone background and text.</p>
  </Card>
</Story>

<Story name="Custom Class">
  <Card className="border-2 border-dashed border-red-500">
    <p>This card has custom border styling via className.</p>
  </Card>
</Story>




