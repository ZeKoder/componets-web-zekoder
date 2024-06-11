import ZekApi  from './ZekApi.vue';

export default {
  title: 'Common/ZekApi',
  component: ZekApi
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekApi },
  template: `<ZekApi v-bind="args">
  <template v-slot="slotProps">
    <p> User Id: {{ slotProps.id }} </p>
    <p> Name: {{ slotProps.name }} </p>
    <p> Title: {{ slotProps.title }} </p>
    <p> Status: {{ slotProps.completed }} </p>
    </template>
  </ZekApi>
  `
})

export const Default = {
  render: Template,
  args: {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET',
  }
}

export const WithMap = {
  render: Template,
  args: {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET',
    map: {
      id: 'userId',
      title: 'title',
      completed: 'completed',
      name: 'title'
    }
  }
}