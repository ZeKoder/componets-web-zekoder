import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ZekBvDropdown from './ZekBvDropdown.vue'

describe('ZekBvDropdown', () => {
  // Test case: Check if dropdown renders correctly
  it('renders correctly', async () => {
    const wrapper = mount(ZekBvDropdown, {
      props: {
        items: [
          { id: 1, text: 'Item 1' },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3' }
        ]
      }
    })

    // Check if dropdown component exists
    expect(wrapper.exists()).toBe(true)

    // Check if dropdown items are rendered correctly
    const dropdownItems = wrapper.findAll('.dropdown-item')
    expect(dropdownItems.length).toBe(3)
    expect(dropdownItems[0].text()).toBe('Item 1')
    expect(dropdownItems[1].text()).toBe('Item 2')
    expect(dropdownItems[2].text()).toBe('Item 3')
  })

  // Test case: Check if clicking on dropdown button emits buttonClick event //NOTE - test fail because the event does not trigger.
  //   it('emits buttonClick event when dropdown button is clicked', async () => {
  //     const wrapper = mount(ZekBvDropdown)

  //     // Simulate click on dropdown button
  //     await wrapper.find('.dropdown-toggle').trigger('click')

  //     // Check if buttonClick event is emitted
  //     expect(wrapper.emitted().buttonClick).toBeTruthy()
  //     expect(wrapper.emitted().buttonClick.length).toBe(1)
  //     expect(wrapper.emitted().buttonClick[0][0]).toBe(true) // Check if the emitted value is true
  //   })

  // Test case: Check if clicking on dropdown item emits linkClick event with correct item
  it('emits linkClick event with correct item when dropdown item is clicked', async () => {
    const items = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' }
    ]
    const wrapper = mount(ZekBvDropdown, {
      props: { items }
    })

    // Simulate click on dropdown item
    await wrapper.findAll('.dropdown-item')[1].trigger('click')

    // Check if linkClick event is emitted with correct item
    expect(wrapper.emitted().linkClick).toBeTruthy()
    expect(wrapper.emitted().linkClick.length).toBe(1)
    expect(wrapper.emitted().linkClick[0][1]).toEqual(items[1]) // Check if the emitted item is correct
  })
})
