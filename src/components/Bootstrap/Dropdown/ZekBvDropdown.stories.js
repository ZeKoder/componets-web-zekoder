import ZekBvDropdown from './ZekBvDropdown.vue'

export default {
  title: 'Bootstrap/ZekBvDropdown',
  component: ZekBvDropdown,
  tags: ['autodocs'],
  argTypes: {
    customClass: { control: { type: 'text' } },
    customStyle: { control: { type: 'object' } },
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
    menuPosition: {
      control: { type: 'select' },
      options: ['end', 'start', 'center', 'default']
    },
    menuAlignment: {
      control: { type: 'select' },
      options: ['end', 'start', 'center', 'default']
    },
    onToggle: { control: 'action', action: 'toggle' },
    onLinkClick: { control: 'action', action: 'linkClick' },
    onClick: { control: 'action', action: 'click' }
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
      header: 'Grouped options',
      headerVariant: 'primary',
      text: 'sub action'
    },
    { text: 'sub action2', headerClass: 'custom' }
  ],
  variant: 'secondary',
  header: 'Dropdown header'
}
