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

  // Test case: Check if clicking on dropdown button emits buttonClick event
    it('emits toggle event when dropdown button is clicked', async () => {
      const wrapper = mount(ZekBvDropdown)

      // Initially, show is false, so onToggle should emit true
    await wrapper.vm.onToggle();
    expect(wrapper.emitted().toggle).toBeTruthy();
    expect(wrapper.emitted().toggle[0]).toEqual([true]);

    // Now, show is true, so onToggle should emit false
    await wrapper.setData({ show: true });
    await wrapper.vm.onToggle();
    expect(wrapper.emitted().toggle).toBeTruthy();
    expect(wrapper.emitted().toggle[1]).toEqual([false]);
    })

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
