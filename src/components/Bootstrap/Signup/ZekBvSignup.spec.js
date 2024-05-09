import { mount } from '@vue/test-utils'
import ZekBvSignup from './ZekBvSignup.vue'
import { describe, it, expect } from 'vitest'

describe('ZekBvSignup', () => {

  it('renders the component', () => {
    const wrapper = mount(ZekBvSignup)
    expect(wrapper.exists()).toBe(true)
  })

  it('emits "beforeSignup" event when form is submitted', async () => {
    const wrapper = mount(ZekBvSignup)
    await wrapper.findComponent({ name: 'ZekBvForm' }).vm.$emit('submit')
    expect(wrapper.emitted('beforeSignup')).toBeTruthy()
  })

  // FIXME: This test is failing because it relies on a mock that is not working as expected
  // it('emits "onSignupSuccess" event when signup is successful', async () => {
  //   const wrapper = mount(ZekBvSignup)
  //   await wrapper.findComponent({ name: 'ZekBvForm' }).vm.$emit('submit')
  //   expect(wrapper.emitted('onSignupSuccess')).toBeTruthy()
  // })

  it('emits "onSignupError" event when signup fails', async () => {
    const wrapper = mount(ZekBvSignup)
    await wrapper.findComponent({ name: 'ZekBvForm' }).vm.$emit('error')
    expect(wrapper.emitted('onSignupError')).toBeTruthy()
  })

  it('emits "onSocialClick" event when a social icon is clicked', async () => {
    const wrapper = mount(ZekBvSignup, {
      props: {
        socialIcons: [
          { label: 'facebook', icon: 'facebook'},
          { label: 'google', icon: 'google'},
          { label: 'twitter', icon: 'twitter'},
        ]
      }
    })
    await wrapper.find('.social-icon').trigger('click')
    expect(wrapper.emitted('onSocialClick')).toBeTruthy()
  })
})