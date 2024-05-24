<template>
  <BTableSimple class="zek-bv-table" hover small caption-top responsive :class="tableClass">
    <BThead class="zek-bv-thead" head-variant="dark">
      <BTr class="zek-bv-tr">
        <BTd v-if="selectable" class="zek-bv-td">
          <BFormCheckbox class="zek-bv-form-checkbox" @input="selectAll" />
        </BTd>
        <BTh v-for="header in tableHeaders" :key="header.key ? header.key : header" class="zek-bv-th">{{
          header.label ? header.label : header
        }}</BTh>
      </BTr>
    </BThead>
    <BTbody>
      <BTr v-for="(row, i) in tableData" :key="i" @click="onRowClick(row)" class="zek-bv-tr">
        <BTd v-if="selectable" class="zek-bv-td">
          <BFormCheckboxGroup v-model="selectedRows">
            <BFormCheckbox :value="i" @input="onRowSelect(i, row)" class="zek-bv-form-checkbox"/>
          </BFormCheckboxGroup>
        </BTd>
        <ZekBvTableCell
          v-for="(cell, cellIndex) in row.cells"
          :key="cellIndex"
          :cell="cell"
          :editable="cell.editable ?? editable"
          :row="row"
          @cellUpdate="updateCellData(cell, $event)"
          @click="onCellClick(row, cellIndex)"
          class="zek-bv-table-cell"
        />
      </BTr>
    </BTbody>
    <BTfoot v-if="showFooter">
      <BTr class="zek-bv-tr">
        <BTd :colspan="tableHeaders.length" variant="secondary" class="text-end zek-bv-td">
          Total Rows: <b>{{ tableData.length }}</b>
        </BTd>
      </BTr>
    </BTfoot>
  </BTableSimple>
</template>

<script>
// Custom Cell component 
import ZekBvTableCell from './ZekBvTableCell.vue'

import { BTableSimple, BThead, BTr, BTh, BTbody, BTfoot, BTd, BFormCheckbox, BFormCheckboxGroup } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvTable',
  emits: ['update', 'rowClick', 'cellClick', 'rowSelect'],
  components: {
    ZekBvTableCell,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTbody,
    BTfoot,
    BTd,
    BFormCheckbox,
    BFormCheckboxGroup
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    },
    rawData: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    tableClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: this.data || [],
      tableHeaders: this.headers || [],
      selectedRows: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // If headers are not provided, use the keys of the first row of raw data
      if(this.headers.length === 0 && this.rawData.length > 0) {
        this.tableHeaders = Object.keys(this.rawData[0])
      }
      this.processRawData()
      this.processCustomHeaders()
    },
    processCustomHeaders() {
      this.tableData = this.tableData.map((row) => {
        this.tableHeaders.map((header, index) => {
          if (header.component) {
            row.cells[index].component = header.component
            row.cells[index].editable = false
          }
          if (header.html) {
            row.cells[index].html = header.html
            row.cells[index].editable = false
          }
          if (header.function) {
            row.cells[index].value = header.function(row.cells[index].value)
            row.cells[index].editable = false
          }
        })
        return row
      })
    },
    processRawData() {
      if (this.rawData.length > 0 && this.data.length === 0) {
        // Raw data is a key-value pair array
        this.convertRawDataToTableData()
      }
    },
    // Convert from raw data (Array of Object) to table data (BootstrapVue Table Data format)
    convertRawDataToTableData() {
      this.tableData = this.rawData.map((row, index) => {
        return {
          id: index,
          cells: this.tableHeaders.map((header) => {
            return {
              value: row[header.key ? header.key : header] || '',
              variant: 'light'
            }
          })
        }
      })
    },
    // Convert from table data (BootstrapVue Table Data format) to raw data (Array of Object)
    convertTableDataToRawData() {
      return this.tableData.map((row) => {
        let obj = {}
        row.cells.forEach((cell, index) => {
          obj[this.tableHeaders[index].key ? this.tableHeaders[index].key : this.tableHeaders[index]] = cell.value
        })
        return obj
      })
    },
    updateCellData(cell, newValue) {
      cell.value = newValue
      this.$emit('update', this.convertTableDataToRawData())
    },
    onRowClick(row) {
      this.$emit('rowClick', row)
    },
    onCellClick(row, cellIndex) {
      this.$emit('cellClick', { row, cellIndex, cell: row.cells[cellIndex] })
    },
    onRowSelect(rowIndex, row) {
      this.$nextTick(() => {
        this.$emit('rowSelect', rowIndex, row, this.selectedRows)
      })
    },
    selectAll(e) {
      if (e.target.checked === false) {
        this.selectedRows = []
      } else {
        this.selectedRows = this.tableData.map((_, index) => index)
      }
      this.$emit('rowSelect', null, null, this.selectedRows)
    }
  },
  watch: {
    rawData: {
      handler() {
        this.processRawData()
      },
      deep: true
    },
    data: {
      handler() {
        this.tableData = this.data
      },
      deep: true
    }
  }
}
</script>

<style scoped>
:deep(.cell-form-control) {
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
}
</style>
