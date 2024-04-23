<template>
  <div class="zek-sidebar" :class="isCollapsed ? 'collapsed' : ''" :style="styleObject">
    <div class="zek-sidebar-links">
      <li
        v-if="allowExpandCollapse"
        class="link-container sidebar-title"
        :class="{ titlePresent: title }"
      >
        <a :title="isCollapsed ? 'Expand' : 'Collapse'" class="link sidebar-title-link">
          <a
            @click.prevent="$emit('onRoute', title.url)"
            :href="title.url ? title.url : ''"
            v-show="title && !isCollapsed"
            class="sidebar-title"
            :style="title.style ? title.style : { cursor: 'default' }"
          >
            {{ title.label ? title.label : title }}
          </a>
          <i
            v-if="expandIcon.icon && expandIcon.iconType !== 'custom'"
            class="icon"
            :class="expandIcon.icon"
            :style="expandIcon.iconStyle"
            @click="onCollapse"
          ></i>
          <img
            v-else-if="expandIcon.icon && expandIcon.iconType === 'custom'"
            class="icon"
            :src="expandIcon.icon"
            :style="expandIcon.iconStyle"
            @click="onCollapse"
          />
        </a>
      </li>
      <div class="sidebar-logo-container" v-if="logo && logo.src">
        <img v-bind="logo" class="sidebar-logo" />
      </div>
      <div v-for="(sec, i) in sections" :key="i + refreshKey" @click="refreshKey++">
        <li
          v-if="sec.title"
          class="link-container"
          :class="sec.title.isHovering ? 'hovering' : sec.title.isActive ? 'active-link' : ''"
          @mouseover="sec.title.isHovering = true"
          @mouseout="sec.title.isHovering = false"
          :style="
            (sec.title.isActive || sec.title.isHovering) && activeColor
              ? { color: activeColor }
              : ''
          "
        >
          <a
            v-if="sec.links && sec.links.length"
            href="javascript:"
            :title="sec.title.tooltip"
            class="link title"
            @click="sec.title.isExpanded = !sec.title.isExpanded"
            :style="
              (sec.title.isActive || sec.title.isHovering) && activeColor
                ? { color: activeColor }
                : ''
            "
          >
            <i
              v-if="sec.title.icon && sec.title.iconType !== 'custom'"
              class="icon"
              :class="sec.title.icon"
            ></i>
            <img
              v-else-if="sec.title.icon && sec.title.iconType === 'custom'"
              class="icon"
              :src="sec.title.icon"
            />
            <span v-show="sec.title.label && !isCollapsed">
              {{ sec.title.label }}
            </span>
            <i
              class="icon section-expand fa"
              :class="sec.title.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
              v-show="sec.title.showArrow && !isCollapsed"
            />
          </a>
          <a
            v-else
            :href="sec.title.url"
            :title="sec.title.tooltip"
            class="link title"
            @click.prevent="sec.title.isExpanded = !sec.title.isExpanded"
            @click="$emit('onRoute', sec.title.url)"
            :style="
              (sec.title.isActive || sec.title.isHovering) && activeColor
                ? { color: activeColor }
                : ''
            "
          >
            <i
              v-if="sec.title.icon && sec.title.iconType !== 'custom'"
              class="icon"
              :class="sec.title.icon"
            ></i>
            <img
              v-else-if="sec.title.icon && sec.title.iconType === 'custom'"
              class="icon"
              :src="sec.title.icon"
            />
            <span v-show="sec.title.label && !isCollapsed">
              {{ sec.title.label }}
            </span>
            <i
              class="icon section-expand fa"
              :class="sec.title.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
              v-show="sec.title.showArrow && !isCollapsed"
            />
          </a>
        </li>
        <SectionLinks
          :sec="sec"
          :isCollapsed="isCollapsed"
          :activeColor="activeColor"
          @linkClicked="linkClicked($event.sec, $event.link)"
          @onRoute="$emit('onRoute', $event)"
        ></SectionLinks>
      </div>
    </div>
    <div v-if="footer" class="sidebar-footer" :style="footer.style">
      <div v-show="!isCollapsed || showFooterOnCollapse" class="footer-links-container">
        <a
          v-for="(link, i) in footer.links"
          :key="i"
          :to="link.url"
          :title="link.tooltip"
          class="link"
          :style="(link.isActive || link.isHovering) && activeColor ? { color: activeColor } : ''"
          @click="$emit('onRoute', link.url)"
        >
          <i v-if="link.icon && link.iconType !== 'custom'" class="icon" :class="link.icon"></i>
          <img v-else-if="link.icon && link.iconType === 'custom'" class="icon" :src="link.icon" />
        </a>
      </div>
      <div
        v-if="footer.darkmode"
        class="footer-darkmode"
        :style="{
          backgroundColor: enableDarkmood ? footer.darkmode.backgroundColor : 'transparent'
        }"
      >
        <div class="darkmode-toggle">
          <input
            type="checkbox"
            id="darkmode-toggle"
            v-model="enableDarkmood"
            :checked="enableDarkmood"
            @change="$emit('darkModeToggle', enableDarkmood)"
          />
          <i
            v-show="enableDarkmood"
            class="dark"
            :class="footer.darkmode.icon"
            :style="{ color: footer.darkmode.iconColor }"
          />
          <i
            v-show="!enableDarkmood"
            class="light"
            :class="footer.darkmode.icon"
            :style="{ color: 'grey' }"
          />
          <div
            class="toggle-inner-circle"
            :style="
              enableDarkmood
                ? {
                    backgroundColor: footer.darkmode.circleColor,
                    left: 'calc(100% - 20px)'
                  }
                : {
                    backgroundColor: footer.darkmode.circleColor
                  }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionLinks from './SectionLinks.vue'
