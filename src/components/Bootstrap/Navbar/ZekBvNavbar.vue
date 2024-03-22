<template>
  <div>
    <BNavbar
      :container="container"
      ref="ZekBvNavbar"
      :fixed="fixed"
      :sticky="sticky"
      :variant="variant"
      :toggleable="toggleable"
      :class="customClass"
      :style="customStyle"
      v-b-color-mode="'dark'"
    >
      <BNavbarToggle target="nav-collapse" />
      <BNavbarBrand :tag="brandTag" :class="brandClass" :href="brandHref"
        >{{ brandTitle }} <img :src="brandImg" alt="Logo"
      /></BNavbarBrand>
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav v-for="(item, index) in items" :key="index">
          <component :is="tabType[item.type]" v-bind="item">{{ item.text }}</component>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
  </div>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BNavbarNav, BNavItem, BNavText, BCollapse, BNavItemDropdown } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvNavbar',
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavItem,
    BNavText,
    BNavbarNav,
    BCollapse,
    BNavItemDropdown
  },
  props: {
    container: {
      type: [String, Boolean],
      default: 'fluid'
    },
    fixed: {
      type: String,
      default: 'top'
    },
    sticky: {
      type: String,
      default: 'top'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    toggleable: {
      type: Boolean,
      default: false
    },
    brandTag: {
      type: String,
      default: 'h1'
    },
    brandClass: {
      type: String,
      default: 'mb-0'
    },
    brandTitle: {
      type: String,
      default: 'Test'
    },
    brandHref: {
      type: String,
      default: '#'
    },
    brandImg: {
      type: String,
      default: '/'
    },
    items: {
      type: Array,
      default: () => []
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
  },
  setup() {
    const tabType = {
      text: 'BNavText',
      tab: 'BNavItem'
    }
    return { tabType }
  }
}
</script>

<style lang="scss" scoped></style>
