import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ZekBvButton from './ZekBvButton.vue';

describe('ZekBvButton', () => {
  it('renders default button with provided label', () => {
    const label = 'Click me';
    const wrapper = mount(ZekBvButton, {
      props: { label, variant: 'secondary' }
    });

    expect(wrapper.text()).toContain(label);
    expect(wrapper.classes()).toContain('btn-secondary');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(ZekBvButton);
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('emits pressed event when pressed prop changes', async () => {
    const wrapper = mount(ZekBvButton, {
        props: { label: 'button' }
      });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().pressed).toBeTruthy();
    expect(wrapper.emitted().pressed[0]).toEqual([true]);

  });

  it('sets customProps and customEvents correctly', async () => {
    const customProps = { size: 'lg' };
    const customEvents = {  click: vi.fn(), pressed: vi.fn() };

    const wrapper = mount(ZekBvButton, {
      props: {
        customProps,
        customEvents,
      },
    });
    
    expect(wrapper.vm.$props.customProps).toEqual(customProps);
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents);
    expect(wrapper.findComponent({ ref: 'ZekBvButton' }).props('size')).toBe('lg');
  });

  it('renders customButton HTML inside span when customButton prop is provided', () => {
    const customButton = '<strong>Custom Button</strong>';
    const wrapper = mount(ZekBvButton, {
      props: { customButton }
    });

    const spanElement = wrapper.find('span');
    expect(spanElement.exists()).toBe(true);
    expect(spanElement.html()).toContain(customButton);
  });

});
