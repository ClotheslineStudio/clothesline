import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Avatar } from '@clothesline/ui';

const meta = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
  args: {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'User Avatar',
    size: 'md',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {};

export const Square: Story = {
  args: {
    shape: 'square',
  },
};


// Initials story (no src, shows initials)
export const Initials: Story = {
  args: {
    src: '',
    name: 'Jane Doe',
  },
};


export const Large: Story = {
  args: {
    size: 'lg',
  },
};
