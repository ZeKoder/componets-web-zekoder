<template>
  <component
    :is="linkComponent(link.url)"
    v-bind="linkAttributes(link.url)"
    :title="link.tooltip || link.label"
    class="zek-link"
    :class="{ [link.class]: link.class , expanded: link.isExpanded, active: link.isActive, title: link.isTitle, 'label-under-icon': isCollapsed && showLabelWhenCollapsed }"
    @click="$emit('onRoute', link.url)"
  >
    <i v-if="link.icon && link.iconType !== 'custom'" class="icon" :class="link.icon"></i>
    <img v-else-if="link.icon && link.iconType === 'custom'" class="icon" :src="link.icon" />
    <span v-show="link.label && (!isCollapsed || showLabelWhenCollapsed)">
      {{ link.label }}
    </span>
    <i
      class="icon section-expand fa"
      :class="expandCollapseIcon"
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
    isCollapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: String,
      default: '2rem'
    },
    showLabelWhenCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    expandCollapseIcon() {
        const expandIcon = this.link.expandIcon || 'fa-chevron-right'
        const collapseIcon = this.link.collapseIcon || 'fa-chevron-up'
      return this.link.isExpanded ? collapseIcon : expandIcon
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
      const component = isNuxt ? resolveComponent('NuxtLink') : 'router-link'
      return this.link.isTitle ? 'span' : component
    },
    linkAttributes(url) {
      const component = this.linkComponent(url)
      if (component === 'a') {
        return { href: url }
      } else {
          // Handle NuxtLink and router-link if url has query or hash
          if (url?.includes('?') || url?.includes('#')) {
              const queryStringUri = url.split('?')[1]?.split('#')[0] || '';
              const queryString = decodeURIComponent(queryStringUri);
              const queryObj = queryString.split('&').reduce((acc, curr) => {
                  const [key, value] = curr.split('=');
                  acc[key] = value;
                  return acc;
              }, {});
              const hashStringUri = url.split('#')[1] || '';
              const hashString = decodeURIComponent(hashStringUri);
              return { to: { path: url.split('?')[0], query: queryObj, hash: hashString } }
          }
        return { to: url }
      }
    },
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
  &.label-under-icon {
    flex-direction: column;
    .icon {
      margin-bottom: 0.5rem;
    }
    span {
      margin-left: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
}
</style>
