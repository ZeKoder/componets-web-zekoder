import ZekContainer from './ZekContainer.vue'

export default {
  title: 'Common/ZekContainter',
  component: ZekContainer,
  tags: ['autodocs']
}

const Template = (args, { argTypes }) => ({
  components: { ZekContainer },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: '<ZekContainer v-bind="args"/>'
})

export const Error = {
  render: Template,

  args: {
    column: {
      rows: [
        {
          columns: [{ id: 1 }]
        }
      ]
    }
  }
}

export const Simple = {
  render: Template,

  args: {
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
