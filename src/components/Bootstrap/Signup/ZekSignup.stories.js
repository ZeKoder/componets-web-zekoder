import ZekSignup from './ZekSignup.vue'

export default {
  title: 'Auth/ZekSignup',
  component: ZekSignup,
  tags: ['autodocs'],
  argTypes: {
    onBeforeSignup: { control: 'action', action: 'beforeSignup' },
    onOnSignupSuccess: { control: 'action', action: 'onSignupSuccess' },
    onOnSignupError: { control: 'action', action: 'onSignupError' },
    onOnSocialClick: { control: 'action', action: 'onSocialClick' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekSignup },
  template: '<ZekSignup v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    loginButton: 'fit-content',
    url: 'https://auth.dev.zekoder.net/login',
}
