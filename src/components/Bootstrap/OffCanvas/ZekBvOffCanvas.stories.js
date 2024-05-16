import ZekBvOffCanvas from './ZekBvOffCanvas.vue'

export default {
  title: 'Bootstrap/ZekBvOffCanvas',
  component: ZekBvOffCanvas,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: { type: 'boolean' }
    },
    onToggle: { control: 'action', action: 'toggle' },
    onRowClick: { control: 'action', action: 'rowClick' },
    onColClick: { control: 'action', action: 'colClick' }
  }
}

const Template = (args, { argTypes }) => ({
  components: { ZekBvOffCanvas },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: '<ZekBvOffCanvas v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  show: true,
  column: {
    rows: [
      {
        id: 1,
        column: []
      },
      {
        columns: [
          {
            columnWidth: 12,
            class: 'text-center',
            component: 'ZekBvButton',
            data: {
              label: 'Hello World'
            }
          },
          {
            columnWidth: 12,
            component: 'ZekBvSelect',
            data: {
              label: 'Hello World'
            }
          },
          {
            columnWidth: 12,
            component: 'ZekText',
            data: {
              label: 'Hello World'
            }
          }
        ]
      }
    ]
  }
}
