<template>
  <div
    class="zek-sidebar"
    :class="`${customClass}  ${isCollapsed ? 'collapsed' : ''}`"
    :style="styleObject"
  >
    <div class="zek-sidebar-links">
      <!-- SECTION: First Element to Expand and collapse the component -->
      <li
        v-if="allowExpandCollapse"
        class="link-container sidebar-title"
        :class="{ titlePresent: title }"
      >
        <div :title="isCollapsed ? 'Expand' : 'Collapse'" class="link sidebar-title-link">
          <ZekLink
            :link="title"
            :isCollapsed="isCollapsed"
            :collapsedWidth="collapsedWidth"
            :showLabelWhenCollapsed="showLabelWhenCollapsed"
          />
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
        </div>
      </li>

      <!-- SECTION: Identity -->
      <!-- TODO: Need improvment here  -->
      <div class="sidebar-logo-container" v-if="logo && logo.src">
        <img v-bind="logo" class="sidebar-logo" />
      </div>

      <!-- SECTION: Groups of Link (treated as a section) -->
      <div
        v-for="(sec, i) in localSections"
        :key="i + sec?.title"
        class="section-container"
        :class="sec.class"
        :style="sec.style"
      >
        <!-- NOTE: Custom Component -->
        <div v-if="sec.component" class="link-container">
          <component :is="sec.component" v-bind="sec.data" v-on="sec.event || {}" />
        </div>

        <!-- SECTION:  Section Title -->
        <li v-if="sec.title">
          <ZekLink
            class="link-container"
            :link="{...sec.title, isTitle: sec.links.length !== 0}"
            :isCollapsed="isCollapsed"
            :collapsedWidth="collapsedWidth"
            :showLabelWhenCollapsed="showLabelWhenCollapsed"
            @click.prevent="sec.title.isExpanded = !sec.title.isExpanded"
          />
        </li>

        <!-- SECTION: Content of the Section -->
        <section
          v-if="sec.title"
          v-show="sec.links.length && sec.title.isExpanded"
          class="section-links nested"
          :class="isCollapsed ? 'collapsed' : ''"
        >
          <ZekLink
            v-for="(link, i) in sec.links"
            :key="i"
            class="link-container link-container-child nested-link"
            :class="{ 'collapsed': isCollapsed }"
            @click="$emit('linkClicked', { sec: sec, link: link })"
            :link="link"
            :isCollapsed="isCollapsed"
            :collapsedWidth="collapsedWidth"
            :showLabelWhenCollapsed="showLabelWhenCollapsed"
          />
        </section>
      </div>
    </div>

    <!-- SECTION: Sidebar Footer -->
    <div v-if="footer" class="sidebar-footer" :class="footer.class" :style="footer.style">
      <!-- NOTE: Footer Custom Component -->
      <component
        v-if="footer.component"
        :is="footer.component"
        v-bind="footer.data"
        v-on="footer.event || {}"
      />

      <!-- SECTION: Footer Links -->
      <div
        v-if="footer.links?.length"
        v-show="!isCollapsed || showFooterOnCollapse"
        class="footer-links-container"
      >
        <ZekLink
          v-for="(link, i) in footer.links"
          :key="i"
          :link="link"
          :isCollapsed="isCollapsed"
          :collapsedWidth="collapsedWidth"
          :showLabelWhenCollapsed="showLabelWhenCollapsed"
        />
      </div>

      <!-- SECTION: Dark Mode Toggle -->
      <div
        v-if="darkmode"
        class="footer-darkmode"
        :class="darkmode.class"
        :style="{
          backgroundColor: isDarkModeEnabled
            ? darkmode.right?.backgroundColor
            : darkmode.left?.backgroundColor
        }"
      >
        <input
          type="checkbox"
          v-model="isDarkModeEnabled"
          :checked="isDarkModeEnabled"
          @change="$emit('darkModeToggle', isDarkModeEnabled)"
        />
        <div class="darkmode-toggle" :class="darkmode.class" :style="darkmode.style">
          <div
            class="icon-container left"
            :class="`${darkmode.left?.class}`"
            :style="{
              color: !isDarkModeEnabled ? darkmode.left?.activeColor : darkmode.left?.color,
              ...darkmode.left?.style
            }"
          >
            <i v-if="darkmode.left?.icon" class="left-icon" :class="`${darkmode.left?.icon}`" />
          </div>
          <div
            class="icon-container right"
            :class="`${darkmode.right?.class}`"
            :style="{
              color: isDarkModeEnabled ? darkmode.right?.activeColor : darkmode.right?.color,
              ...darkmode.right?.style
            }"
          >
            <i v-if="darkmode.right?.icon" class="right-icon" :class="`${darkmode.right?.icon}`" />
          </div>
          <div
            class="toggle"
            :class="darkmode.toggle?.class"
            :style="
              isDarkModeEnabled
                ? {
                    backgroundColor: darkmode.toggle?.activeColor,
                    left: '50%'
                  }
                : {
                    backgroundColor: darkmode.toggle?.color,
                    left: '0'
                  }
            "
          >
            <i v-if="darkmode.toggle?.icon" class="toggle-icon" :class="`${darkmode.toggle?.icon}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZekLink from './ZekLink.vue'

