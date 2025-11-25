import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Button } from '@clothesline/ui';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
      ],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    disabled: false,
    loading: false,
    children: 'Click Me',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    variant: 'link',
    href: '#',
    children: 'Link Button',
  },
};

