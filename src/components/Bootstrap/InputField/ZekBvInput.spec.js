import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ZekBvInput from './ZekBvInput.vue';

describe('ZekInputField', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(ZekBvInput, {
      props: {
        label: 'Test Label',
        type: 'text',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Test case 2: Check if emitted events work
  it('emits input and change events when value changes', async () => {
    const wrapper = mount(ZekBvInput)

    // Simulate input change
    await wrapper.find('input').setValue('New Value');

    // Check if 'input' and 'change' events were emitted
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  // Test case 3: Check if props bind correctly
  it('bind props correctly', async() => {
    const wrapper = mount(ZekBvInput, {
      props: {
        value: 'Test Value',
        label: 'Test Label',
      },
    });

    const inputElement = wrapper.find('input');
    expect(inputElement.exists()).toBe(true);
    await wrapper.vm.$nextTick();
    expect(inputElement.element._value).toBe('Test Value');
  });

  // Test case 4: Check if the label has a red asterisk when required
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvInput, {
      props: {
        label: 'Test Label',
        required: true,
      },
    });

    // Check if the label has a red asterisk
    const labelElement = wrapper.find('.required');
    expect(labelElement.exists()).toBe(true);
  });

  // Test case 5: Check if success message display on error true
  it('displays success message if error is true', () => {
    const wrapper = mount(ZekBvInput, {
      props: {
        error: true,
        successMessage: 'success',
      },
    });

    const feedbackMessage = wrapper.find('.valid-feedback');
    expect(feedbackMessage.text()).toBe('success');
    expect(feedbackMessage.exists()).toBe(true);
  });

  // Test case 6: Check if error message display on error false
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvInput, {
      props: {
        error: false,
        errorMessage: 'error',
      },
    });

    const feedbackMessage = wrapper.find('.invalid-feedback');
    expect(feedbackMessage.text()).toBe('error');
    expect(feedbackMessage.exists()).toBe(true);
  });

});
