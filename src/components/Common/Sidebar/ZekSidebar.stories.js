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
    onExpandCollapse: { control: 'action', action: 'onExpandCollapse' },
    onDarkModeToggle: { control: 'action', action: 'darkModeToggle' },
    onLinkClicked: { control: 'action', action: 'linkClicked' },
    onRoute: { control: 'action', action: 'onRoute' }
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

export const Default = {
  render: Template,

  args: {
    title: {
      label: 'Zekoder'
    },
    collapsed: true,
    footer: {
      class: 'rounded p-1',
      style: {
        backgroundColor: 'black',
        height: '40px',
        textAlign: 'center'
      },
      // links: [
      //   {
      //     label: 'Settings',
      //     url: '#',
      //     tooltip: 'Settings',
      //     icon: 'fa fa-cog',
      //     isActive: false
      //   }
      // ],
      darkmode: {
        enabled: false,
        class: 'darkmode rounded-0 h-100 w-auto d-block',
        left: {
          backgroundColor: 'transparent',
          class: 'w-50 text-center',
          icon: 'fa fa-moon fs-5',
          color: 'lightgrey',
          activeColor: 'white'
        },
        right: {
          backgroundColor: 'transparent',
          icon: 'fa fa-sun fs-5',
          color: 'lightgrey',
          class: 'w-50 text-center',
          activeColor: 'white'
        },
        toggle: {
          class: 'rounded w-50 h-100 p-1 text-center',
          color: 'lightgrey',
          activeColor: 'lightgrey'
        }
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
          url: '/iframe.html',
          tooltip: 'YES',
          showArrow: true
        },
        links: [
          {
            label: 'Home',
            url: '/iframe.html',
            icon: 'fa fa-home'
          },
          {
            label: 'About',
            url: '/about',
            icon: 'fa fa-info'
          },
          {
            label: 'Contact',
            url: '/contact',
            icon: 'fa fa-phone'
          }
        ]
      },
      {
        title: {
          label: 'Utils',
          url: '/utils',
          icon: 'fa fa-cog',
          showArrow: true
        },
        links: [
          {
            label: 'Settings',
            url: '/settings',
            icon: 'fa fa-cog'
          },
          {
            label: 'Logout',
            url: '/logout',
            icon: 'fa fa-arrow-left'
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
}
