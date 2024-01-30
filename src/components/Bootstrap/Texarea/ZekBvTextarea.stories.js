import ZekBvTextarea from './ZekBvTextarea.vue'

export default {
  title: 'Bootstrap/ZekBvTextarea',
  component: ZekBvTextarea,
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
    description: {
      control: { type: 'text' }
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
  components: { ZekBvTextarea },
  template: '<ZekBvTextarea v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
 
}
