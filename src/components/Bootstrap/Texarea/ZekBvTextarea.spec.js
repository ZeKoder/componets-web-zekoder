import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ZekBvTextarea from './ZekBvTextarea.vue';

describe('ZekBvTextarea', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(ZekBvTextarea, {
      props: {
        value: 'Test Value',
        label: 'Test Label',
        rows: 2
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // Test case 2: Check if emitted events work
  it('emits textarea and change events when value changes', async () => {
    const wrapper = mount(ZekBvTextarea);

    // Simulate textarea change
    await wrapper.find('textarea').setValue('New Value');

    // Check if 'textarea' and 'change' events were emitted
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  // Test case 3: Check if props bind correctly
  it('bind props correctly', async () => {
    const wrapper = mount(ZekBvTextarea, {
      props: {
        value: 'Test Value',
        label: 'Test Label',
      },
    });

    // Check if the textarea field has the correct value
    const textareaElement = wrapper.find('textarea');
    expect(textareaElement.exists()).toBe(true);
    await wrapper.vm.$nextTick();
    expect(textareaElement.element._value).toBe('Test Value');
  });

  // Test case 4: Check if the label has a red asterisk when required
  it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvTextarea, {
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
    const wrapper = mount(ZekBvTextarea, {
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
    const wrapper = mount(ZekBvTextarea, {
      props: {
        error: false,
        errorMessage: 'error',
      },
    });

    const feedbackMessage = wrapper.find('.invalid-feedback');
    expect(feedbackMessage.text()).toBe('error');
    expect(feedbackMessage.exists()).toBe(true);
  });

   // Test case 7: Check if error message display on error false
   it('displays a red asterisk for the label when required', () => {
    const wrapper = mount(ZekBvTextarea, {
      props: {
        error: false,
        errorMessage: 'error',
      },
    });

    const feedbackMessage = wrapper.find('.invalid-feedback');
    expect(feedbackMessage.text()).toBe('error');
    expect(feedbackMessage.exists()).toBe(true);
  });

   // Test case 8: Check if customProps and customEvents are passed correctly
   it('sets customProps and customEvents correctly', () => {
    // Define customProps and customEvents
    const customProps = { prop1: 'value1', prop2: 'value2' };
    const customEvents = {  event1: vi.fn(), event2: vi.fn() };

    // Mount the component with customProps and customEvents
    const wrapper = mount(ZekBvTextarea, {
      props: {
        customProps,
        customEvents,
        // Add other necessary props for testing
      },
    });

    // Check if customProps and customEvents are present in the rendered component
    expect(wrapper.vm.$props.customProps).toEqual(customProps);
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents);
  });
});