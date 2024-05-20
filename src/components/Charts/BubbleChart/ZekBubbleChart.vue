<template>
    <div :class="customClass" :style="customStyle">
        <apexchart type="bubble" :options="options" :series="series" :width="width" :height="height" @dataPointSelection="onSelect"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios'
export default {
    name: 'ZekBubbleChart',
    components: {
        apexchart : VueApexCharts
    },
    props: {
        width: [String, Number],
        height: [String, Number],
        data: Array,
        title: [String,Object],
        id: [String, Number],
        customClass: String,
        customStyle: Object,
        apiInfo: Object, // {url, method:get|post, type:graphql||http, query}
        xAxis: Object, //{label,dataKey,tickSize,tickColor,type:category|datetime} 
        yAxis: Object, //{label,tickSize,tickColor,series} // series: [{label, color, data[], dataKeys}]
        showLegend: Boolean,
        chartOptions: { // object to overwrite any of the chart option, or to add a new option.
            type: Object,
            default: () => { return {} }
        }
    },
    emits: ['dataSelected'],
    data() {
        return {
            chartData:[],
            series: [],
            options: {
                chart: {
                    id: 'bubble-chart' + this.id || '',
                },
                noData: {
                    text: 'Loading...',
                    style: {
                        color: undefined,
                        fontSize: '20px'
                    }
                },
                fill: {
                    opacity: 0.7
                },
                xaxis: {
                    title: {
                        text: this.xAxis?.label? (this.xAxis.label.text || this.xAxis.label) : undefined,
                        style: this.xAxis?.label&&this.xAxis.label.style? this.xAxis.label.style : {}

                    },
                    labels: {
                        style: {
                            colors: this.xAxis?.tickColor,
                            fontSize: this.xAxis?.tickSize
                        }
                    }
                },
                yaxis:{
                    title: {
                        text: this.yAxis?.label? (this.yAxis.label.text || this.yAxis.label) : undefined,
                        style: this.yAxis?.label&&this.yAxis.label.style? this.yAxis.label.style : {}
                    },
                    labels: {
                        style: {
                            colors: this.yAxis?.tickColor,
                            fontSize: this.yAxis?.tickSize
                        }
                    }
                },
                title: {
                    text: this.title? (this.title.text || this.title) : undefined,
                    style: this.title&&this.title.style? this.title.style : {}

                },
                ...this.chartOptions
            },
        }
    },
    created() {
        //chart settings

        //chart data
        if(this.data && this.data.length) {
            this.chartData = this.data;
            this.populateGraph();
        } else if(this.apiInfo && this.apiInfo.url) {
            this.fetchData();
        } else {
            this.populateGraph();
        }
    },
    methods: {
        async fetchData() {
            const method = this.apiInfo.method || (this.apiInfo.type=='graphql'? 'post' : 'get')
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
        if (this.yAxis && this.yAxis.series && this.yAxis.series.length) {
            this.series = this.yAxis.series.map(ser => {
                let data = [];
                if (ser.data && ser.data.length) {
                    data = ser.data;
                } else if (ser.dataKeys && this.chartData.length && ser.dataKeys.xValue && ser.dataKeys.yValue && ser.dataKeys.zValue) {
                    data = this.chartData.map(item => {
                        return [
                            +item[ser.dataKeys.xValue],
                            +item[ser.dataKeys.yValue],
                            +item[ser.dataKeys.zValue]
                        ];
                    });
                }
                return {
                    name: ser.label || undefined,
                    data: data,
                    color: ser.color || undefined
                };
            });

            if (this.series.every(ser => ser.data.length === 0)) {
                this.options.noData.text = 'No data available!';
                this.options.noData.style.color = 'rgb(255,0,0)';
            }
        }
    },
        onSelect(event, chartContext, config) {
            this.$emit('dataSelected', config);
        }
    }

}
</script>