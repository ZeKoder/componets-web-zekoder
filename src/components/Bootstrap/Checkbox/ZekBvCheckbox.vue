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
      <b-form-checkbox 
        v-if="isSingle"
        ref="ZekBvCheckbox"
        :id="id"
        :model-value="selected"
        :value="items[0].value"
        :unchecked-value="items[0].unchecked"
        :size="size"
        :state="error"
        :disabled="disabled"
        :required="required || selected?.length < required ? true : false"
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
        @update:model-value="input">
        <span :class="{'required': required}">{{ items[0].text }}</span>
      </b-form-checkbox>
      <b-form-checkbox-group
        v-else
        ref="ZekBvCheckbox"
        :id="id"
        :model-value="selected"
        :options="items"
        :size="size"
        :state="error"
        :disabled="disabled"
        :buttons="isButtons"
        :required="required || selected?.length < required"
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
        @update:model-value="input"
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
import { BFormCheckbox, BFormCheckboxGroup, BFormGroup } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvCheckbox',
  components: {
    BFormCheckbox,
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
    required: {
      type: [Number, Boolean],
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
      validator: (value) => ['buttons', 'plain', 'switches', 'default'].includes(value)
    }
  },
  emits: ['input'],
  data() {
    return {
      selected: null
    }
  },
  mounted() {
    this.selected = Array.isArray(this.value) || this.isSingle ? this.value : [this.value]
    this.input(this.selected)
  },
  methods: {
    input(val) {
        this.selected = val
        if (this.isSingle) {
            this.$emit('input', val)
            return;
        }
        this.$emit('input', val)
    }
  },
  computed: {
    isSingle() {
      return this.items.length === 1;
    },
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
      this.selected = Array.isArray(val) || this.isSingle ? val : [val]
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
