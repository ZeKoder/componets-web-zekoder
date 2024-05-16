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
  },
  allowInput: true,
  allowButton: true,
  userInfo: {
    props: {
      firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://avatars3.githubusercontent.com/u/1234?s=460&v=4',
    status: 'online',
    showName: true,
    namePosition: 'left',
    dropdownLinks: [
        {
            label: 'Link 1',
            url: 'https://google.com',
            icon: 'fas fa-link'
        },
        {
            label: 'Link 2',
            url: 'https://google.com'
        },
        {
            label: 'Link 3',
            url: 'https://google.com'
        }
    ],
    customStyle: {
        "fontSize": "24px",
        "textTransform": "capitalize",
        "backgroundColor": "yellow",
        "borderRadius": "10px",
    },
    dropdownCustomStyle: {
    }
    }
  }
}
