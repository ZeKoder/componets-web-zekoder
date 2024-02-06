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
      <b-form-select
        ref="ZekBvSelect"
        :id="id"
        v-model="selected"
        :options="items"
        :value="value"
        :size="size"
        :state="error"
        :disabled="disabled"
        :multiple="multiple"
        :required="required"
        :name="name"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        :selectSize="listSize"
        v-bind="customProps"
        v-on="customEvents"
        @change="change"
        @input="input"
      ></b-form-select>
    </b-form-group>
  </div>
</template>

<script>
import { BFormSelect, BFormGroup } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvSelect',
  components: {
    BFormSelect,
    BFormGroup
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Object, Array],
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
    multiple: {
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
    listSize: {
      type: [String, Number],
      default: 0
    },
    customProps: {
      type: Object,
      default: () => ({})
    },
    customEvents: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['input', 'change'],
  data() {
    return {
      selected: null
    }
  },
  created() {
    if (this.value) {
      this.selected = this.value
    }
  },
  watch: {
    value(val) {
      this.selected = val
    }
  },
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
