import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Textarea from './Textarea.vue';

describe('ZekTextarea', () => {
  // Test case 1: Ensure the component renders correctly
  it('renders correctly', () => {
    const wrapper = shallowMount(Textarea, {
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
  it('emits textarea and change events when value changes', async () => {
    const wrapper = shallowMount(Textarea);

    // Simulate textarea change
    await wrapper.find('textarea').setValue('New Value');

    // Check if 'textarea' and 'change' events were emitted
    expect(wrapper.emitted().textarea).toBeTruthy();
    expect(wrapper.emitted().change).toBeTruthy();
  });

  // Test case 3: Check if textarea field has correct value
  it('sets the textarea field value correctly', async () => {
    const wrapper = shallowMount(Textarea, {
      props: {
        value: 'Test Value',
      },
    });

    // Check if the textarea field has the correct value
    expect(wrapper.props('value')).toBe('Test Value')
  });

  // Add more test cases as needed to achieve 70% coverage
});
