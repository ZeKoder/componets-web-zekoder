import ZekBvNavbar from './ZekBvNavbar.vue'

export default {
  title: 'Bootstrap/ZekBvNavbar',
  component: ZekBvNavbar,
  tags: ['autodocs'],
  argTypes: {
    customClass: {control: { type: 'text' }},
    customStyle: {control: { type: 'object' }},
   
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvNavbar },
  template: '<ZekBvNavbar v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  items: [
    { type: 'text', text: 'navbar text' },
    { type: 'tab', text: 'home', href: '#' },
    { type: 'tab', text: 'about', href: '#', disabled: true },
    
  ],
  
}
