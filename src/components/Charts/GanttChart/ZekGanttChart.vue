<template>
  <div :class="customClass" :style="styleObj">
    <apexchart
      type="rangeBar"
      :options="options"
      :series="options.series"
      :width="width"
      :height="height"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'ZekGanttChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '500px'
    },
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Object],
      default: ''
    },
    id: {
      type: [String, Number],
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    styleObj: {
      type: Object,
      default: () => ({})
    },
    // TODO: Implement API
    // apiInfo: {
    //     type: Object,
    //     default: () => ({})
    // },
    xAxis: {
      type: Object,
      default: () => ({})
    },
    yAxis: {
      type: Object,
      default: () => ({})
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    legend: {
      type: Object,
      default: () => ({})
    },
    grid: {
      type: Object,
      default: () => ({})
    },
    toolbar: {
      type: Object,
      default: () => ({})
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: Object,
      default: () => ({})
    },
    dataLabels: {
      type: Object,
      default: () => ({})
    },
    states: {
      type: Object,
      default: () => ({})
    },
    gradient: {
      type: Object,
      default: () => ({})
    },
    plotOptions: {
      type: Object,
      default: () => ({})
    },
    extraOptions: {
      type: Object,
      default: () => ({})
    },
    borderRadius: {
      // Note: This is a workaround for the ApexCharts bug
      type: String,
      default: '0px'
    }
  },
  computed: {
    options() {
      return {
        chart: {
          id: `gantt-chart-${this.id}`,
          toolbar: {
            show: false,
            ...this.toolbar
          }
        },
        title: {
          text: this.title
        },
        series: this.data,
        xaxis: {
          type: 'datetime',
          ...this.xAxis
        },
        yaxis: {
          ...this.yAxis
        },
        legend: {
          show: this.showLegend,
          ...this.legend
        },
        grid: {
          show: false,
          ...this.grid
        },
        dataLabels: {
          enabled: true,
          hideOverflowingLabels: true,
          formatter: function (val, opts) {
            return opts.w.globals.labels[opts.dataPointIndex]
          },
          ...this.dataLabels
        },
        states: {
          active: {
            filter: {
              type: 'none'
            }
          },
          hover: {
            filter: {
              type: 'none'
            }
          },
          ...this.states
        },
        fill: this.gradient ? this.createGradient(this.gradient) : {},
        plotOptions: {
          bar: {
            horizontal: true,
            rangeBarGroupRows: true
          },
          ...this.plotOptions
        },
        noData: {
          text: 'Loading...',
          style: {
            color: undefined,
            fontSize: '20px'
          }
        },
        tooltip: {
          enabled: this.showTooltip,
          ...this.tooltip // Default tooltip
        },
        ...this.extraOptions
      }
    }
  },
  methods: {
    createGradient(gradient) {
      const { type, gradientToColors, stops } = gradient
      return {
        type,
        gradientToColors,
        stops
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$border-radius: v-bind(borderRadius);
:deep(.apexcharts-series path) {
  clip-path: inset(5% 5% 5% 0% round $border-radius);
}
</style>
