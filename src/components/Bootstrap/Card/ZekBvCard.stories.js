import ZekBvCard from './ZekBvCard.vue'

export default {
  title: 'Bootstrap/ZekBvCard',
  component: ZekBvCard,
  tags: ['autodocs'],
  argTypes: {
    imgPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right']
    }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvCard },
  template: '<ZekBvCard v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    title: 'Card Title',
    subTitle: 'Card Subtitle',
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    imgSrc: 'https://via.placeholder.com/50',
    imgAlt: 'Card Image',
    imgPosition: 'bottom',
    btnText: 'Go somewhere',
    bgVariant: 'light',
    header: {
      tag: 'h1',
      html: '<h1>aa aasasddsdasd </h1>'
      // component: {
      //   template: "<h1>aa zzzzz </h1>"
      // }
    },
    body: {
      title: 'Body Title',
      subtitle: 'Body Subtitle',
      text: 'Body Text'
      // component: { // NOTE: replaces text
      //   template: "<h1>aa zzzzz </h1>"
      // }
    },
    footer: {
      tag: 'h1',
      html: '<h1>aa aasasddsdasd </h1>'
      // component: {
      //   template: "<h1>aa zzzzz </h1>"
      // }
    }
  }
}
