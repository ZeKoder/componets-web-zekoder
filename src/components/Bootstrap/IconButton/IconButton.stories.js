import IconButton from './IconButton.vue';
import { userEvent, within } from '@storybook/testing-library';


export default {
  title: 'Components/ZekIconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text', defaultValue: 'fa fa-star' },
    onClick: { control: 'action', action: 'clicked' },
  },
};

const Template = (args, { argTypes }) => ({
  setup() {
    return { args };
  },
  props: Object.keys(argTypes),
  components: { IconButton },
  template: '<IconButton v-bind="args" @onClick="onClick" />',
});

export const Default = Template.bind({});
Default.args = {
  icon: 'fa fa-star',
};

Default.play = async ({ canvasElement }) => {
  const button = within(canvasElement).getByRole('button');
  await userEvent.click(button);
}