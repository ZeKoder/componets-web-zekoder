<template>
  <div class="position-relative" :class="customClass ? customClass + '-container' : ''">
    <b-form-group
      :description="description"
      :valid-feedback="successMessage"
      :invalid-feedback="errorMessage"
      :state="error"
    >
      <b-form-file
        ref="ZekBvFileUpload"
        :id="id"
        v-model="modelValue"
        :accept="accept"
        :size="size"
        :state="error"
        :disabled="disabled"
        :directory="allowFolders"
        :required="required"
        :name="name"
        :label="label"
        :label-class="labelClass + (required ? ' required' : '')"
        :class="customClass"
        :style="customStyle"
        :form="formID"
        :noDrop="disableDrop"
        :multiple="multiple"
        v-bind="customProps"
        v-on="customEvents"
        @update:modelValue="handleUpdate"
      ></b-form-file>
      <button v-if="modelValue && allowRemove" class="remove-file-btn" @click="removeFile"><i :class="removeIcon"></i></button>
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
    allowFolders: {
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
    disableDrop: {
      type: Boolean,
      default: false
    },
    allowRemove: {
      type: Boolean,
      default: false
    },
    removeIcon: {
      type: String,
      default: 'fa-solid fa-xmark'
    }

  },
  emits: ['update', 'remove'],
  data() {
    return {
      modelValue: null
    }
  },
  methods: {
    handleUpdate(files) {
      this.$emit('update', files)
    },
    removeFile() {
      this.modelValue = null
      this.$emit('remove')
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
.remove-file-btn {
  position: absolute;
  top: 35%;
  right: 0.5%;
}
</style>
