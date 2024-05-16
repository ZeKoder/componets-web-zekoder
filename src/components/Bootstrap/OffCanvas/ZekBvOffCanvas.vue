<template>
    <div>
      <BOffcanvas
        v-model="showModel"
        :placement="placement"
        :backdrop="backdrop"
        :backdropVariant="backdropVariant"
        :bodyScrolling="bodyScrolling"
        :title="title"
        :bodyClass="bodyClass"
        :footerClass="footerClass"
        :headerClass="headerClass"
        :headerCloseClass="headerCloseClass"
        :id="id"
        v-bind="customProps"
        v-on="customEvents"
        :class="customClass"
        @hidden="$emit('toggle', false)"
        @shown="$emit('toggle', true)"
      >
        <ZekContainer
          :column="column"
          :customClass="containerClass"
          @rowClick="$emit('rowClick', $event)"
          @colClick="$emit('colClick', $event)"
        ></ZekContainer>
      </BOffcanvas>
    </div>
  </template>
  
  <script>
  import { BOffcanvas } from 'bootstrap-vue-next'
  import { ZekContainer } from '@zekoder/zekoder-web-components-common'
  export default {
    name: 'ZekBvOffCanvas',
    components: {
      BOffcanvas,
      ZekContainer
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      placement: {
        type: String,
        default: 'end',
        validator: (value) => ['top', 'bottom', 'start', 'end'].includes(value)
      },
      title: {
        type: String,
        default: ''
      },
      column: {
        type: Object
      },
      containerClass: {
        type: String,
        default: ''
      },
      backdrop: {
        type: Boolean,
        default: true
      },
      bodyScrolling: {
        type: Boolean,
        default: true
      },
      backdropVariant: {
        type: String,
        default: 'dark'
      },
      bodyClass: {
        type: String,
        default: ''
      },
      footerClass: {
        type: String,
        default: ''
      },
      headerClass: {
        type: String,
        default: ''
      },
      headerCloseClass: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      },
      customProps: {
        type: Object,
        default: () => ({
          // noCloseOnBackdrop: false, // Check here for all available props https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/offcanvas.html
          // noCloseOnEsc: false,
          // noFocus: false,
          // noHeader: false,
          // noHeaderClose: false,
        })
      },
      customEvents: {
        type: Object,
        default: () => ({})
      },
      customClass: {
        type: String,
        default: 'hii'
      },
    },
    emits: ['rowClick', 'colClick', 'toggle'],
    data() {
      return {
        showModel: this.show
      }
    },
    watch: {
      show(val) {
        this.showModel = val
      }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  