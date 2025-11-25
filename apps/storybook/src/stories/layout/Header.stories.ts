// apps/storybook/src/stories/layout/Header.stories.ts
import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Header } from '@clothesline/ui';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['header', 'div', 'nav'],
    },
    sticky: { control: 'boolean' },
    bordered: { control: 'boolean' },
    elevated: { control: 'boolean' },
    maxWidth: {
      control: { type: 'select' },
      options: ['full', 'page', 'prose'],
    },
    className: { control: 'text' },
  },
  args: {
    as: 'header',
    sticky: false,
    bordered: true,
    elevated: true,
    maxWidth: 'page',
    className: '',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default header with basic app-like slots.
 */
export const Default: Story = {
  render: (args) => ({
    Component: Header,
    props: args,
    slots: {
      left: `
        <span style="font-weight:600; font-size:0.9rem;">
          Clothesline
        </span>
      `,
      center: `
        <span style="font-size:0.85rem; opacity:0.8;">
          Icon Explorer
        </span>
      `,
      right: `
        <div style="display:flex; gap:0.5rem; font-size:0.8rem;">
          <button
            type="button"
            style="
              padding:0.25rem 0.6rem;
              border-radius:999px;
              border:1px solid rgba(148, 163, 184, 0.7);
              background:rgba(241, 245, 249, 0.9);
            "
          >
            Theme
          </button>
          <button
            type="button"
            style="
              padding:0.25rem 0.6rem;
              border-radius:999px;
              border:1px solid rgba(148, 163, 184, 0.7);
              background:rgba(241, 245, 249, 0.9);
            "
          >
            GitHub
          </button>
        </div>
      `,
    },
  }),
};

/**
 * Sticky header variant (visual only; sticky behavior depends on host layout).
 */
export const Sticky: Story = {
  args: {
    sticky: true,
  },
  render: (args) => ({
    Component: Header,
    props: args,
    slots: {
      left: `
        <span style="font-weight:600; font-size:0.9rem;">
          Sticky Header
        </span>
      `,
      right: `
        <span style="font-size:0.8rem; opacity:0.8;">
          Scroll content below
        </span>
      `,
    },
  }),
};

/**
 * Header without border.
 */
export const NoBorder: Story = {
  args: {
    bordered: false,
  },
  render: (args) => ({
    Component: Header,
    props: args,
    slots: {
      left: `<span>No Border</span>`,
      right: `<span style="font-size:0.8rem;">Actions</span>`,
    },
  }),
};

/**
 * Flat header (no elevation / shadow).
 */
export const Flat: Story = {
  args: {
    elevated: false,
  },
  render: (args) => ({
    Component: Header,
    props: args,
    slots: {
      left: `<span>Flat Header</span>`,
      right: `<span style="font-size:0.8rem;">Actions</span>`,
    },
  }),
};

/**
 * App-shell style preview.
 */
export const AppShellPreview: Story = {
  args: {
    maxWidth: 'page',
  },
  render: (args) => ({
    Component: Header,
    props: args,
    slots: {
      left: `
        <div style="display:flex; align-items:center; gap:0.4rem;">
          <div
            style="
              width:22px;
              height:22px;
              border-radius:6px;
              background:#0f172a;
            "
          ></div>
          <span style="font-weight:600; font-size:0.9rem;">
            Clothesline
          </span>
        </div>
      `,
      center: `
        <span style="font-size:0.85rem; opacity:0.85;">
          Dashboard
        </span>
      `,
      right: `
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.8rem;">
          <span style="opacity:0.8;">travi@example.com</span>
          <div
            style="
              width:24px;
              height:24px;
              border-radius:999px;
              background:#e2e8f0;
            "
          ></div>
        </div>
      `,
    },
  }),
};


