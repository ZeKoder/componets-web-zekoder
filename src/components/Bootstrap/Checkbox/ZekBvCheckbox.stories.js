import ZekBvCheckbox from './ZekBvCheckbox.vue'

export default {
  title: 'Bootstrap/ZekBvCheckbox',
  component: ZekBvCheckbox,
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
    // value: {
    //   control: { type: 'list' }
    // },
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
      options: ['buttons', 'plain', 'switches', 'default']
    },
    onInput: { control: 'action', action: 'input' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvCheckbox },
  template: '<ZekBvCheckbox v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    value: ['first'],
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
