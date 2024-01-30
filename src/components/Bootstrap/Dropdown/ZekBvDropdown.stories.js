import ZekBvDropdown from './ZekBvDropdown.vue'

export default {
  title: 'Bootstrap/ZekBvDropdown',
  component: ZekBvDropdown,
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
    size: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
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
  components: { ZekBvDropdown },
  template: '<ZekBvDropdown v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    value: null,
    items: [
      { value: null, text: 'Please select an option', disabled: true},
      { value: 'a', text: 'This is First option' },
      { value: 'b', text: 'Selected Option' },
      {
        label: 'Grouped options',
        options: [
          { value:  '3PO' , text: 'Option with object value' },
          { value: { R: '2D2' }, text: 'Another option with object value' } //REVIEW - please check the handling when the value is object, I am not sure what to emit in this case
        ]
      }
    ],
    // items: ['a', 'b', 'c']
    size: 'lg',
    successMessage: 'success',
    errorMessage: 'error',
    label: 'dropdown',
    required: true,
    description: 'try it out '
}
