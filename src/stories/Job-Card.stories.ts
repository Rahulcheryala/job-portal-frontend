import type { Meta, StoryObj } from '@storybook/react';
import { JobCard } from './Job-Card';

/**/

const meta = {
  title: 'Example/Job Card',
  component: JobCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    cls: { control: { disable: true } },divcls: { control: { disable: true } },fgcls: { control: { disable: true } },
  },
 
} satisfies Meta<typeof JobCard>;

export default meta;
type Story2 = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**/


export const s1: Story2 = {
  args: {
     imgflg:true,
  },
};
export const s2: Story2 = {
  args: {
     imgflg:true,
  },
};
export const s3: Story2 = {
  args: {
     bdg:true,imgflg:true,
  },argTypes: {
    bdg: { control: { disable: true } },
  },
};
export const s4: Story2 = {
  args: {
    imgflg:true,top:false,
  },argTypes: {
    top: { control: { disable: true } },imgflg: { control: { disable: true } },
  },
};
export const s5: Story2 = {
  args: {
     divcls:"card-body items-center text-center",imgflg:true,fgcls:"px-10 pt-10",
  },
};
export const s6: Story2 = {
  args: {
     cls: "card bg-base-100 shadow-xl image-full",imgflg:true,
  },argTypes: {
    imgflg: { control: { disable: true } },
  },
};
export const s7: Story2 = {
  args: {
     
  },argTypes: {
    imgflg: { control: { disable: true } },top: { control: { disable: true } },imgsrc: { control: { disable: true } },
  },
};
export const s8: Story2 = {
  args: {
     cls: "card bg-primary text-primary-content",
  },argTypes: {
    bgcolor: { control: { disable: true } },
  },
};
export const s9: Story2 = {
  args: {
     cls: "card bg-neutral text-neutral-content",divcls:"card-body items-center text-center",fgcls:"px-10 pt-10",
  },
  argTypes: {
    bgcolor: { control: { disable: true } },
  },
};
export const s10: Story2 = {
  args: {
    popup:true,imgflg:true,
  },argTypes: {
    popup: { control: { disable: true } },
  },
};
export const s11: Story2 = {
  args: {
     cls: "card glass",imgflg:true,
  },
};
export const s12: Story2 = {
  args: {
     cls: "card card-side bg-base-100 shadow-xl w-96",imgflg:true,
  },argTypes: {
    imgflg: { control: { disable: true } },
  },
};
export const s13: Story2 = {
  args: {
     cls: "card lg:card-side bg-base-100 shadow-xl w-96",imgflg:true,
  },
  argTypes: {
    imgflg: { control: { disable: true } },
  },
};


s1.storyName="Card";
s2.storyName="Compact card (less padding for `card-body`)";
s3.storyName="Card with badge";
s4.storyName="Image at bottom";
s5.storyName="Centered content and paddings";
s6.storyName="Image overlay";
s7.storyName="No image";
s8.storyName="Primary color";
s9.storyName="Centered card with neutral color";
s10.storyName="Card with action on top";
s11.storyName="Card glass";
s12.storyName="Image on side";
s13.storyName="Responsive card (vertical on small screen, horizontal on large screen)";