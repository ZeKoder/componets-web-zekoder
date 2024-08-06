import ZekRadialChart from './ZekRadialChart.vue'

export default {
  title: 'Charts/ZekRadialChart',
  component: ZekRadialChart,
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
  components: { ZekRadialChart },
  template: '<ZekRadialChart v-bind="args" />'
})

export const Default = {
  render: Template,

  args: {
    height: "100%",
    width: "100%",
    id: '0',
    size: "60%",
    data: [{
        color: '#9149CD',
        data: 40,
        dataKey: 'grapes',
        label: 'grapes',
        gradient: {    // Like in CSS linear-gradient(242.49deg, #9149CD 49.59%, #D95C93 85.05%)
            deg: 243,
            color1: '#9149CD',
            opacity: 0.5,           // Has to be a number
            color2: '#D95C93',
            opcaity: 0.85
        }
    }],
    apiInfo: {
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        method: 'get',
        type: 'http',
        query: ''
    },
    showLegend: false,
    styleObj: {
        // width: '100px',
        height: '90px'
    },
    fontSize: '10px',
  }
}
