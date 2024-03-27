import { mount } from '@vue/test-utils'
import ZekBvNavbar from './ZekBvNavbar.vue'
import { describe, it, expect } from 'vitest'

describe('ZekBvNavbar', () => {
  it('emits "submit" event with input value when the submit button is clicked', async () => {
    const wrapper = mount(ZekBvNavbar, {
      props: {
        inputProps: { placeholder: 'Search...', label: 'Search' }
      }
    })

    await wrapper.find('input[type="text"]').setValue('test input')
    await wrapper.find('.submit-btn').trigger('click.prevent')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0][0]).toBe('test input')
  })

  it('renders navbar items correctly based on the "items" prop', () => {
    const items = [
      { type: 'text', text: 'Home' },
      {
        type: 'dropdown',
        text: 'Dropdown',
        options: [
          { text: 'Option 1', link: '/option1' },
          { text: 'Option 2', link: '/option2' }
        ]
      }
    ]

    const wrapper = mount(ZekBvNavbar, {
      props: { items }
    })

    const navTextItems = wrapper.findAll('.navbar-text')
    expect(navTextItems.length).toBe(1)
    expect(navTextItems[0].text()).toBe('Home')

    const navItemDropdowns = wrapper.findAll('.dropdown-toggle')
    expect(navItemDropdowns.length).toBe(1)
    expect(navItemDropdowns[0].text()).toBe('Dropdown')
  })
})
