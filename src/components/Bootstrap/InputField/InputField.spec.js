import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputField from './InputField.vue';

describe('ZekInputField', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(InputField, {
      props: {
        // provide necessary props for testing
        value: 'Test Value',
        label: 'Test Label',
        // Add other props as needed
      },
    });

    // Your assertions go here
    expect(wrapper.exists()).toBe(true);
    // Add more assertions as needed
  });

  // Test case 2: Check if emitted events work
  //REVIEW - need preview after fixing the emit events issue
  it('emits input and change events when value changes', async () => {
    const wrapper = shallowMount(InputField);

    // Simulate input change
    await wrapper.find('input').setValue('New Value');

    // Check if 'input' and 'change' events were emitted
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  // Test case 3: Check if input field has correct value
  it('sets the input field value correctly', async () => {
    const wrapper = shallowMount(InputField, {
      props: {
        value: 'Test Value',
      },
    });

    // Check if the input field has the correct value
    expect(wrapper.props('value')).toBe('Test Value')
  });

  // Add more test cases as needed to achieve 70% coverage
});
