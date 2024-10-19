import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextInput } from './TextInput';

const meta = {
  title: 'Example/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const i1: Story = {
    args: {
      cls :"input input-bordered w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i2: Story = {
    args: {
      cls :"input input-bordered input-primary w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i3: Story = {
    args: {
      cls :"input input-bordered input-secondary w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i4: Story = {
    args: {
      cls :"input input-ghost w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i5: Story = {
    args: {
      cls :"input input-bordered input-accent w-full max-w-xs",
      placeholder:"Type here",
    },
  };


  export const i6: Story = {
    args: {
      cls :"input input-bordered input-info w-full max-w-xs",
      placeholder:"Type here",
    },
  };
  export const i7: Story = {
    args: {
      cls :"input input-bordered input-success w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i8: Story = {
    args: {
      cls :"input input-bordered input-warning w-full max-w-xss",
      placeholder:"Type here",
    },
  };

  export const i9: Story = {
    args: {
      cls :"input input-bordered input-error w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i10: Story = {
    args: {
      cls :"input input-bordered w-full max-w-xs",
      placeholder:"You can't touch this",
      disabled: true,
    },
  };


  export const i11: Story = {
    args: {
      cls :"input input-bordered input-xs w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i12: Story = {
    args: {
      cls :"input input-bordered input-sm w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i13: Story = {
    args: {
      cls :"input input-bordered input-md w-full max-w-xs",
      placeholder:"Type here",
    },
  };

  export const i14: Story = {
    args: {
      cls :"input input-bordered input-lg w-full max-w-xs",
      placeholder:"Type here",
    },
  };