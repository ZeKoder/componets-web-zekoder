import { mount } from '@vue/test-utils';
import axios from 'axios';
import ZekBubbleChart from '@/components/Charts/BubbleChart/ZekBubbleChart.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const ResizeObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));
  
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);

  // Mock getScreenCTM and createSVGMatrix for SVG elements
SVGElement.prototype.getScreenCTM = () => ({
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
  });

  SVGElement.prototype.createSVGMatrix = () => ({
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    multiply: () => this,
    inverse: () => this,
    translate: () => this,
    scale: () => this,
    rotate: () => this,
    rotateFromVector: () => this,
    flipX: () => this,
    flipY: () => this,
    skewX: () => this,
    skewY: () => this,
  });

// Mock axios
vi.mock('axios');

describe('ZekBubbleChart', () => {
  let wrapper;

  const createComponent = (props = {}) => {
    wrapper = mount(ZekBubbleChart, {
      props,
    });
  };

  beforeEach(() => {
    wrapper = null;
  });

  it('renders the chart with default props', () => {
    createComponent();

    const chart = wrapper.findComponent({ name: 'apexchart' });
    expect(chart.exists()).toBe(true);
  });

  it('renders with custom class and style', () => {
    createComponent({
      customClass: 'custom-class',
      customStyle: { backgroundColor: 'red' },
    });

    const container = wrapper.find('.custom-class');
    expect(container.exists()).toBe(true);
    expect(container.attributes('style')).toContain('background-color: red;');
  });

  it('fetches data when apiInfo is provided', async () => {
    const data = [{ xValue: 1, yValue: 2, zValue: 3 }];
    axios.get.mockResolvedValue({ data });

    createComponent({
      apiInfo: {
        url: 'http://api.example.com/data',
        method: 'get',
      },
      xAxis: {
        dataKey: 'xValue',
      },
      yAxis: {
        series: [
          {
            label: 'Series 1',
            dataKeys: {
              xValue: 'xValue',
              yValue: 'yValue',
              zValue: 'zValue',
            },
          },
        ],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // Wait for axios request to resolve

    expect(wrapper.vm.chartData).toEqual(data);
    expect(wrapper.vm.series).toEqual([
      {
        name: 'Series 1',
        data: [
          [1, 2, 3],
        ],
        color: undefined,
      },
    ]);
  });

  it('handles error when fetching data fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    createComponent({
      apiInfo: {
        url: 'http://api.example.com/data',
        method: 'get',
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // Wait for axios request to resolve

    expect(wrapper.vm.options.noData.text).toBe('Could not fetch data!');
    expect(wrapper.vm.options.noData.style.color).toBe('rgb(255,0,0)');
  });

  it('emits dataSelected event when a data point is selected', async () => {
    createComponent({
      data: [{ xValue: 1, yValue: 2, zValue: 3 }],
      xAxis: {
        dataKey: 'xValue',
      },
      yAxis: {
        series: [
          {
            label: 'Series 1',
            dataKeys: {
              xValue: 'xValue',
              yValue: 'yValue',
              zValue: 'zValue',
            },
          },
        ],
      },
    });

    await wrapper.vm.$nextTick();
    const apexChart = wrapper.findComponent({ name: 'apexchart' });
    apexChart.vm.$emit('dataPointSelection', {}, {}, { dataPointIndex: 0 });

    expect(wrapper.emitted('dataSelected')).toBeTruthy();
    expect(wrapper.emitted('dataSelected')[0]).toEqual([{ dataPointIndex: 0 }]);
  });

  it('renders chart with provided data', () => {
    createComponent({
      data: [{ xValue: 1, yValue: 2, zValue: 3 }],
      xAxis: {
        dataKey: 'xValue',
      },
      yAxis: {
        series: [
          {
            label: 'Series 1',
            dataKeys: {
              xValue: 'xValue',
              yValue: 'yValue',
              zValue: 'zValue',
            },
          },
        ],
      },
    });

    expect(wrapper.vm.series).toEqual([
      {
        name: 'Series 1',
        data: [
          [1, 2, 3],
        ],
        color: undefined,
      },
    ]);
  });

  it('updates chart options with props', () => {
    createComponent({
      title: 'Sample Chart',
      chartOptions: {
        fill: {
          opacity: 0.5,
        },
      },
    });

    expect(wrapper.vm.options.title.text).toBe('Sample Chart');
    expect(wrapper.vm.options.fill.opacity).toBe(0.5);
  });
});
