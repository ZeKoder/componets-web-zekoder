<template>
  <component
    ref="ZekBvText"
    :is="tagType[type] ?? 'span'"
    @click="$emit('click', $event)"
    :style="customStyle"
    :class="customClass"
    v-bind="customProps"
    v-on="customEvents"
  >
    {{ text }}
  </component>
</template>

<script>
export default {
  name: 'ZekBvText',
  props: {
    text: {
      type: String,
      default: 'Text'
    },
    customStyle: {
      type: Object,
      default: () => {}
    },
    customClass: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'span',
      validator: (value) =>
        [
          'p',
          'span',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'strong',
          'b',
          'em',
          'i',
          'u',
          'sup',
          'sub',
          'abbr',
          'blockquote',
          'cite',
          'code',
          'kbd',
          'pre',
          'q'
        ].includes(value)
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
  emits: ['click'],
  data() {
    return {
      tagType: {
        p: 'p',
        span: 'span',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        strong: 'strong',
        b: 'b',
        em: 'em',
        i: 'i',
        u: 'u',
        sup: 'sup',
        sub: 'sub',
        abbr: 'abbr',
        blockquote: 'blockquote',
        cite: 'cite',
        code: 'code',
        kbd: 'kbd',
        pre: 'pre',
        q: 'q'
      }
    }
  }
}
</script>
