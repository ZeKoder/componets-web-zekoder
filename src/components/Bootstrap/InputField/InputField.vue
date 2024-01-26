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
      <b-form-input
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :type="type"
        :min="min"
        :max="max"
        :step="step"
        :size="size"
        :formatter="formatter"
        :state="error"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :name="name"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        @change="change"
        @input="input"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'ZekInputField',
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
      default: ''
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
    formID: {
      type: String,
      default: ''
    }
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
