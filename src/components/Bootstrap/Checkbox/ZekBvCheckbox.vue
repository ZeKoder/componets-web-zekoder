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
        <b-form-checkbox-group
          ref="ZekBvCheckbox"
          :id="id"
          v-model="selected"
          :options="items"
          :value="value"
          :size="size"
          :state="error"
          :disabled="disabled"
          :buttons="buttons"
          :required="required"
          :name="name"
          :class="customClass"
          :style="customStyle"
          :form="formID"
          v-bind="customProps"
          v-on="customEvents"
          :button-variant="buttonVariant"
          :plain="plain"
          :stacked="stacked"
          :switches="switches"
          :validated="validated"
          @change="change"
          @input="input"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>
  </template>
  
  <script>
  import { BFormCheckboxGroup, BFormGroup } from 'bootstrap-vue-next'
  export default {
    name: 'ZekBvCheckbox',
    components: {
      BFormCheckboxGroup,
      BFormGroup
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      value: {
        type: Array,
        default: () => []
      },
      id: {
        type: String,
        default: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      },
      size: {
        type: String,
        default: ''
      },
      error: {
        type: Boolean,
        default: undefined
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
      buttons: {
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
      formID: {
        type: String,
        default: ''
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
      plain: {
        type: Boolean,
        default: false
      },
      stacked: {
        type: Boolean,
        default: false
      },
      switches: {
        type: Boolean,
        default: false
      },
      validated: {
        type: Boolean,
        default: false
      },
      buttonVariant: {
        type: String,
        default: 'primary'
      },
    },
    emits: ['input', 'change'],
    data() {
      return {
        selected: []
      }
    },
    created() {
        if (this.value) {
          this.selected = this.value
        }
    },
    watch:{
        value(val){
          this.selected = val
        },
    },
    methods: {
      input(event) {
        this.$emit('input', event)
      },
      change(event) {
        this.$emit('change', event)
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