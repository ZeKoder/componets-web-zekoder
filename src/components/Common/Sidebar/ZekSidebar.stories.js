import ZekSidebar from './ZekSidebar.vue'

export default {
  title: 'Common/ZekSidebar',
  component: ZekSidebar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    expandIcon: { control: 'object' },
    backgroundColor: {
      control: {
        type: 'color'
      }
    },
    width: {
      control: {
        type: 'text'
      }
    },
    collapsedWidth: {
      control: {
        type: 'text'
      }
    },
    sections: {
      control: {
        type: 'object'
      }
    },
    activeColor: {
      control: {
        type: 'color'
      }
    },
    alignItems: {
      control: {
        type: 'select',
        options: ['start', 'center']
      }
    },
    customStyle: {
      control: {
        type: 'object'
      }
    },
    footer: {
      control: {
        type: 'object'
      }
    },
    logo: {
      control: {
        type: 'object'
      }
    },
    onOnExpandCollapse: { control: 'action', action: 'onExpandCollapse' },
    onDarkModeToggle: { control: 'action', action: 'darkModeToggle' },
    onLinkClicked: { control: 'action', action: 'linkClicked' },
    onOnRoute: { control: 'action', action: 'onRoute' }
  }
}
const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekSidebar },
  template: '<ZekSidebar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  title: 'Zekoder Sidebar',
  footer: {
    links: [
      {
        label: 'Settings',
        url: '#',
        tooltip: 'Settings',
        icon: 'fa fa-cog',
        isActive: false,
        isHovering: false
      }
    ],
    // ! This should changed outside the component as it is reactive
    darkmode: {
      enabled: false,
      backgroundColor: '#000',
      icon: 'fa fa-moon',
      iconColor: 'yellow',
      circleColor: '#fff'
    }
  },
  expandIcon: {
    icon: 'https://www.pngfind.com/pngs/m/9-95287_double-left-chevron-svg-png-icon-free-download.png',
    iconType: 'custom',
    iconStyle: {
      padding: '0 20px'
    }
  },
  backgroundColor: '#e4e4e4',
  width: '300px',
  collapsedWidth: '60px',
  allowExpandCollapse: true,
  sections: [
    {
      style: {
        marginLeft: '30px',
        borderLeft: '2px solid #fff'
      },
      title: {
        label: 'Dashboard',
        icon: 'fa fa-home',
        url: '#',
        tooltip: 'Home',
        isActive: true,
        isHovering: false,
        showArrow: true
      },
      links: [
        {
          label: 'Home',
          url: '/iframe.html',
          tooltip: 'Home',
          icon: 'fa fa-home',
          isActive: false,
          isHovering: false
        },
        {
          label: 'About',
          url: '#',
          tooltip: 'About',
          icon: 'fa fa-info',
          isActive: false,
          isHovering: false
        },
        {
          label: 'Contact',
          url: '#',
          tooltip: 'Contact',
          icon: 'fa fa-phone',
          isActive: false,
          isHovering: false
        }
      ]
    },
    {
      title: {
        label: 'Utils',
        url: '#',
        tooltip: 'Settings',
        icon: 'fa fa-cog',
        isActive: false,
        isHovering: false,
        showArrow: true
      },
      links: [
        {
          label: 'Settings',
          url: '#',
          tooltip: 'Settings',
          icon: 'fa fa-cog',
          isActive: false,
          isHovering: false
        },
        {
          label: 'Logout',
          url: '#',
          tooltip: 'Logout',
          icon: 'fa fa-arrow-left',
          isActive: false,
          isHovering: false
        }
      ]
    }
  ],
  activeColor: '#000',
  customStyle: {
    color: 'red',
    fontSize: '24px',
    textTransform: 'capitalize',
    height: '500px'
  },
  logo: {
    src: 'https://www.pngfind.com/pngs/m/9-95287_double-left-chevron-svg-png-icon-free-download.png',
    style: {
      height: '50px',
      width: '50px'
    }
  }
}
