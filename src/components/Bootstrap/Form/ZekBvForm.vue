<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-form
      ref="ZekBvForm"
      :id="id"
      :class="customClass"
      :style="customStyle"
      v-bind="customProps"
      v-on="customEvents"
      v-if="show"
      @submit.prevent="onSubmit"
    >
      <div class="row form-container">
        <template v-for="input in inputs" :key="input.id">
          <div :class="`col-${input.width ?? 12}`">
            <component
              :is="type[input.component]"
              :error="input.validation"
              :customClass="input.class"
              :value="formData[input.name]"
              :formID="id"
              v-bind="input"
              :key="resetKey"
              v-if="input.condition || true"
              @input="formData[input.name] = $event"
            ></component>
          </div>
        </template>
        <div class="row form-btn-container">
          <ZekBvButton
            v-bind="customButton"
            @click.prevent="onReset(customButton.action)"
          ></ZekBvButton>
          <ZekBvButton v-bind="submitButton"></ZekBvButton>
        </div>
      </div>
    </b-form>
  </div>
</template>
<script>
import { BForm } from 'bootstrap-vue-next'
import ZekBvInput from '../InputField/ZekBvInput.vue'
import ZekBvCheckbox from '../Checkbox/ZekBvCheckbox.vue'
import ZekBvButton from '../Button/ZekBvButton.vue'
import ZekBvRadio from '../RadioGroup/ZekBvRadio.vue'
import ZekBvSelect from '../Select/ZekBvSelect.vue'
import ZekBvTextarea from '../Textarea/ZekBvTextarea.vue'
import { ZekText } from '@zekoder/zekoder-web-components-common'

export default {
  name: 'ZekBvForm',
  components: {
    BForm,
    ZekBvInput,
    ZekBvCheckbox,
    ZekBvButton,
    ZekBvRadio,
    ZekBvSelect,
    ZekBvTextarea,
    ZekText
  },
  props: {
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    customProps: {
      type: Object,
      default: () => ({})
    },
    customEvents: {
      type: Object,
      default: () => ({})
    },
    inputs: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
    },
    show: {
      type: Boolean,
      default: true
    },
    submitButton: {
      type: Object,
      default: () => ({
        label: 'Submit',
        variant: 'primary',
        customClass: 'col-auto'
      })
    },
    customButton: {
      type: Object,
      default: () => ({
        label: 'reset',
        variant: 'danger',
        customClass: 'col-auto me-3',
        action: 'reset'
      })
    }
  },
  emits: ['submit', 'reset'],
  data() {
    return {
      type: {
        input: 'ZekBvInput',
        checkbox: 'ZekBvCheckbox',
        radio: 'ZekBvRadio',
        textarea: 'ZekBvTextarea',
        select: 'ZekBvSelect',
        label: 'ZekText'
      },
      formData: {},
      resetKey: 0,
      defaultData: {}
    }
  },
  created() {
    let obj = {}
    this.inputs.forEach((input) => {
      if (input.component != 'label' && input.value) {
        obj[input.name] = input.value
      }
    })
    this.formData = { ...obj }
    this.defaultData = { ...obj }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    onReset(action) {
      if (action == 'reset') {
        this.formData = { ...this.defaultData }
        this.resetKey++
        this.$emit('reset', this.formData)
      } else {
        this.$emit(action, this.formData)
      }
    }
  }
}
</script>
