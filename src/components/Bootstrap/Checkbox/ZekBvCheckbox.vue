<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-form-group
      :label="label"
      :label-for="id"
      :description="description"
      :valid-feedback="successMessage"
      :invalid-feedback="errorMessage"
      :state="error"
      :label-class="labelClass + (numberOfRequiredChecks > 0 ? ' required' : '')"
    >
      <b-form-checkbox-group
        ref="ZekBvCheckbox"
        :id="id"
        v-model="selected"
        :options="items"
        :size="size"
        :state="error"
        :disabled="disabled"
        :buttons="isButtons"
        :required="selected.length < numberOfRequiredChecks"
        :name="name"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        v-bind="customProps"
        v-on="customEvents"
        :button-variant="buttonVariant"
        :plain="isPlain"
        :stacked="stacked"
        :switches="isSwitches"
        :validated="valid"
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
      type: [Array, String, Number, Boolean],
      default: () => []
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
    numberOfRequiredChecks: {
      type: Number,
      default: 0
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
      validator: (value) => ['buttons', 'plain', 'switches', 'default'].includes(value)
    }
  },
  emits: ['input'],
  data() {
    return {
      selected: []
    }
  },
  mounted() {
    const validOptions = this.items.map((item) => item.value)
    // if the value is not in the options, remove it
    this.selected = this.value.filter((item) => validOptions.includes(item))
  },
  computed: {
    isButtons() {
      return this.type === 'buttons'
    },
    isPlain() {
      return this.type === 'plain'
    },
    isSwitches() {
      return this.type === 'switches'
    }
  },
  watch: {
    value(val) {
      this.selected = val
    },
    selected(val) {
        if (this.items.length === 1) {
            this.$emit('input', val[0])
            return
        }
        this.$emit('input', val)
    }
  },
}
</script>
<style>
.required::after {
  content: '*';
  color: red;
  margin-left: 4px;
}
</style>
