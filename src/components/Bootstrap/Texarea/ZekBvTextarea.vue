<template>
    <div :class="customClass ? customClass + '-container' : ''">
      <b-form-group
        :label="label"
        :label-for="id"
        :description="description"
        :valid-feedback="successMessage"
        :invalid-feedback="errorMessage"
        :state="error"
        :label-class="labelClass + (required ? ' required' : '')"
      >
        <b-form-textarea
          ref="textArea"
          :id="id"
          :value="value"
          :placeholder="placeholder"
          :formatter="formatter"
          :state="error"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :name="name"
          :class="customClass"
          :style="customStyle"
          :rows="rows"
          :max-rows="maxRows"
          :form="formID"
          :plaintext="plaintext"
          :no-resize="noResize"
          v-bind="customProps"
          v-on="customEvents"
          @change="change"
          @input="input"
        ></b-form-textarea>
      </b-form-group>
    </div>
  </template>
  
  <script>
  import { BFormTextarea, BFormGroup } from 'bootstrap-vue-next'
  export default {
    name: 'ZekBvTextarea',
    components: {
      BFormTextarea,
      BFormGroup
    },
    props: {
      value: {
        type: String,
        Number,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      },
      error: {
        type: Boolean,
        default: undefined
      },
      formatter: {
        type: Function,
        default: () => {}
      },
      description: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      customClass: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      customStyle: {
        type: Object,
        default: () => ({})
      },
      successMessage: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      },
      rows: {
        type: Number,
        default: 2
      },
      maxRows: {
        type: Number,
        default: 2
      },
      formID: {
        type: String,
        default: ''
      },
      plaintext: {
        type: Boolean,
        default: false
      },
      noResize: {
        type: Boolean,
        default: false
      },
      labelClass: {
        type: String,
        default: ''
      },
      customProps: {
        type: Object,
        default: () => ({})
      },
      customEvents: {
        type: Object,
        default: () => ({})
      },
    },
    emits: ['input', 'change'],
    methods: {
      input(event) {
        this.$emit('input', event.target.value)
      },
      change(event) {
        this.$emit('change', event.target.value)
      }
    }
  }
  </script>
  <style>
  .required::after {
    content: '*';
    color: red;
    margin-left: 4px;
  }
  </style>