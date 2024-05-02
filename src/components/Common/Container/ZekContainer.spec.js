import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ZekContainer from '@/components/Common/Container/ZekContainer.vue'

describe('ZekContainer', () => {
  it('renders the component', () => {
    const wrapper = mount(ZekContainer)
    expect(wrapper.exists()).toBe(true)
  })

  it('emits "rowClick" event when a row is clicked', () => {
    const row = { id: "1", columns: [] }
    const wrapper = mount(ZekContainer, {
      props: {
        column: {
          rows: [row]
        }
      }
    })
    wrapper.find('.row').trigger('click')
    expect(wrapper.emitted('rowClick')).toBeTruthy()
    expect(wrapper.emitted('rowClick')[0][0]).toEqual({ column: wrapper.vm.column, row: row, index: 0 })
  })

  it('emits "colClick" event when a column is clicked', () => {
    const wrapper = mount(ZekContainer, {
      props: {
        column: {
          rows: [
            {
              columns: [
                { id: 1 }
              ]
            }
          ]
        }
      }
    })
    const column = { id: 1 }
    const row = { columns: [column] }
    wrapper.find('.col').trigger('click')
    expect(wrapper.emitted('colClick')).toBeTruthy()
    expect(wrapper.emitted('colClick')[0][0]).toEqual({ column: column, row: row, index: 0 })
  })
})