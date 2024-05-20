import ZekBubbleChart from './ZekBubbleChart.vue'

export default {
  title: 'Charts/ZekBubbleChart',
  component: ZekBubbleChart,
  tags: ['autodocs'],
  argTypes: {
    onDataSelected: { control: 'action', action: 'dataSelected' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBubbleChart },
  template: '<ZekBubbleChart v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
    height: "500px",
    width: "90%",
    customStyle: {
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
    data: [
        {
            year: '1990',
            grapes: '30',
            apples: '55'
        },
        {
            year: '1991',
            grapes: '35',
            apples: '50'
        },
        {
            year: '1992',
            grapes: '43',
            apples: '45'
        },
        {
            year: '1993',
            grapes: '48',
            apples: '42'
        },
        {
            year: '1994',
            grapes: '33',
            apples: '50'
        },
        {
            year: '1995',
            grapes: '30',
            apples: '55'
        },
        {
            year: '1996',
            grapes: '25',
            apples: '58'
        },
        {
            year: '1997',
            grapes: '29',
            apples: '65'
        },
    ],
    // apiInfo: {
    //     url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    //     method: 'get',
    //     type: 'http',
    //     query: ''
    // },
    xAxis: {
        label: 'years',
        dataKey: 'year',
        tickSize: '12px',
        type: 'category'
    },
    yAxis: {
        label: {
            text: 'fruit farms',
            style: {
                color: 'green',
                fontSize: '18px'
            }
        },
        tickSize: '14px',
        tickColor: '#000000',
        series: [{
            color: '#f77c5f',
            // data: [30, 40, 45, 50, 49, 60, 70],
            // data: [
            //     [ 1990, 30, 55 ],
            //     [ 1991, 35, 50 ],
            //     [ 1992, 43, 45 ],
            //     [ 1993, 48, 42 ],
            //     [ 1994, 33, 50 ],
            //     [ 1995, 30, 55 ],
            //     [ 1996, 25, 58 ],
            //     [ 1997, 29, 65 ],
            // ],
            dataKeys: {
                xValue: 'year',
                yValue: 'grapes',
                zValue: 'apples'
            },
            label: 'grapes'
        }, {
            color: '#a77c5f',
            // data: [55, 49, 45, 49, 30, 28, 40],
            dataKeys: {
                xValue: 'year',
                yValue: 'apples',
                zValue: 'grapes'
            },
            label: 'apples'
        }]
    }
}
