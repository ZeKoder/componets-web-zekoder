import ZekBvInput from './ZekBvInput.vue'

export default {
  title: 'Bootstrap/ZekBvInput',
  component: ZekBvInput,
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
    min: {
      control: { type: 'text' }
    },
    max: {
      control: { type: 'text' }
    },
    step: {
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
    onInput: { control: 'action', action: 'input' }, 
    onChange: { control: 'action', action: 'change' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvInput },
  template: '<ZekBvInput v-bind="args" />' 
})

export const Default = Template.bind({})
Default.args = {
  type: 'text'
}
