<template>
  <BTableSimple hover small caption-top responsive :class="tableClass">
    <BThead head-variant="dark">
      <BTr>
        <BTh v-for="header in tableHeaders" :key="header.key ? header.key : header">{{
          header.label ? header.label : header
        }}</BTh>
      </BTr>
    </BThead>
    <BTbody>
      <BTr v-for="row in tableData" :key="row.id">
        <CustomCell
          v-for="(cell, cellIndex) in row.cells"
          :key="cellIndex"
          :cell="cell"
          :editable="editable"
          @cellUpdate="updateCellData(row, cellIndex, $event)"
        />
      </BTr>
    </BTbody>
    <BTfoot v-if="showFooter">
      <BTr>
        <BTd :colspan="tableHeaders.length" variant="secondary" class="text-end">
          Total Rows: <b>{{ tableData.length }}</b>
        </BTd>
      </BTr>
    </BTfoot>
  </BTableSimple>
</template>

<script>
// FIXME: Move to a separate file
// Custom Cell component 
const CustomCell = {
  props: {
    cell: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEditing: false,
      editedValue: this.cell.value
    }
  },
  methods: {
    enterEditMode() {
      this.isEditing = true
    },
    exitEditMode() {
      this.isEditing = false
      this.$emit('cellUpdate', this.editedValue)
    }
  },
  components: {
    BTd
  },
  template: `
    <BTd
      :variant="cell.variant"
      @click="enterEditMode"
      v-if="!isEditing || !editable"
    >
      {{ cell.value }}
    </BTd>
    <BTd
      :variant="cell.variant"
      v-else
    >
      <input
        class="cell-form-control"
        type="text"
        :value="editedValue"
        @input="editedValue = $event.target.value"
        @blur="exitEditMode"
        ref="input"
      />
    </BTd>
  `
}
import { BTableSimple, BThead, BTr, BTh, BTbody, BTfoot, BTd } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvTable',
  components: {
    CustomCell,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTbody,
    BTfoot,
    BTd
  },
  props: {
    editable: {
      type: Boolean,
      default: false
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
      tableHeaders: this.headers || []
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
    },
    processRawData() {
      if (this.rawData.length > 0 && this.data.length === 0) {
        // Raw data is a key-value pair array
        this.convertRawDataToTableData()
      }
    },
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
    convertTableDataToRawData() {
      return this.tableData.map((row) => {
        let obj = {}
        row.cells.forEach((cell, index) => {
          obj[this.tableHeaders[index].key ? this.tableHeaders[index].key : this.tableHeaders[index]] = cell.value
        })
        return obj
      })
    },
    updateCellData(row, cellIndex, newValue) {
      row.cells[cellIndex].value = newValue
      this.$emit('update', this.convertTableDataToRawData())
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
