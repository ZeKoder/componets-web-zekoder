<template>
  <!-- Rows -->
  <template v-if="column && column.rows && column.rows.length">
    <div
      v-for="(row, i) in column.rows"
      :key="row.id || row.key || generateRandom(i)"
      :class="`row row-${i} ${row.class || ''}`"
      v-bind="row.props || {}"
      v-on="row.events || {}"
      :id="row.id || generateRandom(i)"
      v-show="row.condition != undefined ? row.condition : true"
      @click.stop="$emit('rowClick', { column: column, row: row, index: i })"
    >
      <div
        v-for="(col, index) in row.columns"
        :key="col.id || col.key || generateRandom(index)"
        :class="(col.columnWidth ? 'col-' + col.columnWidth : 'col') + ' ' + (col.class || '')"
        :id="col.id || generateRandom(index)"
        v-bind="col.props || {}"
        v-on="col.events || {}"
        v-show="col.condition != undefined ? col.condition : true"
        @click.stop="$emit('colClick', { column: col, row: row, index: index })"
      >
        <zek-container
          :column="col"
          @rowClick="$emit('rowClick', $event)"
          @colClick="$emit('colClick', $event)"
        ></zek-container>
      </div>
    </div>
  </template>
  <template v-else-if="column && !column.rows">
    <component
      v-if="column.type == 'custom' && column.component"
      :is="column.component"
      v-bind="column.data || {}"
      v-on="column.events || {}"
    ></component>
    <component
      v-else-if="column.component"
      :is="getZekBVComponent(column.component) || getZekCommonComponent(column.component) || errorComponent"
      v-bind="column.data || {}"
      v-on="column.events || {}"
    ></component>
    <span style="color: red" v-else> Error getting component </span>
  </template>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'ZekContainer',
  emits: ['rowClick', 'colClick'],
  props: {
    refresh: {
      type: String,
      default: ''
    },
    column: {
      type: Object,
      default: () => {}
    },
    customClass: {
      type: String,
      default: ''
    },
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      errorComponent: {
        template: '<span style="color: red">Component not found...</span>'
      }
    }
  },
  methods: {
    getZekBVComponent(c) {
      return defineAsyncComponent(async () => (await import("@zekoder/zekoder-web-components-bootstrap"))[c])
    },
    getZekCommonComponent(c) {
      return defineAsyncComponent(async () => (await import("@zekoder/zekoder-web-components-common"))[c])
    },
    generateRandom(i) {
      i = i || 0
      return Math.ceil(Math.random() * 100000 + i)
    }
  }
}
</script>
