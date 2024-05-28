import ZekBvCollapse from './ZekBvCollapse.vue'

export default {
  title: 'Bootstrap/ZekBvCollapse',
  component: ZekBvCollapse,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { control: 'action', action: 'toggle' }
  }
}

const Template = (args, { argTypes }) => ({
  components: { ZekBvCollapse },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: '<ZekBvCollapse v-bind="args"/>'
})

export const Default = {
  render: Template,

  args: {
    collapseBtnProps: {
      variant: 'primary'
    },
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
}
