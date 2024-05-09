import ZekLogin from './ZekLogin.vue'

export default {
  title: 'Auth/ZekLogin',
  component: ZekLogin,
  tags: ['autodocs'],
  argTypes: {
    onBeforeLogin: { control: 'action', action: 'beforeLogin' },
    onOnLoginSuccess: { control: 'action', action: 'onLoginSuccess' },
    onOnLoginError: { control: 'action', action: 'onLoginError' },
    onOnSocialClick: { control: 'action', action: 'onSocialClick' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekLogin },
  template: '<ZekLogin v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    loginButton: 'fit-content',
    url: 'https://auth.dev.zekoder.net/login',
}
