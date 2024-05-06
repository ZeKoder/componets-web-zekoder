<template>
  <section
    v-show="sec.title ? sec.title.isExpanded : true"
    :class="!isCollapsed && sec.title ? 'nested' : ''"
    :style="isCollapsed ? '' : sec.style"
  >
    <li
      v-for="(link, i) in sec.links"
      :key="i"
      class="link-container link-container-child"
      :class="link.isActive ? 'active-link' : ''"
      @click="$emit('linkClicked', {sec: sec, link: link})"
      :style="link.isActive && activeColor ? { color: activeColor } : ''"
    >
      <a
        :href="link.url"
        :title="link.tooltip || link.label"
        class="link"
        :style="link.isActive && activeColor ? { color: activeColor } : ''"
        @click="$emit('onRoute', link.url)"
      >
        <i v-if="link.icon && link.iconType !== 'custom'" class="icon" :class="link.icon"></i>
        <img v-else-if="link.icon && link.iconType === 'custom'" class="icon" :src="link.icon" />
        <span v-show="link.label && !isCollapsed">
          {{ link.label }}
        </span>
      </a>
      <!--TODO - apply recursivness -->
      <!-- <template v-if="link.sections && link.sections.length">
        <SectionLinks
          v-for="(linkSec, i) in link.sections"
          :sec="linkSec"
          :isCollapsed="isCollapsed"
          :activeColor="activeColor"
          :key="i"
        ></SectionLinks>
      </template> -->
    </li>
  </section>
</template>

<script>
export default {
  name: 'SectionLinks',
  emits: ['linkClicked', 'onRoute'],
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    sec: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>

<style lang="sass" scoped></style>
