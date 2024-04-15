import ZekBvProgressbar from './ZekBvProgressbar.vue'

export default {
  title: 'Bootstrap/ZekBvProgressbar',
  component: ZekBvProgressbar,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'text' }
    },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvProgressbar },
  template: '<ZekBvProgressbar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    value: '50',
    max: '100',
    label: {
        text: 'Progress: 50%'
      }
}
