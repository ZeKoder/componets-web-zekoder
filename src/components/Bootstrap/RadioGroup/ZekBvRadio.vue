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
        <b-form-radio-group
          ref="ZekBvRadio"
          :id="id"
          v-model="selected"
          :options="items"
          :value="value"
          :size="size"
          :state="error"
          :disabled="disabled"
          :buttons="isButtons"
          :required="required"
          :name="name"
          :class="customClass"
          :style="customStyle"
          :form="formID"
          v-bind="customProps"
          v-on="customEvents"
          :button-variant="buttonVariant"
          :plain="isPlain"
          :stacked="stacked"
          :validated="valid"
          @update:modelValue="change"
        ></b-form-radio-group>
      </b-form-group>
    </div>
  </template>
  
  <script>
  import { BFormRadioGroup, BFormGroup } from 'bootstrap-vue-next'
  export default {
    name: 'ZekBvRadio',
    components: {
        BFormRadioGroup,
      BFormGroup
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      value: {
        type: [String, Boolean, Array, Number],
        default: ''
      },
      id: {
        type: String,
        default: Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')
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
      stacked: {
        type: Boolean,
        default: false
      },
      valid: {
        type: Boolean,
        default: false
      },
      buttonVariant: {
        type: String,
        default: 'primary'
      },
      type: {
        type: String,
        default: 'default',
        validator: (value) => ['buttons', 'plain', 'default'].includes(value)
      }
    },
    emits: ['change'],
    data() {
      return {
        selected: this.value
      }
    },
    computed: {
      isButtons() {
        return this.type === 'buttons'
      },
      isPlain() {
        return this.type === 'plain'
      }
    },
    watch: {
      value(val) {
        this.selected = val
      }
    },
    methods: {
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