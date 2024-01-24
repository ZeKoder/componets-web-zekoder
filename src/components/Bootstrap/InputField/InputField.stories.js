import InputField from './InputField.vue'

export default {
  title: 'Components/ZekInputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'text',
        'number',
        'email',
        'password',
        'search',
        'url',
        'tel',
        'date',
        'time',
        'range',
        'color'
      ],
      defaultValue: 'text'
    },
    label: {
      control: { type: 'object' }
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
    min: {
      control: { type: 'text' }
    },
    max: {
      control: { type: 'text' }
    },
    step: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    formatter: {
      control: { type: 'function' }
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
  components: { InputField },
  template: '<InputField v-bind="args" @input="input" @change="change" />' //REVIEW - events are not triggered in actions.
})

export const Default = Template.bind({})
Default.args = {
  type: 'text'
}
