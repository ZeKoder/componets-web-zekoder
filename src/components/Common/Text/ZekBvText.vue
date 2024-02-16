<template>
  <component
    ref="ZekBvText"
    :is="tagTypes[type] ?? 'span'"
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
const tagTypes = {
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
};

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
          Object.values(tagTypes).includes(value)
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
      tagTypes: tagTypes
    };
  }
}
</script>
