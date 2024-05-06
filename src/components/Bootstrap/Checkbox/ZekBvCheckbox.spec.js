import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ZekBvCheckbox from './ZekBvCheckbox.vue';

describe('ZekBvCheckbox', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(ZekBvCheckbox, {
      props: {
        value: ['Test Value1'],
        label: 'Test Label',
        items: ['Test Value1', 'Test Value2']
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Test case 2: Check if emitted events work
  it('emits input and change events when value changes', async () => {
    const wrapper = mount(ZekBvCheckbox, {
      props: {
        items: ['Test Value1', 'Test Value2']
      },
    });

    // Simulate checkbox change
    await wrapper.findAll('input[type="checkbox"]')[0].setValue('Test Value1');

    // Check if 'input' and 'change' events were emitted
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  // Test case 3: Check if value bind correctly
  it('bind value correctly', () => {
    const wrapper = mount(ZekBvCheckbox, {
      props: {
        items: ['Test Value1', 'Test Value2']
      },
    });

    // Check if the checkbox field has the correct value
    const dropdownElement = wrapper.findAll('input[type="checkbox"]');
    expect(dropdownElement[0].exists()).toBe(true);
    expect(dropdownElement[1].exists()).toBe(true);
    expect(dropdownElement[0].element._value).toBe('Test Value1');
    expect(dropdownElement[1].element._value).toBe('Test Value2');
  });

  // Test case 4: Check if the label has a red asterisk when required
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvCheckbox, {
      props: {
        label: 'Test Label',
        numberOfRequiredChecks: 1,
      },
    });

    // Check if the label has a red asterisk
    const labelElement = wrapper.find('.required');
    expect(labelElement.exists()).toBe(true);
  });

  // Test case 5: Check if success message display on error true
  it('displays success message if error is true', () => {
    const wrapper = mount(ZekBvCheckbox, {
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
   it('displays error message if error is false', () => {
    const wrapper = mount(ZekBvCheckbox, {
      props: {
        error: false,
        errorMessage: 'error',
      },
    });

    const feedbackMessage = wrapper.find('.invalid-feedback');
    expect(feedbackMessage.text()).toBe('error');
    expect(feedbackMessage.exists()).toBe(true);
  });

   // Test case 7: Check if customProps and customEvents are passed correctly
   it('sets customProps and customEvents correctly', async () => {
    // Define customProps and customEvents
    const customProps = { size: 'lg' };
    const customEvents = {  input: vi.fn(), change: vi.fn() };

    // Mount the component with customProps and customEvents
    const wrapper = mount(ZekBvCheckbox, {
      props: {
        customProps,
        customEvents,
      },
    });
    
    // Check if customProps and customEvents are present in the rendered component
    expect(wrapper.vm.$props.customProps).toEqual(customProps);
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents);
    // Check if customProps are correctly bound in the component
    expect(wrapper.findComponent({ ref: 'ZekBvCheckbox' }).props('size')).toBe('lg');

  });
});
