<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-form-group
      :label="label"
      :label-for="id"
      :description="description"
      :valid-feedback="successMessage"
      :invalid-feedback="errorMessage"
      :state="error"
      :label-class="labelClass"
    >
      <template #label>
        <span>{{ label }}</span>
        <span v-if="required" class="required"></span>
        <i
          v-if="hint"
          class="input-hint-icon far fa-circle-question"
          v-b-tooltip.hover.top
          :title="hint"
          @click="hintClick"
        />
      </template>
      <b-input-group>
        <b-input-group-text
          v-if="icon || leadingComponent"
          :class="{ clickable: icon.includes('clickable') }"
        >
          <i v-if="icon" :class="icon" @click="iconClick"></i>
          <template v-if="leadingComponent" #default>
            <component v-if="leadingComponent" :is="leadingComponent" />
          </template>
          <component v-if="leadingComponent" :is="leadingComponent" />
        </b-input-group-text>
        <b-form-input
          ref="ZekBvInput"
          :id="id"
          v-model="modelValue"
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
          @keydown="onKeyDown"
          @keydown.enter.exact="onEnter"
          @update:modelValue="input"
        ></b-form-input>
        <b-input-group-text
          v-if="trailingIcon || trailingComponent"
          :class="{ clickable: trailingIcon.includes('clickable') }"
        >
          <i v-if="trailingIcon" :class="trailingIcon" @click="trailingIconClick"></i>
          <template v-if="trailingComponent" #default>
            <component :is="trailingComponent" />
          </template>
        </b-input-group-text>
      </b-input-group>
    </b-form-group>
  </div>
</template>
<script>
import { BFormGroup, BInputGroup, BInputGroupText, BFormInput } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvInput',
  components: {
    BFormGroup,
    BInputGroup,
    BInputGroupText,
    BFormInput
  },
  props: {
    value: {
      type: [String, Number],
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
      default: Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
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
    hint: {
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
    icon: {
      type: String,
      default: ''
    },
    trailingIcon: {
      type: String,
      default: ''
    },
    leadingComponent: {
      type: [String, Object],
      default: null
    },
    trailingComponent: {
      type: [String, Object],
      default: null
    }
  },
  emits: ['input', 'change', 'keydown', 'enter', 'hintClick', 'iconClick', 'trailingIconClick'],
  watch: {
    value(val) {
      this.modelValue = val
    }
  },
  data() {
    return {
      modelValue: ''
    }
  },
  created() {
    this.modelValue = this.value
  },
  methods: {
    input(event) {
      const value = this.type === 'number' ? Number(event) : event
      this.$emit('input', value)
      this.$emit('change', value)
    },
    onKeyDown(event) {
      this.$emit('keydown', event)
    },
    onEnter() {
      this.$emit('enter', this.modelValue, event)
    },
    hintClick(event) {
      this.$emit('hintClick', event)
    },
    iconClick(event) {
      this.$emit('iconClick', event)
    },
    trailingIconClick(event) {
      this.$emit('trailingIconClick', event)
    }
  }
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.show-hide-password {
  text-transform: uppercase;
  position: absolute;
  right: 0;
  font-size: 12px;
  line-height: 50px;
}

.input-hint-icon {
  color: #999;
  cursor: pointer;
  height: 100%;
  margin-left: 5px;
}

.clickable {
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
}
</style>
