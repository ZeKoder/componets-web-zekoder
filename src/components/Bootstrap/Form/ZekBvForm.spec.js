import { mount } from '@vue/test-utils';
import ZekBvForm from './ZekBvForm.vue';
import { describe, it, expect } from 'vitest';

describe('ZekBvForm', () => {
  it('submits form data when the submit button is clicked', async () => {
    const wrapper = mount(ZekBvForm, {
      props: {
        inputs: [
          { name: 'username', label: 'Username', value: 'testuser' },
          { name: 'password', label: 'Password', type: 'password', value: 'testpassword' },
        ],
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0][0]).toEqual({
      username: 'testuser',
      password: 'testpassword',
    });
  });

  it('resets form data when the reset button is clicked', async () => {
    const wrapper = mount(ZekBvForm, {
      props: {
        inputs: [
          { name: 'username', label: 'Username', value: 'testuser' },
          { name: 'password', label: 'Password', value: 'testpassword' },
        ],
      },
    });

    // Change input values
    await wrapper.setData({
      formData: {
        username: 'newuser',
        password: 'newpassword',
      },
    });

    await wrapper.find('button[action="reset"]').trigger('click.prevent');
    expect(wrapper.emitted('reset')).toBeTruthy();
    expect(wrapper.vm.formData).toEqual({
      username: 'testuser',
      password: 'testpassword',
    });
  });

  it('renders input fields based on the inputs prop', () => {
    const wrapper = mount(ZekBvForm, {
      props: {
        inputs: [
          { name: 'username',  component: 'input', type: 'text', label: 'Username' },
          { name: 'password',  component: 'input', type: 'password', label: 'Password' },
        ],
      },
    });
    console.log(wrapper.findAll('input[type="text"]'))

    expect(wrapper.findAll('input[type="text"]').length).toBe(1); // One text input
    expect(wrapper.findAll('input[type="password"]').length).toBe(1); // One password input
  });
});
