import { mount } from '@vue/test-utils';
import ZekGanttChart from '@/components/Charts/GanttChart/ZekGanttChart.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock getScreenCTM, createSVGMatrix, and getBBox for SVG elements
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

SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

describe('ZekGanttChart', () => {
  let wrapper;

  const createComponent = (props = {}) => {
    wrapper = mount(ZekGanttChart, {
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
      styleObj: { backgroundColor: 'red' },
    });

    const container = wrapper.find('.custom-class');
    expect(container.exists()).toBe(true);
    expect(container.attributes('style')).toContain('background-color: red;');
  });

  it('renders chart with provided data', () => {
    createComponent({
      data: [{
        name: 'Series 1',
        data: [
          { x: new Date(2021, 0, 1), y: [new Date(2021, 0, 2), new Date(2021, 0, 3)] },
        ],
      }],
      xAxis: {
        type: 'datetime',
      },
      yAxis: {},
    });

    expect(wrapper.vm.options.series).toEqual([
      {
        name: 'Series 1',
        data: [
          { x: new Date(2021, 0, 1), y: [new Date(2021, 0, 2), new Date(2021, 0, 3)] },
        ],
      },
    ]);
  });

  it('updates chart options with props', () => {
    createComponent({
      title: 'Sample Gantt Chart',
      showTooltip: false,
      tooltip: { enabled: false },
      legend: { show: false },
    });

    expect(wrapper.vm.options.title.text).toBe('Sample Gantt Chart');
    expect(wrapper.vm.options.tooltip.enabled).toBe(false);
    expect(wrapper.vm.options.legend.show).toBe(false);
  });

  it('applies gradient when provided', () => {
    createComponent({
      gradient: {
        type: 'vertical',
        gradientToColors: ['#f00'],
        stops: [0, 100],
      },
    });

    expect(wrapper.vm.options.fill).toEqual({
      type: 'vertical',
      gradientToColors: ['#f00'],
      stops: [0, 100],
    });
  });

  it('renders with provided plot options', () => {
    createComponent({
      plotOptions: {
        bar: {
          horizontal: false,
          rangeBarGroupRows: false,
        },
      },
    });

    expect(wrapper.vm.options.plotOptions.bar.horizontal).toBe(false);
    expect(wrapper.vm.options.plotOptions.bar.rangeBarGroupRows).toBe(false);
  });

  it('handles no data state correctly', () => {
    createComponent();

    expect(wrapper.vm.options.noData.text).toBe('Loading...');
    expect(wrapper.vm.options.noData.style.fontSize).toBe('20px');
  });

  it('renders chart with custom toolbar options', () => {
    createComponent({
      toolbar: {
        show: true,
      },
    });

    expect(wrapper.vm.options.chart.toolbar.show).toBe(true);
  });
});
