import ZekUserInfo from './ZekUserInfo.vue'

export default {
  title: 'Common/ZekUserInfo',
  component: ZekUserInfo,
  tags: ['autodocs'],
  argTypes: {
    onLinkClicked: { control: 'action', action: 'linkClicked' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekUserInfo },
  template: '<ZekUserInfo v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
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
