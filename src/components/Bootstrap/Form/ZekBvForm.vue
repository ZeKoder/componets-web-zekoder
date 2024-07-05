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
      <div class="row form-container" :key="currentStep">
        <template v-for="input in currentInputs" :key="input.id">
          <div
            :class="`pb-2 col-${input.width ?? 12}`"
            v-show="!allowSteps || (allowSteps && stepCount > 0 && input.step == currentStep)"
          >
            <component v-if="input.type == 'custom' && input.component" :class="input.class" :is="input.component" v-bind="input.data || {}" v-on="input.events || {}" />
            <component
              :is="type[input.component ?? 'input']"
              :error="input.validation"
              :customClass="input.class"
              :value="formData[input.name]"
              :formID="id"
              v-bind="input"
              :key="resetKey"
              v-else-if="input.condition ?? true"
              @input="formData[input.name] = $event"
            />
          </div>
        </template>
        <BFormInvalidFeedback class="col-12 mt-0 mb-3" :state="validation">
          {{ errorMessage }}
        </BFormInvalidFeedback>
        <BFormValidFeedback class="col-12 mt-0 mb-3" :state="validation">
          {{ successMessage }}
        </BFormValidFeedback>
        <div class="row mx-auto form-btn-container">
          <ZekBvButton
            v-if="allowSteps && currentStep > 1 && currentStep <= stepCount"
            v-bind="backButton"
            @click.prevent="onStep(false)"
          ></ZekBvButton>
          <ZekBvButton
            v-bind="customButton"
            v-if="!allowSteps && customButton.label"
            @click.prevent="onReset(customButton.action)"
          ></ZekBvButton>
          <ZekBvButton
            v-bind="currentStep >= stepCount ? submitButton : nextButton"
          >
          </ZekBvButton>
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
import ZekBvFileUpload from '../FileUpload/ZekBvFileUpload.vue'
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
    ZekBvFileUpload,
    ZekText
  },
  props: {
    allowSteps: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: () => ({})
    },
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
    nextButton: {
      type: Object,
      default: () => ({
        label: 'Next',
        variant: 'primary',
        customClass: 'col-auto'
      })
    },
    backButton: {
      type: Object,
      default: () => ({
        label: 'Back',
        variant: 'primary',
        customClass: 'col-auto'
      })
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
  emits: ['submit', 'reset', 'error', 'step', 'update'],
  data() {
    return {
      type: {
        input: 'ZekBvInput',
        checkbox: 'ZekBvCheckbox',
        radio: 'ZekBvRadio',
        textarea: 'ZekBvTextarea',
        select: 'ZekBvSelect',
        label: 'ZekText',
        upload: 'ZekBvFileUpload'
      },
      formData: {},
      resetKey: 0,
      defaultData: {},
      allValid: true,
      stepCount: 0,
      currentStep: 1
    }
  },
  async created() {
    await this.init()
  },
  computed: {
    currentInputs() {
      return this.allowSteps ? this.inputs.filter((input) => input.step == this.currentStep) : this.inputs
    }
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
        this.$emit('update', this.formData)
      },
      deep: true
    }
  },
  methods: {
    async init() {
      let obj = {}
      const excludedComponents = ['label', 'custom', 'html']
      this.inputs.forEach((input) => {
        // ? Retrieve saved data from localStorage
        if (localStorage.getItem(input.save)) {
          input.value = localStorage.getItem(input.save)
        }

        // NOTE: Get step count
        if (input.step) {
          this.stepCount = input.step > this.stepCount ? input.step : this.stepCount
        }

        // NOTE: Form Level - Set default values for form
        if (this.initialData[input.name]) {
          input.value = this.initialData[input.name]
          obj = { ...this.initialData }
        }

        //NOTE: Input Level - Set default values for inputs
        if (!excludedComponents.includes(input.component) && input.value) {
          obj[input.name] = input.value
        }
      })
      // Set form data
      this.formData = { ...obj }
      this.defaultData = { ...obj }
    },
    onStep(forward) {
      if (forward && this.currentStep < this.stepCount) {
        this.currentStep++
      } else if (!forward && this.currentStep > 1) {
        this.currentStep--
      }
      this.$emit('step', this.formData, this.currentStep)
    },
    checkSpecialFields(val) {
      let check = true
      this.inputs.forEach((input) => {
        if (input?.save) {
          localStorage.setItem(input.save, val[input.name])
        }
        if (input?.match) {
          if (val[input.name] !== val[input.match]) {
            const matchedInput = this.inputs.find((i) => i.name === input.match)
            const matchLabel = matchedInput?.label || matchedInput?.name
            const label = input?.label || input?.name
            const error = {
              input: input.name,
              description: `${label} does not match ${matchLabel}`
            }
            console.error(error)
            this.$emit('error', error)
            check = false
          }
        }
        if (input?.exclude) {
          delete val[input.name]
        }
      })
      return check
    },
    async uploadFiles(formData) {
      for (const input of this.inputs) {
        if (input.component == 'upload' && input.uploadUrl && formData[input.name]) {
          const files = Array.from(formData[input.name].target.files)
          for (const file of files) {
            const formData = new FormData()
            formData.append('file', file)
            let headers = {}
            if (input.accessToken) {
              headers = {
                Authorization: input.accessToken
              }
            }
            const response = await fetch(input.uploadUrl, {
              method: 'POST',
              body: formData,
              headers: headers
            })
            const data = await response.json()
            this.formData[input.name] = data.id
          }
        }
      }
    },
    async onSubmit() {
      if(this.currentStep < this.stepCount) {
        this.onStep(true)
        return;
      }
      if (!this.checkSpecialFields(this.formData)) return
      await this.uploadFiles(this.formData)
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
