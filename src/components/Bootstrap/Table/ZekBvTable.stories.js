import { markRaw } from 'vue'
import ZekBvTable from './ZekBvTable.vue'
export default {
  title: 'Bootstrap/ZekBvTable',
  component: ZekBvTable,
  tags: ['autodocs'],
  argTypes: {
    onUpdate: { control: 'action', action: 'update' },
    onRowClick: { control: 'action', action: 'rowClick' },
    onCellClick: { control: 'action', action: 'cellClick' },
    onRowSelect: { control: 'action', action: 'rowSelect' },
  }
}

const Template = (args) => ({
  components: { ZekBvTable },
  setup() {
    return { args }
  },
  template: '<ZekBvTable v-bind="args"/>',
  props: Object.keys(args)
})

export const Simple = Template.bind({})
Simple.args = {
  headers: ['Country', 'City', 'Trousers', 'Skirts', 'Dresses', 'Bracelets', 'Rings'],
  rawData: [
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
    {
      Country: 'Belgium',
      City: 'Antwerp',
      Trousers: 56,
      Skirts: 22,
      Dresses: 43,
      Bracelets: 72,
      Rings: 23
    },
  ]
}

export const Detailed = Template.bind({})
Detailed.args = {
  headers: [
    {
      label: 'Country',
      key: 'country'
    },
    {
      label: 'City',
      key: 'city'
    },
    {
      label: 'Trousers',
      key: 'trousers'
    },
    {
      label: 'Skirts',
      key: 'skirts'
    },
    {
      label: 'Dresses',
      key: 'dresses'
    },
    {
      label: 'Bracelets',
      key: 'bracelets'
    },
    {
      label: 'Rings',
      key: 'rings'
    }
  ],
  data: [
    {
      id: 1,
      cells: [
        { value: 'Belgium' },
        { value: 'Antwerp' },
        { value: 56 },
        { value: 22 },
        { value: 43 },
        { value: 72, variant: 'success' },
        { value: 23 }
      ]
    },
    {
      id: 2,
      cells: [
        { value: 'Germany' },
        { value: 'Berlin' },
        { value: 32 },
        { value: 45 },
        { value: 12 },
        { value: 65 },
        { html: '<a href="#">Link {{row}}</a>' }
      ]
    }
    // Add more rows...
  ]
}

export const CustomHeaders = Template.bind({})
CustomHeaders.args = {
  headers: [
    {
      label: 'Country',
      key: 'country'
    },
    {
      label: 'City',
      key: 'city'
    },
    {
      label: 'Trousers',
      key: 'trousers'
    },
    {
      label: 'Skirts',
      key: 'skirts'
    },
    {
      label: 'Dresses',
      key: 'dresses'
    },
    {
      label: 'Bracelets Images',
      key: 'bracelets',
      html: '<a href="#">Link {{cell.value}}</a>'
    },
    {
      label: 'Rings',
      key: 'rings'
    },
    {
      label: 'Price',
      key: 'price',
      function: (value) => `$${value}`
    },
    {
      label: 'Actions',
      key: 'null',
      component: markRaw({
        template: '<button @click="edit" class="btn btn-primary">Edit</button>',
        props: ['cell', 'row'],
        methods: {
          edit() {
            console.log('Current Cell', this.cell)
            console.log('Current Row', this.row)
          }
        }
      })
    }
  ],
  rawData: [
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      price: 80,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      price: 20,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      price: 40,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      price: 60,
      rings: 23
    },
  ]
}
export const NoHeaders = Template.bind({})
NoHeaders.args = {
  rawData: [
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      rings: 23
    },
    {
      country: 'Belgium',
      city: 'Antwerp',
      trousers: 56,
      skirts: 22,
      dresses: 43,
      bracelets: 72,
      rings: 23
    },
  ]
}
