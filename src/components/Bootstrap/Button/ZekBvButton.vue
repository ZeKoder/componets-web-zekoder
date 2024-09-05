<template>
  <b-button
    :variant="variant"
    ref="ZekBvButton"
    :href="url"
    :type="type"
    :size="size"
    :disabled="disabled"
    :pressed="pressed"
    :block="isBlock"
    :pill="isPill"
    :squared="isSquared"
    :loading="loading"
    :loadingText="loadingText"
    :loadingfill="loadingfill"
    :class="customClass"
    :style="customStyle"
    v-bind="customProps"
    v-on="customEvents"
    @click="onClick"
    @update:pressed="onPressed"
    >
    <i v-if="icon" :class="icon"></i>
    {{ label }}
    <template v-if="customButton" #default> <span v-html="customButton"></span></template>
    <i v-if="trailingIcon" :class="trailingIcon"></i>
  </b-button>
</template>

<script>
import { BButton } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvButton',
  components: {
    BButton
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    trailingIcon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Button'
    },
    variant: {
      type: String,
      default: 'secondary'
    },
    url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    size: {
      type: String,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pressed: {
      type: Boolean,
      default: false
    },
    styleType: {
      type: String,
      default: 'default',
      validator: (value) => ['pill', 'squared', 'block', 'default'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingfill: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    customButton: {
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
    customProps: {
      type: Object,
      default: () => ({})
    },
    customEvents: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click', 'pressed'],
  computed: {
    isBlock() {
      return this.styleType === 'block'
    },
    isPill() {
      return this.styleType === 'pill'
    },
    isSquared() {
      return this.styleType === 'squared'
    }
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
    onPressed(event) {
      this.$emit('pressed', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
