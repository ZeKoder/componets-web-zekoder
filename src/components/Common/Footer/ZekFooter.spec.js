import { mount } from '@vue/test-utils';
import ZekFooter from './ZekFooter.vue';
import { describe, it, expect } from 'vitest';

describe('ZekFooter', () => {
  it('renders links correctly', () => {
    const columns = [
      {
        links: [
          { href: '/about', text: 'About' },
          { href: '/contact', text: 'Contact' }
        ]
      },
      {
        links: [
          { href: '/privacy', text: 'Privacy Policy' },
          { href: '/terms', text: 'Terms of Service' }
        ]
      }
    ];

    const wrapper = mount(ZekFooter, {
        props: {
        height: '100px',
        columns
      }
    });

    const links = wrapper.findAll('a');
    expect(links.length).toBe(4); // Total number of links
    expect(links[0].attributes('href')).toBe('/about');
    expect(links[0].text()).toBe('About');
    expect(links[1].attributes('href')).toBe('/contact');
    expect(links[1].text()).toBe('Contact');
    expect(links[2].attributes('href')).toBe('/privacy');
    expect(links[2].text()).toBe('Privacy Policy');
    expect(links[3].attributes('href')).toBe('/terms');
    expect(links[3].text()).toBe('Terms of Service');
  });

  it('renders social media icons correctly', () => {
    const socialLinks = [
      { href: 'https://facebook.com', icon: 'facebook' },
      { href: 'https://twitter.com', icon: 'twitter' }
    ];

    const wrapper = mount(ZekFooter, {
        props: {
        socialLinks,
        textStyle: {
            color: 'red'
        },
        height: '100px',
      }
    });

    const icons = wrapper.findAll('i');
    expect(icons.length).toBe(2); // Total number of social media icons
    expect(icons[0].classes()).toContain('fab', 'fa-facebook');
    expect(icons[0].attributes('style')).toContain('color:'); // Color style is applied
    expect(icons[1].classes()).toContain('fab', 'fa-twitter');
    expect(icons[1].attributes('style')).toContain('color:'); // Color style is applied
  });

  it('applies custom styles', () => {
    const customStyle = {
      backgroundColor: 'blue',
      color: 'white'
    };

    const wrapper = mount(ZekFooter, {
        props: {
        customStyle,
        height: '100px',
      }
    });

    const footer = wrapper.find('footer');
    expect(footer.attributes('style')).toContain('background-color: blue');
    expect(footer.attributes('style')).toContain('color: white');
  });
});