<template>
    <div class="zek-progress-bar" :class="customClass">
      <span v-if="label" :class="labelClass" :style="labelStyle">{{ label }}</span>
      <b-progress
        :value="value"
        :max="max"
        :height="height"
        :show-value="showValue"
        v-bind="customProps"
      >
         <b-progress-bar v-if="customBar" :value="value" :label="customBar.label"> <!--//NOTE - for label to render showValue should be flase  -->
          <component
            v-if="customBar.component"
            :class="customBar.class"
            :is="customBar.component"
            v-bind="customBar.props"
            v-on="customBar.events"
          />
        </b-progress-bar>
      </b-progress>
    </div>
  </template>
  
  <script>
  import { BProgress, BProgressBar } from 'bootstrap-vue-next'
  export default {
      name: 'ZekBvProgressbar',
      components: {
        BProgress,
        BProgressBar
      },
      props: {
          backgroundColor: {
              type: String,
              default: 'blue',
          },
          showValue: {
              type: Boolean,
              default: true,
          },
          value: {
              type: [Number, String] ,
              required: true,
          },
          max: {
              type: [Number, String],
              required: true,
          },
          height: {
              type: String,
              default: '1rem',
          },
          label: {
              type: String,
              required: false,
          },
          customBar: {
              type: Object,
              required: false,
          },
          customClass: {
              type: String,
              required: false,
              default: ''
          },
          customProps: {
              type: Object,
              required: false,
          },
          labelStyle: {
            type: Object,
            default: () => ({})
          },
          labelClass: {
              type: String,
              required: false,
              default: ''
          },
          color: {
            type: String,
            required: false,
            default: '#ffffff'
          }
      },
  };
  </script>
  
  <style scoped>
  :deep([role=progressbar]){
      background-color: v-bind(backgroundColor);
      color: v-bind(color)
  }
  </style>
  