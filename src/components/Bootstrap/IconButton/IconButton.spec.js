import { shallowMount } from '@vue/test-utils';
import IconButton from './IconButton.vue';

describe('IconButton', () => {
  it('renders button with correct icon class', () => {
    const icon = 'fa fa-home';
    const wrapper = shallowMount(IconButton, {
      props: {
        icon: icon,
      },
    });

    const button = wrapper.find('.icon-button');
    const iconElement = wrapper.find('.icon');

    expect(button.exists()).toBe(true);
    expect(iconElement.exists()).toBe(true);
    expect(iconElement.classes()).toContain(icon);
  });

  it('emits click event when button is clicked', () => {
    const wrapper = shallowMount(IconButton);

    const button = wrapper.find('.icon-button');
    button.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
