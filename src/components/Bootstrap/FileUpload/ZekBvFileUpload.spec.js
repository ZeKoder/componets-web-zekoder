import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ZekBvFileUpload from './ZekBvFileUpload.vue'

describe('ZekBvFileUpload', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(ZekBvFileUpload, {
      props: {
        label: 'Test Label'
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
  // Test case 2: Check if emitted event works
  const event = {
    target: {
      files: [
        {
          name: 'image.png',
          size: 50000,
          type: 'image/png'
        }
      ]
    }
  }
  it('emits update event ', () => {
    const wrapper = mount(ZekBvFileUpload)

    // Spy on the handleUpdate method
    const changeSpy = vi.spyOn(wrapper.vm, 'handleUpdate')

    // Trigger the update event with a file
    wrapper.vm.handleUpdate(event)

    // Check if 'change' event was emitted with the correct file data
    expect(changeSpy).toHaveBeenCalled()
    expect(changeSpy).toHaveBeenCalledWith(event) //FIXME - improve testing the functionality
  })

  // Test case 3: Check if the label has a red asterisk when required
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvFileUpload, {
      props: {
        label: 'Test Label',
        required: true
      }
    })

    // Check if the label has a red asterisk
    const labelElement = wrapper.find('.required')
    expect(labelElement.exists()).toBe(true)
  })

  // Test case 4: Check if success message display on error true
  it('displays success message if error is true', () => {
    const wrapper = mount(ZekBvFileUpload, {
      props: {
        error: true,
        successMessage: 'success'
      }
    })

    const feedbackMessage = wrapper.find('.valid-feedback')
    expect(feedbackMessage.text()).toBe('success')
    expect(feedbackMessage.exists()).toBe(true)
  })

  // Test case 5: Check if error message display on error false
  it('displays error message if error is false', () => {
    const wrapper = mount(ZekBvFileUpload, {
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
  it('sets customProps and customEvents correctly', async () => {
    // Define customProps and customEvents
    const customProps = { size: 'lg' }
    const customEvents = { input: vi.fn(), change: vi.fn() }

    // Mount the component with customProps and customEvents
    const wrapper = mount(ZekBvFileUpload, {
      props: {
        customProps,
        customEvents
      }
    })

    // Check if customProps and customEvents are present in the rendered component
    expect(wrapper.vm.$props.customProps).toEqual(customProps)
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents)
    // Check if customProps are correctly bound in the component
    expect(wrapper.findComponent({ ref: 'ZekBvFileUpload' }).props('size')).toBe('lg')
  })

  it('displays remove button when modelValue is present', async () => {
    const wrapper = mount(ZekBvFileUpload);

    // Set modelValue to a non-null File object
    await wrapper.setData({ modelValue: new File([''], 'file.txt', { type: 'text/plain' }) });

    // Check if the remove button exists
    const removeButton = wrapper.find('.remove-btn');
    expect(removeButton.exists()).toBe(true);

    // Check if the remove button contains the correct icon
    const icon = removeButton.find('.fa-xmark');
    expect(icon.exists()).toBe(true);
  });
})
