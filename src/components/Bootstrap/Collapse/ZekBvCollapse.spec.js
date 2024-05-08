import { mount } from '@vue/test-utils';
import ZekBvCollapse from '@/components/Bootstrap/Collapse/ZekBvCollapse.vue';
import { describe, it, expect } from 'vitest';

describe('ZekBvCollapse', () => {
  it('renders collapse button with provided props', () => {
    const collapseBtnProps = {
      label: 'Toggle Collapse',
      variant: 'primary',
    };

    const wrapper = mount(ZekBvCollapse, {
      propsData: {
        collapseBtnProps,
      },
    });

    const collapseButton = wrapper.find('.btn');
    expect(collapseButton.exists()).toBe(true);
    expect(collapseButton.text()).toBe(collapseBtnProps.label);
  });

  it('renders BCollapse with provided props', () => {
    const column = {
      rows: [
        { id: '1' }
      ],
    };

    const wrapper = mount(ZekBvCollapse, {
      propsData: {
        column,
        customClass: 'custom-collapse',
      },
    });

    const bCollapse = wrapper.find('.custom-collapse');
    expect(bCollapse.exists()).toBe(true);
    expect(wrapper.find('.row-0').attributes('id')).toBe('1');
  });
});
