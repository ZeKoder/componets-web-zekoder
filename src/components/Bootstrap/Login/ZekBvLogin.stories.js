import ZekBvLogin from './ZekBvLogin.vue'

export default {
  title: 'Bootstrap/Auth/ZekBvLogin',
  component: ZekBvLogin,
  tags: ['autodocs'],
  argTypes: {
    onBeforeLogin: { control: 'action', action: 'beforeLogin' },
    onOnLoginSuccess: { control: 'action', action: 'onLoginSuccess' },
    onOnLoginError: { control: 'action', action: 'onLoginError' },
    onOnSocialClick: { control: 'action', action: 'onSocialClick' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvLogin },
  template: '<ZekBvLogin v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    loginButton: 'fit-content',
    url: 'https://auth.dev.zekoder.net/login'
  }
}
export const WithRedirect = {
  render: Template,
  args: {
    url: 'https://auth.dev.zekoder.net/login',
    redirectUrl: 'https://dev.admin.zekoder.net/auth/verifysociallogin',
    callbackUrl: 'https://auth.dev.zekoder.net/login_callback',
  }
};