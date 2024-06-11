import ZekImage from './ZekImage.vue'

export default {
  title: 'Common/ZekImage',
  component: ZekImage,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      defaultValue: '500'
    },
    height: {
      control: 'text',
      defaultValue: '500'
    },
    imageUrl: {
      control: 'text',
      defaultValue: 'https://example.com/image.jpg'
    },
    showHoverText: {
      control: 'boolean',
      defaultValue: false
    },
    altText: {
      control: 'text',
      defaultValue: 'Image Alt Text'
    },
    link: {
      control: 'text',
      defaultValue: '#'
    },
    secure: {
      control: 'boolean',
      defaultValue: false
    },
    accessToken: {
      control: 'text',
      defaultValue: ''
    },
    onClick: { control: 'action', action: 'onClick' },
    onImageLoad: { control: 'action', action: 'onImageLoad' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekImage },
  template: '<ZekImage v-bind="args" />'
})

export const Default = {
  args: {
    altText: 'Cat Images',
    secure: false,

    imageUrl:
      'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg',

    width: 500,
    height: null,
    showHoverText: true
  },

  render: Template
}

export const WithSecurity = {
  args: {
    altText: 'Politiqs',
    secure: true,
    imageUrl: 'https://files.dev.zekoder.net/asset/0a903836-12a8-11ef-b2e6-430e49721604',
    width: 500,
    height: null,
    showHoverText: true
  },
  render: Template
}
