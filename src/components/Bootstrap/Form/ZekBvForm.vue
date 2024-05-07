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
      :key="resetKey"
      @submit.prevent="onSubmit"
      :novalidate="false"     
      :validated="validate"
    >
    <!-- //FIXME - fix validation to hide native browser validtion styles -->
      <div class="row form-container">
        <template v-for="input in inputs" :key="input.id">
          <div :class="`pb-2 col-${input.width ?? 12}`">
            <div v-if="input.component == 'custom'" :class="input.class" v-html="input.html" />
            <component
              :is="type[input.component ?? 'input']"
              :error="input.validation"
              :customClass="input.class"
              :value="formData[input.name]"
              :formID="id"
              v-bind="input"
              :key="resetKey"
              v-else-if="input.condition || true"
              @input="formData[input.name] = $event"
            >
          </component>
          </div>
        </template>
        <BFormInvalidFeedback class="col-12 mt-0 mb-3" :state="validation"> {{ errorMessage }} </BFormInvalidFeedback>
        <BFormValidFeedback class="col-12 mt-0 mb-3" :state="validation"> {{successMessage}} </BFormValidFeedback>
        <div class="row mx-auto form-btn-container">
          <ZekBvButton
            v-bind="customButton"
            v-if="customButton.label"
            @click.prevent="onReset(customButton.action)"
          ></ZekBvButton>
          <ZekBvButton v-bind="submitButton"></ZekBvButton>
        </div>
      </div>
    </b-form>
  </div>
</template>
<script>
import { BForm, BFormInvalidFeedback, BFormValidFeedback } from 'bootstrap-vue-next'
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
    BFormInvalidFeedback,
    BFormValidFeedback,
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
    validate: {
      type: Boolean,
      default: false
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
      default: () => ({})
    },
    validation: {
      type: [String, Boolean],
      default: undefined
    },
    successMessage: {
      type: String,
      default: 'Submission successful!'
    },
    errorMessage: {
      type: String,
      default: 'Submission failed! Please try again. If the problem persists, contact support.'
    }
  },
  emits: ['submit', 'reset', 'error'],
  data() {
    return {
      type: {
        input: 'ZekBvInput',
        checkbox: 'ZekBvCheckbox',
        radio: 'ZekBvRadio',
        textarea: 'ZekBvTextarea',
        select: 'ZekBvSelect',
        label: 'ZekText',
      },
      formData: {},
      resetKey: 0,
      defaultData: {},
      allValid: true
    }
  },
  created() {
    let obj = {}
    this.inputs.forEach((input) => {
      if (localStorage.getItem(input.save)) {
        input.value = localStorage.getItem(input.save)
      }
      if (input.component != 'label' && input.value) {
        obj[input.name] = input.value
      }
    })
    this.formData = { ...obj }
    this.defaultData = { ...obj }
  },
  watch: {
    formData: {
      handler(val) {
        if (this.validate) {
          this.inputs.forEach((input) => {
            if (input.type !== 'email' || input.type !== 'url') {
              input.requireValid = input.required && !val[input.name] ? false : true
            }
            if (!input.requireValid) {
              this.allValid = false
            } else {
              this.allValid = true
            }
          })
        }
      },
      deep: true
    },
  },
    methods: {
      checkSpecialFields(val) {
        let check = true;
        this.inputs.forEach((input) => {
          if (input?.save) {
            localStorage.setItem(input.save, val[input.name])
          }
          if (input?.match) {
            if (val[input.name] !== val[input.match]) {
              const matchedInput = this.inputs.find(i => i.name === input.match)
              const matchLabel = matchedInput?.label || matchedInput?.name
              const label = input?.label || input?.name
              const error = {
                input: input.name,
                description: `${label} does not match ${matchLabel}`
              }
              console.error(error)
              this.$emit("error", error);
              check = false
            }
          }
          if (input?.exclude) {
            delete val[input.name];
          }
        });
        return check;
      },
      onSubmit() {
        if (!this.checkSpecialFields(this.formData)) return;
        if (this.validate) {
          if (this.allValid) {
            this.$emit('submit', this.formData)
          }
        } else {
          this.$emit('submit', this.formData)
        }
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
