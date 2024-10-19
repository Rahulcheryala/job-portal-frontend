import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const metadd = {
    title: 'Example/Dropdown/dropdown',
    component: Dropdown,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      cls: { control: { disable: true } },
      bgcolor: { control: 'color' },btncolor: { control: 'color' },
    },
   
  } satisfies Meta<typeof Dropdown>;
  
  export default metadd;
  type Story = StoryObj<typeof metadd>;

  export const dd1: Story = {
    args: {
     
    },
  };
  
  export const dd2: Story = {
    args: {
       cls: "dropdown dropdown-end",
    },
  };
  
  export const dd3: Story = {
    args: {
       cls: "dropdown dropdown-top",
    },
  };
  
  export const dd4: Story = {
    args: {
       cls: "dropdown dropdown-top dropdown-end",
    },
  };  
  export const dd5: Story = {
    args: {
       cls: "dropdown dropdown-bottom",
    },
  };  
  export const dd6: Story = {
    args: {
       cls: "dropdown dropdown-bottom dropdown-end",
    },
  };  
  export const dd7: Story = {
    args: {
       cls: "dropdown dropdown-left",
    },
  };  
  export const dd8: Story = {
    args: {
       cls: "dropdown dropdown-left dropdown-end",
    },
  };  
  export const dd9: Story = {
    args: {
       cls: "dropdown dropdown-right",
    },
  };  
  export const dd10: Story = {
    args: {
       cls: "dropdown dropdown-right dropdown-end",
    },
  };  
  export const dd11: Story = {
    args: {
       cls: "dropdown dropdown-hover",
    },
  };  
  export const dd12: Story = {
    args: {
       cls: "dropdown dropdown-open",
    },
  };

dd1.storyName="Dropdown menu";
dd2.storyName="Dropdown(aligns to end)";
dd3.storyName="Dropdown top";
dd4.storyName="Dropdown top(aligns to end)";
dd5.storyName="Dropdown bottom";
dd6.storyName="Dropdown bottom(aligns to end)";
dd7.storyName="Dropdown left";
dd8.storyName="Dropdown left(aligns to end)";
dd9.storyName="Dropdown right";
dd10.storyName="Dropdown right(aligns to end)";
dd11.storyName="Open on hover";
dd12.storyName="Force open";