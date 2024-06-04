import ZekPieChart from './ZekPieChart.vue'

export default {
  title: 'Charts/ZekPieChart',
  component: ZekPieChart,
  tags: ['autodocs'],
  argTypes: {
    onDataSelected: { control: 'action', action: 'dataSelected' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekPieChart },
  template: '<ZekPieChart v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    height: "500px",
    width: "90%",
    styleObj: {
        border: "2px solid green"
    },
    id: '0',
    title: {
        text: 'My Fruit Chart',
        style: {
            color: 'rgb(255,0,0)',
            fontSize: '24px'
        }
    },
    data: [{
        color: '#ff0000',
        data: 30,
        dataKey: 'grapes',
        label: 'grapes'
    }, {
        color: '#cccccc',
        data: 40,
        dataKey: 'apples',
        label: 'apples'
    }],
    apiInfo: {
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        method: 'get',
        type: 'http',
        query: ''
    },
    showLegend: true,
  }
}
