<template>
  <BTd class="zek-table-cell" :variant="cell.variant" @click="enterEditMode" v-if="!isEditing || !editable">
    <component v-if="cell.html" :is="{props: ['row', 'cell'], template: cell.html}" :row="row" :cell="cell" />
    <component v-else-if="cell.component" :is="cell.component" :cell="cell" :row="row" v-bind="cell.props || {}"
      v-on="cell.events || {}" />
    <span v-else>{{ cell.value }}</span>
  </BTd>
  <BTd class="zek-table-cell" :variant="cell.variant" v-else>
    <input class="cell-form-control" type="text" :value="editedValue" @input="handleInput" @blur="exitEditMode"
      ref="input" />
  </BTd>
</template>

<script>
import { BTd } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvTableCell',
  components: {
    BTd
  },
  emits: ['cellUpdate'],
  props: {
    cell: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedValue: this.cell.value,
    }
  },
  methods: {
    handleInput(event) {
      this.editedValue = event.target.value
      this.$emit('cellUpdate', this.editedValue)
    },
    enterEditMode() {
      this.isEditing = true
    },
    exitEditMode() {
      this.isEditing = false
      this.$emit('cellUpdate', this.editedValue)
    }
  }
}

</script>