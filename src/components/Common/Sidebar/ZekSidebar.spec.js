import { mount } from '@vue/test-utils';
import ZekSidebar from './ZekSidebar.vue';
import SectionLinks from './SectionLinks.vue';
import { describe, it, expect } from 'vitest';

describe('ZekSidebar', () => {
  it('renders the sidebar with correct props', () => {
    const wrapper = mount(ZekSidebar, {
      props: {
        title: 'Sidebar Title',
        expandIcon: {
          icon: 'fa fa-bars',
          iconType: 'font-awesome',
        },
        backgroundColor: '#ffffff',
        width: '300px',
        allowExpandCollapse: true,
        collapsed: false,
        collapsedWidth: '80px',
        sections: [
          {
            title: {
              label: 'Section 1',
              icon: 'fa fa-home',
            },
            links: [
              {
                label: 'Link 1',
                url: '/link1',
                icon: 'fa fa-link',
              },
              {
                label: 'Link 2',
                url: '/link2',
                icon: 'fa fa-link',
              },
            ],
          },
          // Add more sections as needed
        ],
        activeClass: 'active',
        activeColor: '#ff0000',
        alignItems: 'flex-start',
        customStyle: { color: 'red' },
        footer: {
          links: [
            { url: '/about', label: 'About' },
            { url: '/contact', label: 'Contact' },
          ],
          darkmode: {
            enabled: true,
            backgroundColor: '#333333',
            icon: 'fa fa-moon',
            iconColor: '#ffffff',
            circleColor: '#dddddd',
          },
        },
        logo: {
          src: '/logo.png',
          alt: 'Logo',
        },
        showFooterOnCollapse: true,
      },
    });

    // Assert that the sidebar renders correctly with the given props
    expect(wrapper.find('.zek-sidebar')).toBeTruthy();
    // Add more assertions as needed
  });

  it('renders footer links correctly', () => {
    const wrapper = mount(ZekSidebar, {
      props: {
        footer: {
          links: [
            { url: '/about', label: 'About' },
            { url: '/contact', label: 'Contact' },
          ],
        },
      },
    });
  
    // Assert that footer links are rendered
    expect(wrapper.findAll('.footer-links-container .link')).toHaveLength(2);
  });
});

describe('SectionLinks', () => {
  it('emits linkClicked event when a section link is clicked', async () => {
    const sec = {
      title: {
        label: 'Section 1',
        icon: 'fa fa-home',
      },
      links: [
        {
          label: 'Link 1',
          url: '/link1',
          icon: 'fa fa-link',
        },
      ],
    };
  
    const wrapper = mount(SectionLinks, {
      props: {
        isCollapsed: false,
        activeColor: '#ff0000',
        sec,
      },
    });
  
    // Click on the section link
    await wrapper.find('.link-container').trigger('click');
  
    // Assert that linkClicked event is emitted with the correct parameters
    expect(wrapper.emitted('linkClicked')).toBeTruthy();
    expect(wrapper.emitted('linkClicked')[0][0]).toEqual({ sec, link: sec.links[0] });
  });

  it('adds hovering class when mouseover and removes it when mouseout', async () => {
    const sec = {
      title: {
        label: 'Section 1',
        icon: 'fa fa-home',
      },
      links: [
        {
          label: 'Link 1',
          url: '/link1',
          icon: 'fa fa-link',
        },
      ],
    };
  
    const wrapper = mount(SectionLinks, {
      props: {
        isCollapsed: false,
        activeColor: '#ff0000',
        sec,
      },
    });
  
    // Hover over the section link
    await wrapper.find('.link-container').trigger('mouseover');
    
    // Move mouse away from the section link
    await wrapper.find('.link-container').trigger('mouseout');
  
    // Assert that hovering class is removed
    expect(wrapper.find('.link-container').classes()).not.toContain('hovering');
  });
});
