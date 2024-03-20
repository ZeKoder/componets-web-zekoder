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
      @reset.prevent="onReset"
    >
      <div class="row">
        <template v-for="input in inputs" :key="input.id">
          <div :class="`col-${input.width ?? 12}`">
            <component
              :is="type[input.component]"
              :error="input.validation"
              :customClass="input.class"
              :value="formData.name"
              :formID="id"
              v-bind="input"
              :key="key"
              v-if="input.condition || true"
              @input="formData[input.name] = $event"
            ></component>
            <!-- <ZekBvInput
              v-if="input.component == 'input'"
              :error="input.validation"
              :customClass="input.class"
              :formID="id"
              v-bind="input"
              :value="input.value"
              @input="formData[input.name] = $event"
            ></ZekBvInput>
            <ZekBvText
              v-if="input.component == 'label'"
              :text="input.label"
              v-bind="input"
            ></ZekBvText>
            <ZekBvSelect
              v-if="input.component == 'select'"
              :error="input.validation"
              :customClass="input.class"
              :formID="id"
              v-bind="input"
              @input="formData[input.name] = $event"
            ></ZekBvSelect>
            <ZekBvCheckbox
              v-if="input.component == 'checkbox'"
              :error="input.validation"
              :customClass="input.class"
              :formID="id"
              v-bind="input"
              @input="formData[input.name] = $event"
            ></ZekBvCheckbox>
            <ZekBvRadio
              v-if="input.component == 'radio'"
              :error="input.validation"
              :customClass="input.class"
              :formID="id"
              v-bind="input"
              @input="formData[input.name] = $event"
            ></ZekBvRadio>
            <ZekBvTextarea
              v-if="input.component == 'textarea'"
              :error="input.validation"
              :customClass="input.class"
              :formID="id"
              v-bind="input"
              @input="formData[input.name] = $event"
            ></ZekBvTextarea> -->
          </div>
        </template>
        <ZekBvButton label="Reset" type="reset" variant="danger" @click="onReset"></ZekBvButton>
        <ZekBvButton label="Submit" type="submit" variant="primary" @click="onSubmit"></ZekBvButton>
        <!-- <div :class="`col-${button.width ?? 6}`" v-for="button in buttons" :key="button.id">
          <ZekBvButton :label="button.label" :type="button.type" :variant="button.variant" v-bind="button" @click=" onReset "></ZekBvButton>
        </div> -->
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
import ZekBvText from '../../Common/Text/ZekBvText.vue'
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
    ZekBvText
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
    buttons: {
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
        label: 'ZekBvText'
      },
      formData: {
        get() {
          let obj = {}
          this.inputs.forEach((input) => {
            if (input.component != 'label') {
              obj[input.name] = input.value
            }
          })
          return { ...obj }
        },
        set() {}
      },
      key: 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    onReset() {
      this.$emit('reset', this.formData)
      this.formData = {}
      this.key++
    }
  }
}
</script>
