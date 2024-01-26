<template>
    <div :class="customClass ? customClass + '-container' : ''">
      <b-form-group
        :label="label"
        :label-for="id"
        :description="description"
        :valid-feedback="successMessage"
        :invalid-feedback="errorMessage"
        :state="error"
      >
        <b-form-textarea
          :id="id"
          :value="value"
          :placeholder="placeholder"
          :size="size"
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
          @change="change"
          @input="input"
        ></b-form-textarea>
      </b-form-group>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ZekTextarea',
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
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      error: {
        type: String
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
    },
    emits: ['input', 'change'],
    methods: {
      input() {
        this.$emit('input')
      },
      change() {
        this.$emit('change')
      }
    }
  }
  </script>
  