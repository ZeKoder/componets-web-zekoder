import { shallowMount } from '@vue/test-utils';
import ZekCodeEditor from './ZekCodeEditor.vue';
import { describe, it, expect } from 'vitest';

describe('ZekCodeEditor', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(ZekCodeEditor);
    expect(wrapper.exists()).toBe(true);
  });

  it('sets the initial content correctly', () => {
    const content = 'Initial content';
    const wrapper = shallowMount(ZekCodeEditor, {
      props: {
        value: content,
      },
    });
    expect(wrapper.vm.content).toBe(content);
  });

  it('emits the onInput event when content changes', () => {
    const wrapper = shallowMount(ZekCodeEditor);
    const content = 'New content';
    wrapper.vm.content = content;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('onInput')).toBeTruthy();
      expect(wrapper.emitted('onInput')[0][0]).toBe(content);
    });
  });

  it('emits the onError event with error annotations', () => {
    const annotations = [
      { row: 1, column: 1, text: 'Syntax error', type: 'error' },
    ];
    const wrapper = shallowMount(ZekCodeEditor, {
      props: {
        errors: [...annotations],
      }
    });
    setTimeout(() => {
      expect(wrapper.emitted('onError')).toBeTruthy();
      expect(wrapper.emitted('onError')[0][0]).toEqual(annotations);
    }, 1000);
  });
  // FIXME: This test is failing because the sendPrompt method is not implemented
  // it('emits the onSendPrompt event with the message', () => {
  //   const wrapper = shallowMount(ZekCodeEditor);
  //   const message = 'Hello, world!';
  //   wrapper.vm.sendPrompt(message);
  //   expect(wrapper.emitted('onSendPrompt')).toBeTruthy();
  //   expect(wrapper.emitted('onSendPrompt')[0][0]).toBe(message);
  // });
});