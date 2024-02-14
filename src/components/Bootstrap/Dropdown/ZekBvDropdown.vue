<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-dropdown
      ref="ZekBvDropdown"
      :id="id"
      v-model="show"
      :text="label"
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
      :no-caret="noCaret"
      v-bind="customProps"
      v-on="customEvents"
      @click="onClick"
      @toggle="onToggle"
    >
      <template v-if="customToggle" #button-content>
        <span v-html="customToggle" />
      </template>
      <b-dropdown-header v-if="header">{{ header }}</b-dropdown-header>
      <template v-for="(item, index) in items" :key="index">
        <b-dropdown-group
          :id="'group-header-' + index"
          :header="item.header"
          :headerClass="headerClass + item?.headerClass + (item.groupHeader ? '' : ' d-none')"
          :headerVariant="item?.headerVariant"
        >
          <b-dropdown-item
            :href="item?.href"
            :variant="item?.variant"
            :active="item?.active"
            :disabled="item?.disabled"
            :linkClass="linkClass"
            :aria-describedby="'group-header-' + index"
            @click="linkClicked($event, item)"
            >{{ item.text }}</b-dropdown-item
          >
          <b-dropdown-divider v-if="item.divider" />
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
    headerClass: {
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
    menuPosition: {
      type: String,
      default: 'default',
      validator: (value) => ['end', 'start', 'up', 'default'].includes(value)
    },
    menuAlignment: {
      type: String,
      default: 'default',
      validator: (value) => ['end', 'start', 'center', 'default'].includes(value)
    },
    label: {
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
    },
    toggleMenu: {
      type: Boolean,
      default: false
    },
    noCaret: {
      type: Boolean,
      default: false
    },
    customToggle: {
      type: String,
      default: ''
    }
  },
  emits: ['toggle', 'linkClick', 'click'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    isDropend() {
      return this.menuPosition === 'end'
    },
    isDropstart() {
      return this.menuPosition === 'start'
    },
    isDropup() {
      return this.menuPosition === 'up'
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
  watch: {
    toggleMenu() {
      this.show = this.toggleMenu
    }
  },
  methods: {
    onToggle() {
      this.$emit('toggle', !this.show)
    },
    linkClicked(event, item) {
      this.$emit('linkClick', event, item)
    },
    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
