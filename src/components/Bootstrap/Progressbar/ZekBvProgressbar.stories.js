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
    value: '33.333333',
    max: '100',
    label: "Progress: 50%",
    customBar: {
      label: `${((33.333333 / 50) * 100).toFixed(2)}%`
    }
}
