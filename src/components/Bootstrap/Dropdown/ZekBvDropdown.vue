<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-dropdown
      ref="ZekBvDropdown"
      :id="id"
      v-model="show"
      :text="dropdownText"
      :menuClass="menuClass"
      :autoClose="autoClose"
      :dropend="isDropend"
      :dropstart="isDropstart"
      :dropup="isDropup"
      :start="isMenuStart"
      :end="isMenuEnd"
      :center="isMenuCenter"
      :size="size"
      :disabled="disabled"
      :offset="offset"
      :split="split"
      :splitVariant="splitVariant"
      :splitClass="splitClass"
      :toggleClass="toggleClass"
      :variant="variant"
      :class="customClass"
      :style="customStyle"
      v-bind="customProps"
      v-on="customEvents"
      @click="buttonClick"
    >
      <b-dropdown-header v-if="header">{{ header }}</b-dropdown-header>
      <template v-for="item in items" :key="item.id">
        <b-dropdown-item
          v-if="!item.groupHeader"
          :href="item?.href"
          :variant="item?.variant"
          :active="item?.active"
          :disabled="item?.disabled"
          :linkClass="linkClass"
          @click="linkClicked($event, item)"
          >{{ item.text }}</b-dropdown-item
        >
        <b-dropdown-divider v-if="item.divider" />
        <b-dropdown-group
          v-else
          :id="'group-header-' + item.id"
          :header="item.groupHeader"
          :headerClass="groupHeaderClass"
          :headerVariant="item?.groupHeaderVariant"
        >
          <template v-for="subItem in item.options" :key="subItem.id">
            <b-dropdown-item
              :href="subItem?.href"
              :variant="subItem?.variant"
              :active="subItem?.active"
              :disabled="subItem?.disabled"
              :linkClass="linkClass"
              :aria-describedby="'group-header-' + item.id"
              @click="linkClicked($event, subItem)"
              >{{ subItem.text }}</b-dropdown-item
            >
            <b-dropdown-divider v-if="subItem.divider" />
          </template>
        </b-dropdown-group>
      </template>
    </b-dropdown>
  </div>
</template>

<script>
import {
  BDropdown,
  BDropdownDivider,
  BDropdownHeader,
  BDropdownItem,
  BDropdownGroup
} from 'bootstrap-vue-next'
export default {
  name: 'ZekBvDropdown',
  components: {
    BDropdown,
    BDropdownDivider,
    BDropdownHeader,
    BDropdownItem,
    BDropdownGroup
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    menuClass: {
      type: String,
      default: ''
    },
    linkClass: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    },
    splitVariant: {
      type: String,
      default: ''
    },
    splitClass: {
      type: String,
      default: ''
    },
    toggleClass: {
      type: String,
      default: ''
    },
    groupHeaderClass: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
    },
    autoClose: {
      type: [Boolean, String],
      default: true,
      validator: (value) => ['inside', 'outside', true, false].includes(value)
    },
    dropType: {
      type: String,
      default: '',
      validator: (value) => ['end', 'start', 'up', 'default'].includes(value)
    },
    menuAlignment: {
      type: String,
      default: '',
      validator: (value) => ['end', 'start', 'center', 'default'].includes(value)
    },
    dropdownText: {
      type: String,
      default: 'Dropdown'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    offset: {
      type: [Number, String, Object], //NOTE - object should be like {mainAxis?: number; crossAxis?: number; alignmentAxis?: number}
      default: 0
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    customProps: {
      type: Object,
      default: () => ({})
    },
    customEvents: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['input', 'change'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    isDropend() {
      return this.dropType === 'end'
    },
    isDropstart() {
      return this.dropType === 'start'
    },
    isDropup() {
      return this.dropType === 'up'
    },
    isMenuEnd() {
      return this.menuAlignment === 'end'
    },
    isMenuStart() {
      return this.menuAlignment === 'start'
    },
    isMenuCenter() {
      return this.menuAlignment === 'center'
    }
  },
  methods: {
    buttonClick(event) {
      this.$emit('buttonClick', event, this.show) //REVIEW - this event doesn't trigger at all.
    },
    linkClicked(event, item) {
      this.$emit('linkClick', event, item)
    }
  }
}
</script>
