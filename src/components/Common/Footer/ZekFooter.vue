<template>
  <footer :style="styleObject">
    <ul v-for="(column, index) in columns" :key="index">
      <li v-for="(link, index) in column.links" :key="index">
        <a :href="link.href" :style="textStyle">{{ link.text }}</a>
      </li>
    </ul>
    <div
      style="display: flex; align-items: center; position: absolute; bottom: 0"
      :style="socialLinksPosition == 'right' || 'left' ? `${socialLinksPosition}:0` : ''"
    >
      <a v-for="(link, i) in socialLinks" :key="i" :href="link.href">
        <i
          :class="`fab fa-${link.icon}`"
          style="margin: 0 5px"
          :style="{ color: textStyle.color }"
        />
      </a>
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
    customStyle: {
      type: Object,
      default: () => ({})
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
</style>
