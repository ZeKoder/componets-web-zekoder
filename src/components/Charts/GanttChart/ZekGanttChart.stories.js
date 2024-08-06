import ZekGanttChart from './ZekGanttChart.vue'

export default {
  title: 'Charts/ZekGanttChart',
  component: ZekGanttChart,
  tags: ['autodocs'],
  argTypes: {
    
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekGanttChart },
  template: '<ZekGanttChart v-bind="args" />'
})

export const Multi = {   //NOTE - struture of data can be different check the two examples below 
  render: Template,

  args: {
    showTooltip: true,
    data: [
        {
            name: "Task 1",
            data: [
                {
                    x: "LOL",
                    y: [1, 5]
                },
                {
                    x: 'Design',
                    y: [
                      3,
                      7
                    ]
                  },
            ]
        },
        {
            name: "Task 2",
            data: [
                {
                    x: "Lmao",
                    y: [10, 30]
                },
                {
                    x: 'code',
                    y: [
                      7,
                      18
                    ]
                  },
            ]
        },
    ],
    showLegend: false,
    title: "Gantt Chart",
    borderRadius: "75px",
    grid: {
        row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1,
            show: true,
        }
    },
    xAxis: {
        type: "datetime",
        min: 1,
        max: 30,
        tickAmount: 30,
        labels: {
            style: {
                colors: "blue",
                fontWeight: "bold",
            }
        }
    },
    yAxis: {
        type: "datetime",
        axisBorder: {
            show: false
        },
        labels: {
            show: false
        },
    },
  }
}
export const Basic = {
    render: Template,

    args: {
        height: 350,
        showLegend: false,
        title: "Gantt Chart",
        borderRadius: "75px",
        data: [
            {
              data: [
                {
                  x: 'Code',
                  y: [
                    new Date('2019-03-02').getTime(),
                    new Date('2019-03-04').getTime()
                  ]
                },
                {
                  x: 'Test',
                  y: [
                    new Date('2019-03-04').getTime(),
                    new Date('2019-03-08').getTime()
                  ]
                },
                {
                  x: 'Validation',
                  y: [
                    new Date('2019-03-08').getTime(),
                    new Date('2019-03-12').getTime()
                  ]
                },
                {
                  x: 'Deployment',
                  y: [
                    new Date('2019-03-12').getTime(),
                    new Date('2019-03-18').getTime()
                  ]
                }
              ]
            }
          ],
          xAxis: {
            type: "datetime",
            labels: {
                style: {
                    colors: "blue",
                    fontWeight: "bold",
                }
            }
        },
        yAxis: {
            axisBorder: {
                show: false
            },
            labels: {
                show: true
            },
        },
    }
}
