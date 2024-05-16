import ZekBvSignup from './ZekBvSignup.vue'

export default {
  title: 'Bootstrap/Auth/ZekBvSignup',
  component: ZekBvSignup,
  tags: ['autodocs'],
  argTypes: {
    onBeforeSignup: { control: 'action', action: 'beforeSignup' },
    onOnSignupSuccess: { control: 'action', action: 'onSignupSuccess' },
    onOnSignupError: { control: 'action', action: 'onSignupError' },
    onOnSocialClick: { control: 'action', action: 'onSocialClick' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvSignup },
  template: '<ZekBvSignup v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  loginButton: 'fit-content',
  url: 'https://auth.dev.zekoder.net/login'
}
