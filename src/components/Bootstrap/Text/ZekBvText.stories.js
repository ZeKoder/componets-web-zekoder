import ZekBvText from './ZekBvText.vue'

export default {
  title: 'Bootstrap/ZekBvText',
  component: ZekBvText,
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
  components: { ZekBvText },
  template: '<ZekBvText v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}
