<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-form
      ref="ZekBvForm"
      :id="id"
      :class="customClass"
      :style="customStyle"
      v-bind="customProps"
      v-on="customEvents"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <div class="row">
        <template v-for="input in inputs" :key="input.id">
          <div :class="`col-${input.width ?? 12}`">
            <!-- <component
              :is="type[input.component]"
              :name="input.name"
              :error="input.validation"
              :value="input.value"
              :customClass="input.class"
              :required="input.required"
              :label="input.label"
              :formID="id"
              :type="input?.type"
              v-bind="input"
              v-if="input.condition"
            ></component> -->
            <ZekBvInput
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
            ></ZekBvTextarea>
          </div>
        </template>
        <div :class="`col-${button.width ?? 6}`" v-for="button in buttons" :key="button.id">
          <ZekBvButton :label="button.label" :type="button.type" v-bind="button"></ZekBvButton>
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
    }
  },
  emits: ['submit', 'reset'],
  data() {
    return {
      // type: {
      //   input: 'ZekBvInput',
      //   checkbox: 'ZekBvCheckbox',
      //   radio: 'ZekBvRadio',
      //   textarea: 'ZekBvTextarea',
      //   select: 'ZekBvSelect'
      // }
      formData: {
        get() {
          let obj = {}
          this.inputs.forEach((input) => {
            if (input.component != 'label') {
              obj[input.name] = input.value
            }
          })
          console.log(obj)
          return { ...obj }
        },
        set() {}
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.formData)
    },
    onReset() {
      this.$emit('reset', this.formData)
      this.formData = {}
    }
  }
}
</script>
