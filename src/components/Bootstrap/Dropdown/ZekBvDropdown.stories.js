import ZekBvDropdown from './ZekBvDropdown.vue'

export default {
  title: 'Bootstrap/ZekBvDropdown',
  component: ZekBvDropdown,
  tags: ['autodocs'],
  argTypes: {
    customClass: { type: 'text' },
    customStyle: { type: 'object' },
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      control: { type: 'text' }
    },
    autoClose: {
      control: { type: 'select' },
      options: ['inside', 'outside', true, false]
    },
    dropType: {
      control: { type: 'select' },
      options: ['end', 'start', 'up', 'default']
    },
    menuAlignment: {
      control: { type: 'select' },
      options: ['end', 'start', 'center', 'default']
    },
    onToggle: { control: 'action', action: 'toggle' },
    onLinkClick: { control: 'action', action: 'linkClick' }
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
  items: [
    { href: '/', text: 'go to page1', disabled: true },
    { href: '/', text: 'go to page2', variant: 'primary', divider: true },
    { text: 'action', active: true },
    {
      groupHeader: 'Grouped options',
      groupHeaderVariant: 'primary',
      text: 'sub action'
    },
    {  text: 'sub action2' }
  ],
  variant: 'secondary',
  header: 'Dropdown header'
}
