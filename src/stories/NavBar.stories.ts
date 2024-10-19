import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';

const meta = {
  title: 'Example/NavBar',
  component: NavBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    starticon: { control: { type: 'boolean' } },
    menu: { control: { type: 'boolean' } },
    endIcon: { control: { type: 'boolean' } },
    variant: {
      control: {
        type: 'select',
        options: ['default', 'neutral', 'primary'],
      },
    },
  },
} as Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    starticon: false,
    menu: false,
    endIcon: false,
    withSearch: false,
  },
};

export const WithStartIcon: Story = {
  args: {
    starticon: true,
    menu: false,
    endIcon: false,
    withSearch: false,
  },
};


export const WithEndIcon: Story = {
  args: {
    starticon: true,
    menu: false,
    endIcon: true,
    withSearch: false,
  },
};
export const NavBarWithMenuAndSubmenu: Story = {
  args: {
    starticon: false,
    menu: true,
    endIcon: false,
    withSearch: false,
  },
};

export const NavBarWithStartIconAndMenu: Story = {
  args: {
    starticon: true,
    menu: true,
    endIcon: true,
    withSearch: false,
  },
};


export const NavBarNeutral: Story = {
  args: {
    starticon: false,
    menu: false,
    endIcon: true,
    variant: 'neutral',
    withSearch: false,
  },
};

export const NavBarPrimary: Story = {
  args: {
    starticon: false,
    menu: false,
    endIcon: true,
    variant: 'primary',
    withSearch: false,
  },
};

export const WithSearchAndDropdown: Story = {
  args: {
    starticon: false,
    menu: false,
    endIcon: false,
    variant: 'default',
    withSearch: true,
    
  },
};