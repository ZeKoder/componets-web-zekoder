import { mount } from '@vue/test-utils'
import ZekBvTable from './ZekBvTable.vue'
import { describe, it, expect } from 'vitest'


describe('ZekBvTable', () => {
  it('renders table headers correctly', () => {
    const headers = ['Name', 'Age', 'Email']
    const wrapper = mount(ZekBvTable, {
      propsData: {
        headers
      }
    })

    const thElements = wrapper.findAll('th')
    expect(thElements.length).toBe(headers.length)

    headers.forEach((header, index) => {
      expect(thElements.at(index).text()).toBe(header)
    })
  })

  it('renders table data correctly', () => {
    const data = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' }
    ]
    const wrapper = mount(ZekBvTable, {
      propsData: {
        rawData: data
      }
    })

    const tdElements = wrapper.findAll('td')
    expect(tdElements.length).toBe(data.length * Object.keys(data[0]).length)

    data.forEach((row, rowIndex) => {
      Object.values(row).forEach((value, columnIndex) => {
        expect(tdElements.at(rowIndex * Object.keys(data[0]).length + columnIndex).text()).toBe(value.toString())
      })
    })
  })

  it('emits "rowClick" event when a row is clicked', () => {
    const data = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' }
    ]
    const wrapper = mount(ZekBvTable, {
      propsData: {
        data
      }
    })

    const trElements = wrapper.findAll('tr')
    trElements.at(1).trigger('click')

    expect(wrapper.emitted('rowClick')).toBeTruthy()
    expect(wrapper.emitted('rowClick')[0][0]).toEqual(data[0])
  })

  it('emits "cellClick" event when a cell is clicked', () => {
    const data = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' }
    ]
    const wrapper = mount(ZekBvTable, {
      propsData: {
        rawData: data
      }
    })

    const tdElements = wrapper.findAll('td')
    tdElements.at(2).trigger('click')

    expect(wrapper.emitted('cellClick')).toBeTruthy()
  })
})