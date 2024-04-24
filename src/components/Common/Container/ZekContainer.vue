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
      @click.stop="emitClick('rowClick', { column: column, row: row, index: i })"
    >
      <div
        v-for="(col, index) in row.columns"
        :key="col.id || col.key || generateRandom(index)"
        :class="(col.columnWidth ? 'col-' + col.columnWidth : 'col') + ' ' + (col.class || '')"
        :id="col.id || generateRandom(index)"
        v-bind="col.props || {}"
        v-on="col.events || {}"
        v-show="col.condition != undefined ? col.condition : true"
        @click.stop="emitClick('colClick', { column: col, row: row, index: index })"
      >
        <zek-container
          :column="col"
          @rowClick="emitClick('rowClick', $event)"
          @colClick="emitClick('colClick', $event)"
        ></zek-container>
      </div>
    </div>
  </template>
  <template v-else-if="column && !column.rows && column.type && !column.type">
    <component
      v-if="!column.type && column.component"
      :is="getZekBVComponent(column.component)"
      v-bind="column.data || {}"
      v-on="column.events || {}"
    ></component>
    <component
      v-else-if="column.type == 'custom' && column.component"
      :is="column.component"
      v-bind="column.data || {}"
      v-on="column.events || {}"
    ></component>
    <span style="color: red" v-else> Error getting component </span>
  </template>
</template>
<script>
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
      default: () => {
        return {
          rows: [
            {
              columns: [
                {
                  component: "ZekBvButton",
                  data: {
                    template: 'Hello World'
                  }
                }
              ]
            }
          ]
        }
      }
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
  methods: {
    async getZekBVComponent(component) {
      // Dynamic import component from @zekoder/web-components-bootstrap with names
      import('@zekoder/zekoder-web-components-bootstrap').then((components) => {
        console.log(components)
        return components[component]
      })
    },
    generateRandom(i) {
      i = i || 0
      return Math.ceil(Math.random() * 100000 + i)
    }
  }
}
</script>
