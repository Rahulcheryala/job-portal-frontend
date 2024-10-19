import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextArea } from './TextInput';

const meta: Meta<typeof TextArea> = {
  title: 'Example/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const A1: Story = {
  args: {
    cls: "textarea textarea-bordered",
    placeholder: "Description",
  },
};

export const A2: Story = {
    args: {
      cls: "textarea textarea-ghost",
      placeholder: "Description",
    },
  };

  export const A3: Story = {
    args: {
      cls: "textarea textarea-primary",
      placeholder: "Description",
    },
  };

  export const A4: Story = {
    args: {
      cls: "textarea textarea-secondary",
      placeholder: "Description",
    },
  };

  export const A5: Story = {
    args: {
      cls: "textarea textarea-accent",
      placeholder: "Description",
    },
  };

  export const A6: Story = {
    args: {
      cls: "textarea textarea-info",
      placeholder: "Description",
    },
  };

  export const A7: Story = {
    args: {
      cls: "textarea textarea-success",
      placeholder: "Description",
    },
  };

  export const A8: Story = {
    args: {
      cls: "textarea textarea-warning",
      placeholder: "Description",
    },
  };

  export const A9: Story = {
    args: {
      cls: "textarea textarea-error",
      placeholder: "Description",
    },
  };

  export const A10: Story = {
    args: {
      cls: "textarea textarea-bordered textarea-xs w-full max-w-xs",
      placeholder: "Description",
    },
  };

  export const A11: Story = {
    args: {
      cls: "textarea textarea-bordered textarea-sm w-full max-w-xs",
      placeholder: "Description",
    },
  };

  export const A12: Story = {
    args: {
      cls: "textarea textarea-bordered textarea-md w-full max-w-xs",
      placeholder: "Description",
    },
  };

  export const A13: Story = {
    args: {
      cls: "textarea textarea-bordered textarea-lg w-full max-w-xs",
      placeholder: "Description",
    },
  };

  
