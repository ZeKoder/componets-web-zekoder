<template>
  <div>
    <ZekBvButton v-bind="collapseBtnProps" v-b-toggle="collapseId"></ZekBvButton>
    <BCollapse :id="collapseId" :horizontal="horizontal" :class="customClass">
      <ZekContainer
        :column="column"
        :customClass="containerClass"
        @rowClick="$emit('rowClick', $event)"
        @colClick="$emit('colClick', $event)"
      ></ZekContainer>
      <!-- <ZekBvCollapse />  //FIXME - if needed fix requirsivness
        v-if="showInnerCollapse"
        :collapseBtnProps="{ label: 'toggle inner', variant: 'secondary' }"
        :column="{ rows: [{ columns: [{ id: '1' }] }] }"
        :collapseId="innerCollapseId"
      ></ZekBvCollapse> -->
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
    collapseId: {
      type: String,
      default: 'collapse-1'
    },
    innerCollapseId: {
      type: String,
      default: 'collapse-2'
    },
    showInnerCollapse: {
      type: Boolean,
      default: false
    },
    customClass: {
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
    },
  }
}
</script>

<style lang="scss" scoped></style>
