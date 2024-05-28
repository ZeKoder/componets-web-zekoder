import ZekText from './ZekText.vue'

export default {
  title: 'Common/ZekText',
  component: ZekText,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'p',
        'span',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'strong',
        'b',
        'em',
        'i',
        'u',
        'sup',
        'sub',
        'abbr',
        'blockquote',
        'cite',
        'code',
        'kbd',
        'pre',
        'q'
      ]
    },
    onClick: { control: 'action', action: 'click' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekText },
  template: '<ZekText v-bind="args" />'
})

export const Default = {
  render: Template,
  args: {}
}
