import { mount } from '@vue/test-utils';
import ZekUserInfo from '@/components/Common/UserInfo/ZekUserInfo.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ZekUserInfo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ZekUserInfo, {
      props: {
        firstName: 'John',
        lastName: 'Doe',
        avatar: '',
        showName: true,
        namePosition: 'right',
        status: 'Online',
        dropdownLinks: [
          { url: '#', label: 'Profile', icon: 'fa fa-user' },
          { url: '#', label: 'Logout', icon: 'fa fa-sign-out' }
        ],
        customClass: 'custom-class',
      }
    });
  });

  it('renders user info details correctly', () => {
    const userInfoDetails = wrapper.find('.user-info-details');
    expect(userInfoDetails.exists()).toBe(true);
    expect(userInfoDetails.text()).toContain('John Doe');
    expect(userInfoDetails.text()).toContain('Online');
  });

  it('renders avatar with initials when avatar is not provided', () => {
    const avatar = wrapper.find('.user-info-avatar');
    expect(avatar.exists()).toBe(true);
    expect(avatar.text()).toContain('J D');
  });

  it('renders dropdown arrow when showAvatarArrow is true and dropdownLinks are provided', () => {
    const arrow = wrapper.find('.fa-angle-down');
    expect(arrow.exists()).toBe(true);
  });

  it('toggles dropdown on container click', async () => {
    const container = wrapper.find('.user-info-container');
    await container.trigger('click');
    expect(wrapper.vm.toggle).toBe(true);

    const dropdown = wrapper.find('.user-info-dropdown');
    expect(dropdown.exists()).toBe(true);
  });

  it('emits linkClicked event when a dropdown link is clicked', async () => {
    const container = wrapper.find('.user-info-container');
    await container.trigger('click');

    const link = wrapper.find('.user-info-dropdown a');
    await link.trigger('click');

    expect(wrapper.emitted('linkClicked')).toBeTruthy();
    expect(wrapper.emitted('linkClicked')[0]).toEqual([{
      url: '#',
      label: 'Profile',
      icon: 'fa fa-user'
    }]);
  });

  it('applies custom style and class', () => {
    expect(wrapper.classes()).toContain('custom-class');
  });

  it('closes dropdown when clicking outside', async () => {
    // Simulate click outside
    document.body.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.toggle).toBe(false);
  });

  it('renders user info details on the left when namePosition is not "right"', async () => {
    await wrapper.setProps({ namePosition: 'left' });
    const userInfoDetails = wrapper.find('.user-info-details');
    expect(userInfoDetails.exists()).toBe(true);
    expect(userInfoDetails.text()).toContain('John Doe');
    expect(userInfoDetails.text()).toContain('Online');
  });

  it('renders avatar image when avatar is provided', async () => {
    await wrapper.setProps({ avatar: 'http://example.com/avatar.jpg' });
    const avatarImage = wrapper.find('img.user-info-avatar');
    expect(avatarImage.exists()).toBe(true);
    expect(avatarImage.attributes('src')).toBe('http://example.com/avatar.jpg');
  });
});
