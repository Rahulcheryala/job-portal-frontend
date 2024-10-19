import type { Meta, StoryObj } from '@storybook/react';
import { Tags } from './Tags';

/**/

const meta = {
  title: 'Example/Tags',
  component: Tags,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    dynamic: { control: { disable: true } },size: { control: { disable: true } },
    
  },
 
} satisfies Meta<typeof Tags>;

export default meta;
type Story2 = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**/


export const s1: Story2 = {
  
};
export const s2: Story2 = {
  args: {
    closeable:true,
  },argTypes: {
    closeable: { control: { disable: true } },
    
  },
};
export const s3: Story2 = {
  args: {
    linktg:true,
  },
  argTypes: {
    linktg: { control: { disable: true } },
    
  },
  
};
export const s4: Story2 = {
  args: {
    size:"lg",
  },
};
export const s5: Story2 = {
  args: {
    size:"md",
  },
};
export const s6: Story2 = {
  args: {
    size:"sm",
  },
};
export const s7: Story2 = {
  args: {
    color:"cyan", 
  }
};
export const s8: Story2 = {
  args: {
     dynamic: true,
  },
  argTypes: {
    linktg: { control: { disable: true } },closeable: { control: { disable: true } },
    
  },
};



s1.storyName="Text";
s2.storyName="Closable";
s3.storyName="Link";
s4.storyName="Large";
s5.storyName="Medium";
s6.storyName="Small";
s7.storyName="Colored";
s8.storyName="Dynamically tagging";
