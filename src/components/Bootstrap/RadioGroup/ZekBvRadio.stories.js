import ZekBvRadio from './ZekBvRadio.vue'

export default {
  title: 'Bootstrap/ZekBvRadio',
  component: ZekBvRadio,
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
    name: {
      control: { type: 'text' }
    },
    id: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    type: {
      control: { type: 'select' },
      options: ['buttons', 'plain', 'default']
    },
    onChange: { control: 'action', action: 'change' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvRadio },
  template: '<ZekBvRadio v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    value: 'second',
    items: [
      { text: 'First Check', value: 'first', disabled: true },
      { text: 'Second Check', value: 'second' },
      { text: 'Third Check', value: 'third' }
    ]
    // items: ['a', 'b', 'c'],
    // size: 'md',
    // successMessage: 'success',
    // errorMessage: 'error',
    // label: 'checkbox',
    // required: true,
    // description: 'please select two',
  }
}