export default {
  name: 'ZekSidebar',
  components: {
    ZekLink
  },
  emits: ['onRoute', 'onExpandCollapse', 'linkClicked', 'darkModeToggle'],
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
    alignItems: {
      type: String,
      default: ''
    },
    customClass: {
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
    },
    showLabelWhenCollapsed: {
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
      isDarkModeEnabled: this.footer?.darkmode?.enabled || false,
      localSections: [...this.sections]
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
  computed: {
    darkmode() {
      return this.footer?.darkmode || {}
    },
  },
  watch: {
    footer: {
      handler(val) {
        this.isDarkModeEnabled = val.darkmode.enabled ?? this.isDarkModeEnabled
      },
      deep: true
    },
    sections: {
      handler() {
        this.checkActiveLink()
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
    linkClicked(link) {
      this.checkActiveLink()

      this.$emit('linkClicked', link)
    },
    checkActiveLink() {
      const path = window.location.pathname
      this.localSections.forEach((sec) => {
          if(sec?.component) {
              return;
          }
        sec.title.isActive = this.isActiveOn(path, sec?.title?.isActiveOn)
        if (sec?.links?.length) {
          sec.links.forEach((link) => {
            link.isActive = this.isActiveOn(path, link?.isActiveOn)
          })
        }
      })
    },
    isActiveOn(path, links) {
        if (!Array.isArray(links)) {
            links = [links];
        }
        return links.some((link) => path.match(link));
    },
  }
}
</script>

<style lang="scss" scoped>
$backgroundColor: v-bind(backgroundColor);
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.zek-sidebar {
  height: 100%;
  overflow-y: auto;
  background-color: $backgroundColor;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // -webkit-transition: width 0.2s;
  transition:
    width 0.2s ease-out 0s,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
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
  overflow-x: hidden;
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
    }
    .sidebar-title-link {
      display: flex;
      align-items: center;
      justify-content: center;
      component {
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
}
.zek-link span {
  margin-left: 0.5rem;
}
.icon {
  width: v-bind(collapsedWidth);
  text-align: center;
}
.sidebar-footer {
  .footer-darkmode {
    border-radius: 20px;
    height: 20px;
    width: 100%;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      left: 0;
      z-index: 3;
      cursor: pointer;
    }
    .darkmode-toggle {
      position: relative;
      border-radius: 20px;
      width: 100%;
      height: 100%;
      transition: all 0.4s;
      .icon-container {
        z-index: 2;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75rem;
        color: #ffee00;
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
      }
      .toggle {
        z-index: 1;
        position: absolute;
        border-radius: 50%;
        transition: all 0.4s;
      }
    }
  }
}
</style>
