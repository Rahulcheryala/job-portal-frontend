import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Dropdown';

/**/

const metasel = {
  title: 'Example/Dropdown/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    cls: { control: { disable: true } },
  },
 
} satisfies Meta<typeof Select>;

export default metasel;
type Story2 = StoryObj<typeof metasel>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**/


export const s1: Story2 = {
  args: {
     cls: "select w-full max-w-xs",
  },
};
export const s2: Story2 = {
  args: {
     cls: "select select-bordered w-full max-w-xs",
  },
};
export const s3: Story2 = {
  args: {
     cls: "select select-ghost w-full max-w-xs",
  },
};
export const s4: Story2 = {
  args: {
     cls: "select select-primary w-full max-w-xs",
  },
};
export const s5: Story2 = {
  args: {
     cls: "select select-secondary w-full max-w-xs",
  },
};
export const s6: Story2 = {
  args: {
     cls: "select select-accent w-full max-w-xs",
  },
};
export const s7: Story2 = {
  args: {
     cls: "select select-info w-full max-w-xs",
  },
};
export const s8: Story2 = {
  args: {
     cls: "select select-success w-full max-w-xs",
  },
};
export const s9: Story2 = {
  args: {
     cls: "select select-warning w-full max-w-xs",
  },
};
export const s10: Story2 = {
  args: {
     cls: "select select-error w-full max-w-xs",
  },
};
export const s11: Story2 = {
  args: {
     cls: "select select-bordered select-lg w-full max-w-xs",
  },
};
export const s12: Story2 = {
  args: {
     cls: "select select-bordered w-full max-w-xs",
  },
};
export const s13: Story2 = {
  args: {
     cls: "select select-bordered select-sm w-full max-w-xs",
  },
};
export const s14: Story2 = {
  args: {
     cls: "select select-bordered select-xs w-full max-w-xs",
  },
};

s1.storyName="Select";
s2.storyName="Select with border";
s3.storyName="Ghost (no background)";
s4.storyName="Primary color";
s5.storyName="Secondary color";
s6.storyName="Accent color";
s7.storyName="Info color";
s8.storyName="Success color";
s9.storyName="Warning color";
s10.storyName="Error color";
s11.storyName="Large";
s12.storyName="Normal";
s13.storyName="Small";
s14.storyName="Tiny";