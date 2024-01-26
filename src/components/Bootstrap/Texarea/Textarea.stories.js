import Textarea from './Textarea.vue'

export default {
  title: 'Components/ZekTextarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    customClass: { type: 'text' },
    customStyle: { type: 'object' },
    required: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    value: {
      control: { type: 'text' }
    },
    name: {
      control: { type: 'text' }
    },
    id: {
      control: { type: 'text' }
    },
    placeholder: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    readonly: {
      control: { type: 'boolean' }
    },
    input: { control: 'action', action: 'input' }, 
    change: { control: 'action', action: 'change' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { Textarea },
  template: '<Textarea v-bind="args" @input="input" @change="change" />' //REVIEW - events are not triggered in actions.
})

export const Default = Template.bind({})
Default.args = {
 
}