export default {
  name: 'ZekSidebar',
  components: {
    SectionLinks
  },
  props: {
    title: {
      type: [String, Object],
      default: ''
    },
    expandIcon: {
      type: Object,
      default: () => {
        return {
          icon: 'fa fa-bars',
          iconType: 'font-awesome'
        }
      }
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    allowExpandCollapse: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: String,
      default: ''
    },
    sections: {
      type: Array, // [{links, type, label, icon, collapsable}]
      default: () => []
    },
    activeClass: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: ''
    },
    alignItems: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    footer: {
      type: Object,
      default: () => ({})
    },
    logo: {
      type: Object,
      default: () => ({}) //provide all the props that need to be bound to the img tag
    },
    showFooterOnCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      justifyContent: this.alignItems === 'center' ? 'center' : 'flex-start',
      styleObject: {},
      refreshKey: 0,
      enableDarkmood: this.footer.darkmode?.enabled || false
    }
  },
  created() {
    this.styleObject = {
      ...this.customStyle,
      width: this.collapsed ? this.collapsedWidth : this.width || this.customStyle.width || ''
    }
    // Check if any link is active
    this.checkActiveLink()
  },
  watch: {
    footer: {
      handler(val) {
        this.enableDarkmood = val.darkmode.enabled ?? this.enableDarkmood
      },
      deep: true
    }
  },
  methods: {
    onCollapse() {
      this.isCollapsed = !this.isCollapsed
      this.styleObject.width = this.isCollapsed
        ? this.collapsedWidth
        : this.width || this.customStyle.width || ''
      this.$emit('onExpandCollapse', this.isCollapsed)
    },
    linkClicked(sec, link) {
      this.sections.forEach((section) => {
        // section.title.isExpanded = false
        section.title.isActive = false
        if (section.links && section.links.length) {
          section.links.forEach((_link) => {
            _link.isActive = false
          })
        }
      })
      sec.title.isExpanded = sec.title.isActive = true
      link.isActive = true

      this.$emit('linkClicked', link)
    },
    checkActiveLink() {
      const path = window.location.pathname
      this.sections.forEach((sec) => {
        if (path === sec.url) {
          sec.isActive = true
        }
        if (sec.links && sec.links.length) {
          sec.links.forEach((link) => {
            if (path === link.url) {
              link.isActive = true
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.zek-sidebar {
  height: 100%;
  overflow-y: auto;
  background-color: v-bind(backgroundColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // -webkit-transition: width 0.2s;
  transition: width 0.2s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  overflow-x: hidden;
  &.collapsed {
    width: v-bind(collapsedWidth);
    .link-container {
      text-align: center;
      padding: 0;
      &.sidebar-title {
        .icon {
          margin-left: initial;
        }
      }
    }
  }
}
.zek-sidebar-links {
  max-width: v-bind(width);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: v-bind(collapsedWidth);
  text-align: center;
  justify-content: v-bind(justifyContent);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }
}
.link-container {
  cursor: pointer;
  list-style: none;
  margin-bottom: 15px;
  padding: 7px 0;
  text-align: left;
  width: 100%;
  padding: 5px 10px;

  &.sidebar-title {
    text-decoration: none;
    border-radius: inherit;
    padding: 20px 10px;
    min-height: 50px;
    &.titlePresent {
      border-bottom: solid 1px #eee;
    }
    .icon {
      object-fit: contain;
      margin-left: auto;
      :hover {
        color: v-bind(activeColor);
      }
    }
    .sidebar-title-link {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        color: #cccccc;
        text-decoration: none;
      }
    }
  }
}
.nested {
  .link-container {
    padding-left: 20px;
  }
}
.link {
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
}
.link span {
  margin-left: 0.5rem;
}
.icon {
  width: v-bind(collapsedWidth);
  text-align: center;
}
.sidebar-footer {
  display: flex;
  align-items: center;
  padding: 10px 0;
  justify-content: space-between;
  border-top: 1px solid #efefef;
  .footer-darkmode {
    background: #43a8d2;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    height: 20px;
    width: 100%;
    max-width: v-bind(collapsedWidth);
    margin: 0 5px;
    .darkmode-toggle {
      position: relative;
      border-radius: 20px;
      width: 100%;
      height: 100%;
      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 0.75rem;
        color: #ffee00;
        animation: op 0.4s ease-in-out;
        &.dark {
          left: 5px;
        }
        &.light {
          right: 5px;
        }
        @keyframes op {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        z-index: 1;
        cursor: pointer;
      }
      .toggle-inner-circle {
        position: absolute;
        height: 15px;
        width: 15px;
        bottom: 3px;
        left: 3px;
        background-color: #fff;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
  }
}
</style>
