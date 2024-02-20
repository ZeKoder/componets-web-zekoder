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
      <b-form-input
        ref="ZekBvInput"
        :id="id"
        :value="value"
       
        :placeholder="placeholder"
        :type="type"
        :min="min"
        :max="max"
        :step="step"
        :formatter="formatter"
        :state="error"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :name="name"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        v-bind="customProps"
        v-on="customEvents"
        @change="change"
        @input="input"
      ></b-form-input>
    </b-form-group>
  </div>
</template>
<script>
import { BFormGroup, BFormInput } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvInput',
  components: {
    BFormGroup,
    BFormInput
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
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    },
    step: {
      type: String,
      default: ''
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
  },
  emits: ['input', 'change'],
  // watch: {
  //   value(val) {
  //     this.getValue = val
  //   }
  // },
  // data() {
  //   return {
  //     getValue: ''
  //   }
  // },
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