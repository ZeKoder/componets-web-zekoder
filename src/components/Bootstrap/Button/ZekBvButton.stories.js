import ZekBvButton from './ZekBvButton.vue'

export default {
  title: 'Bootstrap/ZekBvButton',
  component: ZekBvButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'button',
        'submit',
        'reset'
      ]
    },
    styleType: {
      control: { type: 'select' },
      options: [
        'pill',
        'squared',
        'block',
        'default'
      ]
    },
    pressed: {
      control: { type: 'boolean' }
    },
    onClick: { control: 'action', action: 'click' }, 
    onPressed: { control: 'action', action: 'pressed' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvButton },
  template: '<ZekBvButton v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
   
}
