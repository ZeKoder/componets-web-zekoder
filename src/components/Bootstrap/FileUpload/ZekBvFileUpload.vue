<template>
  <div :class="customClass ? customClass + '-container' : ''">
    <b-form-group
      :description="description"
      :valid-feedback="successMessage"
      :invalid-feedback="errorMessage"
      :state="error"
    >
      <b-form-file
        ref="ZekBvFileUpload"
        :id="id"
        :accept="accept"
        :size="size"
        :state="error"
        :disabled="disabled"
        :directory="directory"
        :required="required"
        :name="name"
        :label="label"
        :label-class="labelClass + (required ? ' required' : '')"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        :noDrop="noDrop"
        :multiple="multiple"
        v-bind="customProps"
        v-on="customEvents"
        @change="change"
      ></b-form-file>
    </b-form-group>
  </div>
</template>
<script>
import { BFormGroup, BFormFile } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvFileUpload',
  components: {
    BFormGroup,
    BFormFile
  },
  props: {
    accept: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
    },
    error: {
      type: Boolean,
      default: null
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
    directory: {
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
    customProps: {
      type: Object,
      default: () => ({})
    },
    customEvents: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  methods: {
    change(event) {
      const files = event.target.files
      console.log(files)
      this.$emit('change', files)
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
