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

export const Default = {
  render: Template,

  args: {
    items: [
      { type: 'text', text: 'navbar text' },
      { type: 'tab', text: 'home', href: '#' },
      { type: 'tab', text: 'about', href: '#', disabled: true },
      {
        type: 'dropdown',
        label: 'settings',
        variant: 'danger',
        header: 'Dropdown header',
        events: {
          select: (e, item) => {console.log('selected', item)},
        },
        navClass: 'ms-auto me-3',
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
          fontSize: '24px',
          textTransform: 'capitalize',
          backgroundColor: 'yellow',
          borderRadius: '10px'
        },
        dropdownCustomStyle: {}
      }
    }
  }
}
