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
      v-b-color-mode="colorMode"
    >
      <BNavbarBrand :tag="brandSettings.brandTag" :class="brandSettings.brandClass" :href="brandSettings.brandLink"
        >{{ brandSettings.brandTitle }} <img v-if="brandSettings.brandImg" :src="brandSettings.brandImgUrl" class="logo" alt="Logo"
      /></BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav v-for="(item, index) in items" :key="index" :class="item.navClass">
          <component :is="tabType[item.type]" v-bind="item"
            >{{ item.type != 'dropdown' ? item.text : '' }}
            <template v-if="item.type == 'dropdown'"
              ><BDropdownItem
                v-for="(option, index) in item.options"
                :key="index"
                :href="option.link"
                >{{ option.text }}</BDropdownItem
              ></template
            >
          </component>
        </BNavbarNav>
        <BNavForm class="d-flex nav-form">
          <ZekBvInput v-bind="inputProps" @input="inputValue = $event"/>
          <ZekBvButton customClass="submit-btn" v-bind="buttonProps" @click.prevent="submit" ></ZekBvButton>
        </BNavForm>
      </BCollapse>
    </BNavbar>
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavItem,
  BNavText,
  BCollapse,
  BNavItemDropdown,
  BDropdownItem,
  BNavForm,
} from 'bootstrap-vue-next'
import ZekBvInput from '../InputField/ZekBvInput.vue'
import ZekBvButton from '../Button/ZekBvButton.vue'
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
    BNavItemDropdown,
    BDropdownItem,
    BNavForm,
    ZekBvInput,
    ZekBvButton
  },
  props: {
    container: {
      type: [String, Boolean],
      default: false
    },
    fixed: {
      type: String,
      default: ''
    },
    sticky: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    },
    toggleable: {
      type: [Boolean, String],
      default: false //true, false, sm, md, lg and xl.
    },
    colorMode: {
      type: String,
      default: ''
    },
    brandSettings: {
      type: Object,
      default: () => ({
        brandTag: 'h1',
        brandClass: 'mb-0',
        brandTitle: 'Navbar',
        brandLink: '',
        brandImgUrl: ''
      })
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
    inputClass: {
      type: String,
      default: ''
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    buttonProps: {
      type: Object,
      default: () => ({})
    },
  },
  emits: ['submit'],
  setup() {
    const tabType = {
      text: 'BNavText',
      tab: 'BNavItem',
      dropdown: 'BNavItemDropdown'
    }
    let inputValue = ''
    return { tabType, inputValue }
  },
  methods: {
    submit() {
      this.$emit('submit', this.inputValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
