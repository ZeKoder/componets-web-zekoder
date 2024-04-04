<template>
  <footer :style="styleObject" :class="customClass">
    <ul v-for="(column, index) in columns" :key="index" class="footer-column">
      <component
        v-if="column.component"
        :is="column.component"
        v-bind="column.props"
        v-on="column.events || {}"
        :class="`footer-custom-component-${index}`"
      />
      <template v-else>
        <li v-for="(link, index) in column.links" :key="index" :class="`footer-item-${index}`">
          <a :href="link.href" :style="textStyle" class="footer-link">{{ link.text }}</a>
        </li>
      </template>
    </ul>
    <div
      style="display: flex; align-items: center; position: absolute; bottom: 0"
      :style="socialLinksPosition == 'right' || 'left' ? `${socialLinksPosition}:0` : ''"
      class="social-links-container"
    >
      <a v-for="(link, i) in socialLinks" :key="i" :href="link.href" class="social-link">
        <i
          :class="`fab fa-${link.icon}`"
          style="margin: 0 5px"
          :style="{ color: textStyle.color }"
        />
      </a>
    </div>
    <div v-if="copyrights" class="copyright-section">
      <p class="copyright-text">{{ copyrights }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ZekFooter',
  props: {
    height: {
      type: String,
      required: true,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    socialLinks: {
      type: Array,
      default: () => []
    },
    socialLinksPosition: {
      type: String,
      default: 'right'
    },
    image: {
      type: String,
      default: ''
    },
    imagePosition: {
      type: String,
      default: 'left'
    },
    textStyle: {
      type: Object,
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    customCalss: {
      type: Object,
      default: () => ({})
    },
    copyrights: {
      type: String,
      default: ''
    }
  },
  computed: {
    styleObject() {
      return {
        ...this.customStyle,
        position: this.customStyle.position || 'relative' || 'relative',
        height: this.height || this.customStyle.height || 'auto',
        backgroundImage: `url(${this.image})` || this.customStyle.backgroundImage || '',
        backgroundPosition: this.imagePosition || this.customStyle.backgroundPosition || ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-column {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.footer-item {
  margin-bottom: 10px;
}

.footer-link {
  text-decoration: none;
  color: inherit;
}

.copyright-section {
  position: absolute;
  bottom: 0;
  right: 50%;
}

.copyright-text {
  font-size: 14px;
}
</style>
