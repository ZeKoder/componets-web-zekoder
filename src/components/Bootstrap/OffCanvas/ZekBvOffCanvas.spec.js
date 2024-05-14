import { mount } from '@vue/test-utils';
import ZekBvOffCanvas from '@/components/Bootstrap/OffCanvas/ZekBvOffCanvas.vue';
import { describe, it, expect } from 'vitest';
import { BOffcanvas, BButton } from 'bootstrap-vue-next';
import ZekContainer from '@/components/Common/Container/ZekContainer.vue';

describe('ZekBvOffCanvas', () => {
    
    it('renders BOffcanvas with default props', () => {
        const wrapper = mount(ZekBvOffCanvas, {
          props: {
            show: true
          },
          global: {
            components: {
              BOffcanvas,
              BButton,
              ZekContainer
            }
          }
        });
    
        const bOffcanvas = wrapper.findComponent(BOffcanvas);
        expect(bOffcanvas.exists()).toBe(true);
        expect(bOffcanvas.props('placement')).toBe('end');
        expect(bOffcanvas.props('backdrop')).toBe(true);
        expect(bOffcanvas.props('backdropVariant')).toBe('dark');
        expect(bOffcanvas.props('bodyScrolling')).toBe(true);
      });

      it('renders BOffcanvas with provided props', () => {
        const wrapper = mount(ZekBvOffCanvas, {
          props: {
            show: true,
            placement: 'top',
            title: 'Test Title',
            bodyClass: 'custom-body-class',
            footerClass: 'custom-footer-class',
            headerClass: 'custom-header-class',
            headerCloseClass: 'custom-header-close-class',
            id: 'custom-id'
          },
          global: {
            components: {
              BOffcanvas,
              BButton,
              ZekContainer
            }
          }
        });
    
        const bOffcanvas = wrapper.findComponent(BOffcanvas);
        expect(bOffcanvas.exists()).toBe(true);
        expect(bOffcanvas.props('placement')).toBe('top');
        expect(bOffcanvas.props('title')).toBe('Test Title');
        expect(bOffcanvas.props('bodyClass')).toBe('custom-body-class');
        expect(bOffcanvas.props('footerClass')).toBe('custom-footer-class');
        expect(bOffcanvas.props('headerClass')).toBe('custom-header-class');
        expect(bOffcanvas.props('headerCloseClass')).toBe('custom-header-close-class');
        expect(bOffcanvas.props('id')).toBe('custom-id');
      });

      it('renders ZekContainer with provided column and containerClass props', () => {
        const column = {
          rows: [
            { id: '1' }
          ]
        };
    
        const wrapper = mount(ZekBvOffCanvas, {
          props: {
            show: true,
            column,
            containerClass: 'custom-container-class'
          },
          global: {
            components: {
              BOffcanvas,
              BButton,
              ZekContainer
            }
          }
        });
    
        const zekContainer = wrapper.findComponent(ZekContainer);
        expect(zekContainer.exists()).toBe(true);
        expect(zekContainer.props('column')).toEqual(column);
        expect(zekContainer.props('customClass')).toBe('custom-container-class');
      });

      it('emits rowClick and colClick events from ZekContainer', async () => {
        const wrapper = mount(ZekBvOffCanvas, {
          props: {
            show: true
          },
          global: {
            components: {
              BOffcanvas,
              BButton,
              ZekContainer
            }
          }
        });
    
        const zekContainer = wrapper.findComponent(ZekContainer);
        await zekContainer.vm.$emit('rowClick', 'row event');
        await zekContainer.vm.$emit('colClick', 'col event');
    
        expect(wrapper.emitted('rowClick')).toBeTruthy();
        expect(wrapper.emitted('rowClick')[0]).toEqual(['row event']);
        expect(wrapper.emitted('colClick')).toBeTruthy();
        expect(wrapper.emitted('colClick')[0]).toEqual(['col event']);
      });

      it('emits toggle event when BOffcanvas is shown or hidden', async () => {
        const wrapper = mount(ZekBvOffCanvas, {
          props: {
            show: true
          },
          global: {
            components: {
              BOffcanvas,
              BButton,
              ZekContainer
            }
          }
        });
    
        const bOffcanvas = wrapper.findComponent(BOffcanvas);
        await bOffcanvas.vm.$emit('shown');
        await bOffcanvas.vm.$emit('hidden');
    
        expect(wrapper.emitted('toggle')).toBeTruthy();
        expect(wrapper.emitted('toggle')[0]).toEqual([true]);
        expect(wrapper.emitted('toggle')[1]).toEqual([false]);
      });
   
    it('updates showModel when show prop changes', async () => {
      const wrapper = mount(ZekBvOffCanvas, {
        props: {
          show: false
        },
      });
  
      await wrapper.setProps({ show: true });
      expect(wrapper.vm.$data.showModel).toBe(true);
  
      await wrapper.setProps({ show: false });
      expect(wrapper.vm.$data.showModel).toBe(false);
    });
  });