import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ZekBvText from './ZekBvText.vue';

describe('ZekBvText', () => {
  it('renders text inside a <span> element by default', () => {
    const wrapper = mount(ZekBvText, {
      props: {
        text: 'Hello World'
      }
    });

    const spanElement = wrapper.find('span');
    expect(spanElement.exists()).toBe(true);
    expect(spanElement.text()).toBe('Hello World');
  });

  it('renders text inside a custom HTML tag based on the type prop', () => {
    const wrapper = mount(ZekBvText, {
      props: {
        text: 'Hello World',
        type: 'h2'
      }
    });

    const h2Element = wrapper.find('h2');
    expect(h2Element.exists()).toBe(true);
    expect(h2Element.text()).toBe('Hello World');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(ZekBvText, {
      props: {
        text: 'Click me'
      }
    });

    const component = wrapper.findComponent(ZekBvText);
    await component.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('applies custom class and style', () => {
    const customClass = 'custom-class';
    const customStyle = { color: 'red' };

    const wrapper = mount(ZekBvText, {
      props: {
        text: 'Custom Text',
        customClass,
        customStyle
      }
    });

    const spanElement = wrapper.find('span');
    expect(spanElement.classes()).toContain(customClass);
    expect(spanElement.attributes('style')).toContain('color: red');
  });

  it('sets customProps and customEvents correctly', async () => {
    // Define customProps and customEvents
    const customProps = { size: 'lg' };
    const customEvents = {  click: vi.fn() };

    // Mount the component with customProps and customEvents
    const wrapper = mount(ZekBvText, {
      props: {
        customProps,
        customEvents,
        text: 'text',
        type: 'span'
      },
    });
    await wrapper.vm.$nextTick();
    // Check if customProps and customEvents are present in the rendered component
    expect(wrapper.vm.$props.customProps).toEqual(customProps);
    expect(wrapper.vm.$props.customEvents).toEqual(customEvents);
    // Check if customProps are correctly bound in the component
    expect(wrapper.props().text).toBe('text');

  });
});
