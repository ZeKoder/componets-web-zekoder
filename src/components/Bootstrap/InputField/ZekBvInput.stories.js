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
        'color',
        'datetime',
        'datetime-local',
        'month',
        'week'
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
    onKeyDown: { control: 'action', action: 'keydown' },
    onEnter: { control: 'action', action: 'enter' },
    onHintClick: { control: 'action', action: 'hint-click' },
    onIconClick: { control: 'action', action: 'icon-click' },
    onTrailingIconClick: { control: 'action', action: 'trailing-icon-click' },
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

export const Default = {
  render: Template,

  args: {
    type: 'number',
    hint: 'This is hint',
    icon: "fas fa-envelope clickable",
    trailingIcon: "fas fa-check",
  }
}
