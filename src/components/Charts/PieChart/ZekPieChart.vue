<template>
    <div :class="customClass" :style="styleObj">
      <apexchart :type="type" :options="options" :series="series" :width="width" :height="height" @dataPointSelection="onSelect"></apexchart>
    </div>
  </template>
  
  <script>
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios'
  export default {
    name: "ZekPieChart",
    components: {
        apexchart : VueApexCharts
    },
    props: {
      width: [String, Number],
      height: [String, Number],
      data: Array,
      colors: Array,
      title: [String, Object],
      id: [String, Number],
      customClass: String,
      styleObj: Object,
      apiInfo: Object, // {url, method:get|post, type:graphql||http, query}
      showLegend: Boolean,
      showValues: {
          type: Boolean,
          default: true
      },
      showTooltip: {
          type: Boolean,
          default: true
      },
      type: { // 'pie', 'donut'
          type: String,
          default: 'pie'
      },
      chartOptions: { // object to overwrite any of the chart option, or to add a new option.
          type: Object,
          default: () => { return {} }
      }
    },
    data() {
      return {
        chartData: [],
        series: [],
        options: {
          labels: [],
          chart: {
            id: `pie-chart-${this.id}`,
          },
          dataLabels: {
            enabled: this.showValues
          },
          tooltip: {
              enabled: this.showTooltip
          },
          noData: {
            text: "Loading...",
            style: {
              color: undefined,
              fontSize: "20px",
            },
          },
          title: {
            text: this.title ? this.title.text || this.title : undefined,
            style: this.title && this.title.style ? this.title.style : {},
          },
          colors: [],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: this.width,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          legend: {
            show: this.showLegend,
          },
          ...this.chartOptions
        },
      };
    },
    created() {
      //chart settings
  
      //chart data
      if (this.data && this.data.length) {
        this.chartData = this.data;
        this.populateGraph();
      } else if (this.apiInfo && this.apiInfo.url) {
        this.fetchData();
      } else {
        this.populateGraph();
      }
    },
    methods: {
      async fetchData() {
        const method =
          this.apiInfo.method ||
          (this.apiInfo.type == "graphql" ? "post" : "get");
          const data = this.apiInfo.query || this.apiInfo.body || null
            try {
                const res = await axios[method](this.apiInfo.url, data)
                this.chartData = res.data;
                this.populateGraph();
            } catch {
                this.options.noData.text = 'Could not fetch data!';
                this.options.noData.style.color = 'rgb(255,0,0)';
            }
      },
      populateGraph() {
        if (this.chartData && this.chartData.length) {
          this.chartData.forEach(ser => {
            let data = [];
            if (ser.data) {
              data = ser.data;
            } else if (ser.dataKey && this.chartData.length && ser.dataKey in this.chartData[0]) {
              data = this.chartData.map(item => item[ser.dataKey]);
            }
  
            if (data.length < 1) {
              return;
            } else {
              this.options.labels.push(ser.label || ser.dataKey || undefined);
              this.options.colors.push(ser.color || undefined);
              this.series.push(data);
            }
          });
          if (this.series.length < 1) {
            this.options.noData.text = "No data available!";
            this.options.noData.style.color = "rgb(255,0,0)";
          }
        }
      },
      onSelect(event, chartContext, config) {
            this.$emit('dataSelected', config);
        }
    },
    watch:{
      data: function(val){
        this.chartData = val;
        this.series = [];
        this.options = {...this.options, labels: [], colors: []}
        this.populateGraph();
      }
    }
  };
  </script>