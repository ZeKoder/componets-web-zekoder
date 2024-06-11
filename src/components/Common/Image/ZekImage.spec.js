import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ZekImage from './ZekImage.vue';

describe('ZekImage', () => {
  it('renders the image with the correct props', () => {
    const wrapper = mount(ZekImage, {
      props: {
        height: 200,
        width: 300,
        objectFit: 'contain',
        imageUrl: 'https://example.com/image.jpg',
        altText: 'Example Image',
        link: '#',
        secure: false,
        accessToken: 'your-access-token',
        showHoverText: true,
        customStyle: { border: '1px solid red' }
      }
    });

    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('https://example.com/image.jpg');
    expect(image.attributes('alt')).toBe('Example Image');
    expect(image.attributes('width')).toBe('300');
    expect(image.attributes('height')).toBe('200');
    console.log(image.attributes('style'));
    expect(image.attributes('style')).toContain('object-fit: contain');
  });

  it('emits onClick event when clicked', async () => {
    const wrapper = mount(ZekImage);
    const anchor = wrapper.find('.image-anchor');

    await anchor.trigger('click');
    expect(wrapper.emitted('onClick')).toBeTruthy();
  });

  it('emits onImageLoad event when image is loaded', async () => {
    const wrapper = mount(ZekImage);
    const image = wrapper.find('img');

    await image.trigger('load');
    expect(wrapper.emitted('onImageLoad')).toBeTruthy();
  });
});