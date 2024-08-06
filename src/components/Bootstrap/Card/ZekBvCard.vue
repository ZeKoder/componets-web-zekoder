<template>
  <BCard v-bind="cardProps">
    <BCardHeader v-bind="headerProps">
      <!-- Add NavBar -->
      <component v-if="header?.component" :is="header?.component" v-bind="header?.data" v-on="header?.events || {}" />
    </BCardHeader>
    <BCardBody v-bind="bodyProps">
      <component v-if="body?.component" :is="body?.component" v-bind="body?.data" v-on="body?.events || {}"></component>
    </BCardBody>
    <BCardFooter v-bind="footerProps" />
  </BCard>
</template>

<script>
import { BCard, BCardBody, BCardFooter, BCardHeader } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvCard',
  components: {
    BCard,
    BCardHeader,
    BCardFooter,
    BCardBody
  },
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    imgAlt: {
      type: String,
      default: ''
    },
    imgPosition: {
      type: String,
      default: 'top'
    },
    title: {
      type: String,
      default: ''
    },
    header: {
      type: [String, Object],
      default: ''
    },
    body: {
      type: [String, Object],
      default: ''
    },
    footer: {
      type: [String, Object],
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    headerProps() {
      return {
        class: 'zek-bv-card-header',
        'text': typeof this.header === 'string' ? this.header : undefined,
        'html': this.header?.html,
        'tag': this.header?.tag,
        ...(typeof this.header === 'object' ? this.header : {})
      }
    },
    footerProps() {
      return {
        class: 'zek-bv-card-footer',
        'text': typeof this.footer === 'string' ? this.footer : undefined,
        'html': this.footer?.html,
        'tag': this.footer?.tag,
        ...(typeof this.footer === 'object' ? this.footer : {})
      }
    },
    bodyProps() {
      return {
        class: 'zek-bv-card-body',
        'text': typeof this.body === 'string' ? this.body : undefined,
        'html': this.body?.html,
        'tag': this.body?.tag,
        ...(typeof this.body === 'object' ? this.body : {})
      }
    },
    cardProps() {
      return {
        class: 'zek-bv-card ' + this.customClass,
        'imgSrc': this.imgSrc,
        'imgAlt': this.imgAlt,
        'imgTop': this.imgPosition == 'top',
        'imgBottom': this.imgPosition == 'bottom',
        'imgLeft': this.imgPosition == 'left',
        'imgRight': this.imgPosition == 'right',
        'title': this.title,
        ...this.$attrs
      }
    }
  },
  watch: {
    content: {
      handler: function (val) {
        if (val.component === 'div') {
          this.$nextTick(() => {
            this.$forceUpdate()
          })
        }
      },
      deep: true
    }
  }
}
</script>