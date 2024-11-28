<template>
  <component
    :is="linkComponent(link.url)"
    v-bind="linkAttributes(link.url)"
    :title="link.tooltip || link.label"
    class="zek-link"
    :style="link.isActive && activeColor ? { color: activeColor } : ''"
    @click="$emit('onRoute', link.url)"
  >
    <i v-if="link.icon && link.iconType !== 'custom'" class="icon" :class="link.icon"></i>
    <img v-else-if="link.icon && link.iconType === 'custom'" class="icon" :src="link.icon" />
    <span v-show="link.label && !isCollapsed">
      {{ link.label }}
    </span>
    <i
      class="icon section-expand fa"
      :class="link.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
      v-show="link.showArrow && !isCollapsed"
    />
  </component>
</template>

<script>
import { resolveComponent } from 'vue'
export default {
  name: 'ZekLink',
  props: {
    link: {
      type: Object,
      required: true
    },
    activeColor: {
      type: String,
      default: ''
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: String,
      default: '2rem'
    }
  },
  methods: {
    linkComponent(url) {
      const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(url)
      if (isExternal) {
        return 'a'
      }
      // Check if Nuxt is present by looking for window.__NUXT__
      const isNuxt = typeof window !== 'undefined' && window.__NUXT__
      return isNuxt ? resolveComponent('NuxtLink') : 'router-link'
    },
    linkAttributes(url) {
      const component = this.linkComponent(url)
      if (component === 'a') {
        return { href: url }
      } else {
        return { to: url }
      }
    }
  }
}
</script>

<style lang="scss">
.zek-link {
  cursor: pointer;
  transition: 0.3s ease-out;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  // display: inline-block;
  display: flex;
  flex-wrap: nowrap;
  // justify-content: space-between;
  align-items: center;
  &.title {
    .icon {
      &.section-expand {
        margin-left: auto;
      }
    }
  }
  span {
    margin-left: 0.5rem;
  }
  .icon {
    width: v-bind(collapsedWidth);
    text-align: center;
  }
}
</style>
