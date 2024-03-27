import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest';
import ZekBvCard from '@/components/Bootstrap/Card/ZekBvCard.vue'

describe('ZekBvCard', () => {
  it('renders the card with correct props', () => {
    const wrapper = mount(ZekBvCard, {
      props: {
        imgSrc: 'path/to/image.jpg',
        imgAlt: 'Image Alt Text',
        imgPosition: 'top',
        title: 'Card Title',
        header: 'Card Header',
        body: 'Card Body',
        footer: 'Card Footer',
        customClass: 'custom-card-class'
      }
    })


    expect(wrapper.find('.zek-bv-card').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-header').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-body').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-footer').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('path/to/image.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Image Alt Text')
    expect(wrapper.find('img').classes()).toContain('card-img-top')
    expect(wrapper.find('.zek-bv-card').classes()).toContain('custom-card-class')
    expect(wrapper.find('.zek-bv-card-header').text()).toBe('Card Header')
    expect(wrapper.find('.zek-bv-card-body').text()).toBe('Card Body')
    expect(wrapper.find('.zek-bv-card-footer').text()).toBe('Card Footer')
  })

  it('renders the card without optional props', () => {
    const wrapper = mount(ZekBvCard)

    expect(wrapper.find('.zek-bv-card').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-header').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-body').exists()).toBe(true)
    expect(wrapper.find('.zek-bv-card-footer').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.zek-bv-card').classes()).not.toContain('img-top')
    expect(wrapper.find('.zek-bv-card-header').text()).toBe('')
    expect(wrapper.find('.zek-bv-card-body').text()).toBe('')
    expect(wrapper.find('.zek-bv-card-footer').text()).toBe('')
  })

  it('renders the card with custom class', () => {
    const wrapper = mount(ZekBvCard, {
      props: {
        customClass: 'custom-card-class'
      }
    })

    expect(wrapper.find('.zek-bv-card').classes()).toContain('custom-card-class')
  })

  it('renders the card with image position at the bottom', () => {
    const wrapper = mount(ZekBvCard, {
      props: {
        imgSrc: 'path/to/image.jpg',
        imgPosition: 'bottom'
      }
    })

    expect(wrapper.find('img').classes()).toContain('card-img-bottom')
  })
})