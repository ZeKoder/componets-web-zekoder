<template>
  <div>
    <component
      v-if="customToggle?.component"
      :is="customToggle?.component"
      v-bind="customToggle.props"
      v-on="customToggle.event"
      v-b-toggle="collapseId"
    ></component>
    <ZekBvButton
      v-else
      :label="label"
      :customClass="buttonClass"
      v-bind="collapseBtnProps"
      v-b-toggle="collapseId"
    ></ZekBvButton>
    <BCollapse
      :id="collapseId"
      :horizontal="horizontal"
      :class="customClass"
      @hide="$emit('toggle', false)"
      @show="$emit('toggle', true)"
    >
      <ZekContainer
        :column="column"
        :customClass="containerClass"
        @rowClick="$emit('rowClick', $event)"
        @colClick="$emit('colClick', $event)"
      ></ZekContainer>
    </BCollapse>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue-next'
import ZekBvButton from '../Button/ZekBvButton.vue'
import ZekContainer from '../../Common/Container/ZekContainer.vue' //FIXME - export component form npm to be able to import
export default {
  name: 'ZekBvCollapse',
  components: {
    ZekBvButton,
    ZekContainer,
    BCollapse
  },
  props: {
    column: {
      type: Object
    },
    collapseBtnProps: {
      type: Object
    },
    customToggle: {
      type: Object
    },
    collapseId: {
      type: String,
      default: 'collapse-1'
    },
    customClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Toggle'
    },
    buttonClass: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  emits: ['toggle', 'rowClick', 'colClick']
}
</script>

<style lang="scss" scoped></style>
