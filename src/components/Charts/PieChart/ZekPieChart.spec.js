import { mount } from '@vue/test-utils';
import ZekPieChart from '@/components/Charts/PieChart/ZekPieChart.vue';
import axios from 'axios';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('axios');

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

describe('ZekPieChart.vue', () => {
  let wrapper;

  const createComponent = (props = {}) => {
    wrapper = mount(ZekPieChart, {
      props,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    createComponent();
  });

  it('renders correctly with custom props', () => {
    createComponent({
      width: '400px',
      height: '400px',
      data: [{ label: 'Test', data: [1, 2, 3] }],
      title: 'Custom Title',
      id: 'test-id',
      customClass: 'test-class',
      styleObj: { backgroundColor: 'red' }
    });

    expect(wrapper.props().width).toBe('400px');
    expect(wrapper.props().height).toBe('400px');
    expect(wrapper.props().title).toBe('Custom Title');
    expect(wrapper.find('.test-class').exists()).toBe(true);
    expect(wrapper.element.style.backgroundColor).toBe('red');
  });

  it('populates chart data correctly with given data', () => {
    createComponent({
      data: [
        { label: 'Series 1', data: [10, 20, 30] },
        { label: 'Series 2', data: [15, 25, 35] }
      ]
    });

    expect(wrapper.vm.series).toEqual([[10, 20, 30], [15, 25, 35]]);
    expect(wrapper.vm.options.labels).toEqual(['Series 1', 'Series 2']);
  });

  it('fetches data correctly when apiInfo is provided', async () => {
    axios.get.mockResolvedValue({
      data: [
        { label: 'Series 1', data: [10, 20, 30] }
      ]
    });

    createComponent({
      apiInfo: { url: 'https://api.example.com/data', method: 'get' }
    });

    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data', null);
    await wrapper.vm.$nextTick(); // Wait for the next DOM update
    expect(wrapper.vm.series).toEqual([[10, 20, 30]]);
    expect(wrapper.vm.options.labels).toEqual(['Series 1']);
  });

  it('handles errors when fetching data', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    createComponent({
      apiInfo: { url: 'https://api.example.com/data', method: 'get' }
    });

    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data', null);
    await wrapper.vm.$nextTick(); // Wait for the next DOM update
    expect(wrapper.vm.options.noData.text).toBe('Could not fetch data!');
    expect(wrapper.vm.options.noData.style.color).toBe('rgb(255,0,0)');
  });

  it('emits dataSelected event when onSelect is called', async () => {
    createComponent();

    await wrapper.vm.onSelect({}, {}, { dataPointIndex: 1 });

    expect(wrapper.emitted().dataSelected).toBeTruthy();
    expect(wrapper.emitted().dataSelected[0]).toEqual([{ dataPointIndex: 1 }]);
  });

  it('reactively updates the chart when data prop changes', async () => {
    createComponent({
      data: [
        { label: 'Series 1', data: [10, 20, 30] }
      ]
    });

    await wrapper.setProps({
      data: [
        { label: 'Series 1', data: [40, 50, 60] },
        { label: 'Series 2', data: [15, 25, 35] }
      ]
    });

    expect(wrapper.vm.series).toEqual([[40, 50, 60], [15, 25, 35]]);
    expect(wrapper.vm.options.labels).toEqual(['Series 1', 'Series 2']);
  });
});
