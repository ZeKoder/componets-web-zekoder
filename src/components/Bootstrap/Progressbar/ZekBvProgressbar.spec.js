import { mount } from '@vue/test-utils';
import ZekBvProgressbar from './ZekBvProgressbar.vue';
import { describe, it, expect, vi } from 'vitest';
import { shallowRef } from 'vue';

describe('ZekBvProgressbar', () => {
  it('renders progress bar with default props', () => {
    const wrapper = mount(ZekBvProgressbar, {
      props: {
        value: '50',
        max: '100'
      }
    });
    
    expect(wrapper.find('.zek-progress-bar').exists()).toBe(true);
    const progressBar = wrapper.find('.progress-bar');
    expect(progressBar.exists()).toBe(true);
    expect(progressBar.attributes('aria-valuenow')).toBe('50');
    expect(progressBar.attributes('aria-valuemax')).toBe('100');
    expect(progressBar.attributes('aria-valuemin')).toBe('0');
    expect(progressBar.text()).toBe('50');
  });

  it('hides progress bar value when showValue prop is set to false', () => {
    const wrapper = mount(ZekBvProgressbar, {
      props: {
        value: '25',
        max: '100',
        showValue: false
      }
    });

    expect(wrapper.find('[role="progressbar"]').text()).not.toContain('25%');
  });

  it('renders progress bar with label', () => {
    const wrapper = mount(ZekBvProgressbar, {
      props: {
        value: '50',
        max: '100',
        label: 'Progress: 50%'
      }
    });

    expect(wrapper.find('.zek-progress-bar span').text()).toBe('Progress: 50%');
  });

  it('renders progress bar with custom bar', async () => {
    const customBar = {
      class: 'custom-class',
      label: 'Custom Bar',
      component: shallowRef({
        template: '<div>Custom Bar</div>'
      }),
      props: {
        style: {
          color: 'green'
        }
      },
      events: {
        click: vi.fn()
      }
    };

    const wrapper = mount(ZekBvProgressbar, {
      props: {
        value: '50',
        max: '100',
        customBar
      }
    });

    expect(wrapper.find('.custom-class').exists()).toBe(true);
    expect(wrapper.find('.custom-class').text()).toBe('Custom Bar');
  });

  it('applies custom class to progress bar container', () => {
    const wrapper = mount(ZekBvProgressbar, {
      props: {
        value: '50',
        max: '100',
        customClass: 'custom-progress'
      }
    });

    expect(wrapper.find('.zek-progress-bar.custom-progress').exists()).toBe(true);
  });
});
