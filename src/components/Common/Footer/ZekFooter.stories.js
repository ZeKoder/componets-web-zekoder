import ZekFooter from './ZekFooter.vue'
import ZekText from '../Text/ZekText.vue'

export default {
  title: 'Common/ZekFooter',
  component: ZekFooter,
  tags: ['autodocs'],
  argTypes: {
    height: {
        control: { type: 'text' },
    },
    columns: {
        control: { type: 'object' },
    },
    socialLinks: {
        control: { type: 'object' },
    },
    socialLinksPosition: {
        control: { type: 'text' },
    },
    image: {
        control: { type: 'text' },
    },
    imagePosition: {
        control: { type: 'select' },
        options: ['left', 'right', 'center'],
    },
    textStyle: {
        control: { type: 'object' },
    },
    customStyle: {
        control: { type: 'object' },
    },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekFooter },
  template: '<ZekFooter v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    height: 'fit-content',
    columns: [
        {
            component: 'h1',
            text: 'native html tag'
        },
        {
            component: ZekText,
            props: {
                text: 'text component',
                type: 'h2'
            }
        },
        {
            links: [
                {
                    text: 'About',
                    href: '#'
                },
                {
                    text: 'Contact',
                    href: '#'
                },
                {
                    text: 'Privacy',
                    href: '#'
                },
                {
                    text: 'Terms',
                    href: '#'
                }
            ]
        },
        {
            links: [
                {
                    text: 'Facebook',
                    href: '#'
                },
                {
                    text: 'Twitter',
                    href: '#'
                },
                {
                    text: 'Instagram',
                    href: '#'
                },
                {
                    text: 'LinkedIn',
                    href: '#'
                }
            ]
        },
        {
            links: [
                {
                    text: 'Privacy',
                    href: '#'
                },
                {
                    text: 'Terms',
                    href: '#'
                }
            ]
        }
    ],
    socialLinks: [
        {
            icon: 'facebook',
            // facebook icon link

            href: '#'
        },
        {
            icon: 'twitter',
            href: '#'
        },
        {
            icon: 'instagram',
            href: '#'
        },
        {
            icon: 'linkedin',
            href: '#'
        }
    ],
    socialLinksPosition: 'right',
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    customStyle: {
        "backgroundColor": "#f5f5f5",
        "padding": "2rem 0",
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-around",
        "alignItems": "flex-start",
        "textAlign": "left",
        "color": "#333",
        "fontSize": "1.2rem",
        "fontWeight": "bold",
        "fontFamily": "Roboto, sans-serif",
        "textTransform": "uppercase",
        "letterSpacing": "0.1rem",
        "borderTop": "1px solid #ccc",
    },
    textStyle: {
        "fontSize": "1.2rem",
        "fontWeight": "bold",
        "fontFamily": "Roboto, sans-serif",
        "textTransform": "uppercase",
        "letterSpacing": "0.1rem",
        "textDecoration": "none",
        "color": "#fff",
    },
    copyRigths: 'cyberntic'
}
