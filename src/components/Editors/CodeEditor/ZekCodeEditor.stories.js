import ZekCodeEditor from './ZekCodeEditor.vue'

export default {
  title: 'Editors/ZekCodeEditor',
  component: ZekCodeEditor,
  tags: ['autodocs'],
  argTypes: {
    onOnInput: { control: 'action', action: 'onInput' },
    onOnError: { control: 'action', action: 'onError' },
    onOnSendPrompt: { control: 'action', action: 'onSendPrompt' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekCodeEditor },
  template: '<ZekCodeEditor v-bind="args" />'
})

export const Default = {
  render: Template,
  args: {}
}
