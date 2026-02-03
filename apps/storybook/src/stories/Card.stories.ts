import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Card } from '@clothesline/ui';

const meta = {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    tone: { control: 'select', options: ['surface', 'primary', 'neutral'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    rounded: { control: 'boolean' },
    border: { control: 'boolean' },
    className: { control: 'text' },
    // To control slot content, use the "slotContent" arg in each story below (not in argTypes)
  },
  args: {
    as: 'div',
    tone: 'surface',
    padding: 'md',
    shadow: 'md',
    rounded: true,
    border: true,
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;


type CardStoryArgs = Partial<typeof meta.args> & { slotContent?: string };
type Story = StoryObj<typeof meta>;

const render = (args: CardStoryArgs = { ...meta.args }) => {
  const { slotContent, ...props } = args;
  return {
    Component: Card,
    props,
    slots: { default: slotContent },
  };
};


export const Default: Story = {
  render,
  args: {
    slotContent: 'This is a Card! You can put any content here.',
  },
};


export const Primary: Story = {
  render,
  args: {
    tone: 'primary',
    slotContent: 'Primary tone card',
  },
};


export const Neutral: Story = {
  render,
  args: {
    tone: 'neutral',
    slotContent: 'Neutral tone card',
  },
};


export const NoBorder: Story = {
  render,
  args: {
    border: false,
    slotContent: 'No border card',
  },
};
