import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Badge } from '@clothesline/ui';


const meta = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info', 'accent', 'neutral'] },
    appearance: { control: 'select', options: ['solid', 'outline', 'soft'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    pill: { control: 'boolean' },
    removable: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    appearance: 'solid',
    size: 'md',
    pill: false,
    removable: false,
    label: '',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type BadgeStoryArgs = typeof meta.args & { slotContent?: string };
type Story = StoryObj<typeof meta>;

const render = (args: any) => {
  const { slotContent, ...props } = args;
  return {
    Component: Badge,
    props,
    slots: { default: slotContent },
  };
};

export const Default: Story = {
  render,
  args: {
    slotContent: 'Badge',
  },
};

export const Outline: Story = {
  args: {
    appearance: 'outline',
  },
  render,
};

export const Subtle: Story = {
  args: {
    appearance: 'soft',
  },
  render,
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render,
};
