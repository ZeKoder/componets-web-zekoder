import ZekBvNavbar from './ZekBvNavbar.vue'

export default {
  title: 'Bootstrap/ZekBvNavbar',
  component: ZekBvNavbar,
  tags: ['autodocs'],
  argTypes: {
    customClass: { control: { type: 'text' } },
    customStyle: { control: { type: 'object' } },
    onSubmit: { control: 'action', action: 'submit' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvNavbar },
  template: '<ZekBvNavbar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  items: [
    { type: 'text', text: 'navbar text' },
    { type: 'tab', text: 'home', href: '#' },
    { type: 'tab', text: 'about', href: '#', disabled: true },
    {
      type: 'dropdown',
      text: 'lang',
      navClass: 'ms-auto',
      href: '#',
      options: [{ text: 'en', link: '#' }]
    }
  ],
  toggleable: 'sm',
  variant: 'primary',
  colorMode: 'dark',
  container: 'fluid',
  inputProps: {
    customClass: 'me-2',
    placeholder: 'Search'
  },
  buttonProps: {
    type: 'submit',
    variant: 'outline-success',
    label: 'Search'
  }
}
