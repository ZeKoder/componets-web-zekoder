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
      :class="link.isHovering ? 'hovering' : link.isActive ? 'active-link' : ''"
      @mouseover="link.isHovering = true"
      @mouseout="link.isHovering = false"
      @click="$emit('linkClicked', {sec: sec, link: link})"
      :style="(link.isActive || link.isHovering) && activeColor ? { color: activeColor } : ''"
    >
      <RouterLink
        :to="link.url"
        :title="link.tooltip"
        class="link"
        :style="(link.isActive || link.isHovering) && activeColor ? { color: activeColor } : ''"
        @click="$emit('onRoute', link.url)"
      >
        <i v-if="link.icon && link.iconType !== 'custom'" class="icon" :class="link.icon"></i>
        <img v-else-if="link.icon && link.iconType === 'custom'" class="icon" :src="link.icon" />
        <span v-show="link.label && !isCollapsed">
          {{ link.label }}
        </span>
      </RouterLink>
    </li>
  </section>
</template>

<script>
export default {
  name: 'SectionLinks',
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
