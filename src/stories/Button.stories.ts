import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const b1: Story = {
  args: {
    cls: "btn btn-primary"
  },
};

export const b2: Story = {
  args: {
    cls: "btn btn-secondary"
  },
};

export const b3: Story = {
  args: {
   cls: "btn btn-accent"
  },
};

export const b4: Story = {
  args: {
    cls: "btn btn-ghost"
  },
};

export const b5: Story = {
    args: {
      cls: "btn btn-neutral"
    },
  };

  export const b6: Story = {
    args: {
      cls: "btn btn-link"
    },
  };
  export const b7: Story = {
    args: {
      cls: "btn btn-info"
    },
  };
  export const b8: Story = {
    args: {
      cls: "btn btn-success"
    },
  };
  export const b9: Story = {
    args: {
      cls: "btn btn-warning"
    },
  };
  export const b10: Story = {
    args: {
      cls: "btn btn-error"
    },
  };

  export const b11: Story = {
    args: {
      cls: "btn btn-outline"
    },
  };

  export const b12: Story = {
    args: {
      cls: "btn btn-outline btn-primary"
    },
  };

  export const b13: Story = {
    args: {
      cls: "btn btn-outline btn-secondary"
    },
  };

  export const b14: Story = {
    args: {
      cls: "btn btn-outline btn-info"
    },
  };

  export const b15: Story = {
    args: {
      cls: "btn btn-outline btn-success"
    },
  };

  export const b16: Story = {
    args: {
      cls: "btn btn-outline btn-warning"
    },
  };

  export const b17: Story = {
    args: {
      cls: "btn btn-outline btn-error"
    },
  };

  export const b18: Story = {
    args: {
      cls: "btn btn-outline btn-accent"
    },
  };


  export const b19: Story = {
    args: {
      cls: "btn btn-active"
    },
  };

  export const b20: Story = {
    args: {
      cls: "btn btn-active btn-neutral"
    },
  };

  export const b21: Story = {
    args: {
      cls: "btn btn-active btn-primary"
    },
  };

  export const b22: Story = {
    args: {
      cls: "btn btn-active btn-secondary"
    },
  };

  export const b23: Story = {
    args: {
      cls: "btn btn-active btn-accent"
    },
  };

  export const b24: Story = {
    args: {
      cls: "btn btn-active btn-ghost"
    },
  };

  export const b25: Story = {
    args: {
      cls: "btn btn-active btn-link"
    },
  };

  export const b26: Story = {
    args: {
      cls: "btn btn-lg"
    },
  };

  export const b27: Story = {
    args: {
      cls: "btn"
    },
  };
  export const b28: Story = {
    args: {
      cls: "btn btn-sm"
    },
  };
  export const b29: Story = {
    args: {
      cls: "btn btn-xs"
    },
  };

  export const b30: Story = {
    args: {
      cls: "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
    },
  };

  export const b31: Story = {
    args: {
      cls: "btn btn-wide"
    },
  };

  export const b32: Story = {
    args: {
      cls: "btn glass"
    },
  };

  export const b33: Story = {
    args: {
      cls: "btn btn-block"
    },
  };
