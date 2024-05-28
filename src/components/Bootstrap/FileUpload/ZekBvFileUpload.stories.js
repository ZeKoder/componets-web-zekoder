import ZekBvFileUpload from './ZekBvFileUpload.vue'

export default {
  title: 'Bootstrap/ZekBvFileUpload',
  component: ZekBvFileUpload,
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
      control: { type: 'object' }
    },
    name: {
      control: { type: 'text' }
    },
    id: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    onRemove: { control: 'action', action: 'remove' },
    onUpdate: { control: 'action', action: 'update' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvFileUpload },
  template: '<ZekBvFileUpload v-bind="args" />'
})

export const Default = {
  render: Template,
  args: {}
}
