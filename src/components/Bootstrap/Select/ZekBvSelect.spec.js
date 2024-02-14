import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ZekBvSelect from './ZekBvSelect.vue'

describe('ZekBvSelect', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(ZekBvSelect, {
      props: {
        value: 'Test Value',
        label: 'Test Label',
        items: [{}, {}]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  // Test case 2: Check if emitted events work
  it('emits input and change events when value changes', async () => {
    const wrapper = mount(ZekBvSelect)

    // Simulate dropdown change
    // For select without multiple
    await wrapper.find('select').setValue('value1')
    // For select with multiple
    await wrapper.find('select').setValue(['value1', 'value3'])
    // Check if 'input' and 'change' events were emitted
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
  })

  // Test case 3: Check if props bind correctly
  it('bind props correctly', async () => {
    const wrapper = mount(ZekBvSelect, {
      props: {
        value: 'Test Value',
        label: 'Test Label'
      }
    })

    // Check if the dropdown field has the correct value
    const dropdownElement = wrapper.find('select')
    expect(dropdownElement.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(dropdownElement.element._value).toBe('Test Value')
  })

  // Test case 4: Check if the label has a red asterisk when required
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvSelect, {
      props: {
        label: 'Test Label',
        required: true
      }
    })

    // Check if the label has a red asterisk
    const labelElement = wrapper.find('.required')
    expect(labelElement.exists()).toBe(true)
  })

  // Test case 5: Check if success message display on error true
  it('displays success message if error is true', () => {
    const wrapper = mount(ZekBvSelect, {
      props: {
        error: true,
        successMessage: 'success'
      }
    })

    const feedbackMessage = wrapper.find('.valid-feedback')
    expect(feedbackMessage.text()).toBe('success')
    expect(feedbackMessage.exists()).toBe(true)
  })

  // Test case 6: Check if error message display on error false
  it('displays error message if error is false', () => {
    const wrapper = mount(ZekBvSelect, {
      props: {
        error: false,
        errorMessage: 'error'
      }
    })

    const feedbackMessage = wrapper.find('.invalid-feedback')
    expect(feedbackMessage.text()).toBe('error')
    expect(feedbackMessage.exists()).toBe(true)
  })

  // Test case 7: Check if customProps and customEvents are passed correctly
  it('sets customProps and customEvents correctly', () => {
    // Define customProps and customEvents
    const customProps = { prop1: 'value1', prop2: 'value2' }
    const customEvents = { event1: vi.fn(), event2: vi.fn() }

    // Mount the component with customProps and customEvents
    const wrapper = mount(ZekBvSelect, {
      props: {
        customProps,
        customEvents
      }
    })

    // Check if customProps and customEvents are present in the rendered component
    expect(wrapper.vm.$props.customProps).toEqual(customProps)
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents)
  })

  // Test case 8: Check if list items are shown properly
  it('renders list items correctly', async () => {
    // Define some dummy items for testing
    const dummyItems = [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' }
    ]

    // Mount the ZekBvDropdown component with dummy items
    const wrapper = mount(ZekBvSelect, {
      props: {
        items: dummyItems
      }
    })

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()

    // Find the rendered list items
    const listItems = wrapper.findAll('option')

    // Assert that the correct number of list items are rendered
    expect(listItems.length).toBe(dummyItems.length)

    // Assert that each list item has the correct text and value
    dummyItems.forEach((item, index) => {
      const listItem = listItems[index]
      expect(listItem.text()).toBe(item.text)
      expect(listItem.attributes('value')).toBe(item.value)
    })
  })
})
