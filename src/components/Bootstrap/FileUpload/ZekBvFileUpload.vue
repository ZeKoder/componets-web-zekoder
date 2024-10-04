<template>
  <div class="position-relative" :class="customClass ? customClass + '-container' : ''" :key="refreshKey">
    <b-form-group :description="description" :state="error">
      <b-form-file ref="ZekBvFileUpload" :id="id" v-model="files" :accept="accept" :size="size" :state="error"
        :disabled="disabled" :directory="allowFolders" :required="required" :name="name"
        :label-class="labelClass + (required ? ' required' : '')" :class="customClass" :style="customStyle"
        :form="formID" :noDrop="disableDrop" :multiple="multiple" v-bind="customProps" v-on="customEvents"
        @update:modelValue="handleUpdate">
        <template #label>
          <label :for="id">{{ label }}</label>
          <div v-if="allowPreview" class="file-preview" @click.prevent="onPreviewClick">
            <div v-if="loading" class="loading">Loading preview...</div>
            <div v-for="(file, index) in files" :key="index" class="file-preview-item">
              <img v-if="isImage(file)" :src="fileUrls[index]" :class="imagePreviewClass" alt="File Preview"
                class="img-preview" @click="handlePreviewClick" />
              <div v-else class="file-details">
                <p>{{ file?.name || "Couldn't Fetch File" }}</p>
                <p v-if="file?.size">{{ formatSize(file?.size) }}</p>
              </div>
              <button v-if="allowRemove" class="remove-file-btn" @click.prevent="removeFile(index)">
                <i :class="removeIcon"></i>
              </button>
            </div>
          </div>
        </template>
      </b-form-file>
    </b-form-group>
  </div>
</template>

<script>
import axios from 'axios'
import { BFormGroup, BFormFile } from 'bootstrap-vue-next'
export default {
  name: 'ZekBvFileUpload',
  components: {
    BFormGroup,
    BFormFile
  },
  props: {
    value: {
      type: [Array, String, File],
      default: null
    },
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
    },
    secure: {
      type: Boolean,
      default: false
    },
    accessToken: {
      type: String,
      default: ''
    },
    fetchUrl: {
      type: String,
      default: ''
    },
    allowPreview: {
      type: Boolean,
      default: false
    },
    imagePreviewClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update', 'remove', 'preview'],
  async created() {
    this.files = await this.handleFiles(this.value)
    this.fileUrls = this.files.map(file => this.isImage(file) ? URL.createObjectURL(file) : '');
  },
  data() {
    return {
      files: [],
      refreshKey: 0,
      fileUrls: [],
      loading: false,
      errorMessage: ''
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.handleFiles(newVal).then(files => {
          this.files = files;
          this.fileUrls = files.map(file => this.isImage(file) ? URL.createObjectURL(file) : '');
        });
      } else {
        this.files = [];
        this.fileUrls = [];
      }
    }
  },
  methods: {
    async handleFiles(files) {
      if (!files) return [];
      if (Array.isArray(files)) {
        return await Promise.all(files.map(async file => {
          if (typeof file === 'string') {
            if (this.isUrl(file)) {
              return await this.getFile(file) // get file from url
            } else if (this.fetchUrl) {
              return await this.getFile(this.fetchUrl + file) // get file from fetch url
            } else {
              console.error('Invalid file path provided for asset');
              return file
            }
          } else {
            return file
          }
        }))
      } else if (typeof files === 'string') {
        return [await this.getFile(files)]
      } else {
        return [files]
      }
    },
    async getFile(image) {
      this.loading = true;
      const headers = {};
      const accessToken = this.accessToken || 'Bearer ' + localStorage.getItem('accessToken') || null;
      if (this.secure && accessToken) {
        headers['Authorization'] = accessToken;
      } else if (this.secure && !accessToken) {
        console.error('No access token provided for asset');
        this.errorMessage = 'No access token provided for asset';
        this.loading = false;
        return;
      }
      try {
        const res = await axios({
          method: 'get',
          url: image,
          headers,
          responseType: 'blob'
        });
        const fileName = this.isUrl(image) ? image.split('/').pop() : image;
        const file = new File([res.data], fileName, {
          type: res.data.type
        });
        return file;
      } catch (err) {
        console.error(err);
        this.errorMessage = 'Failed to fetch the file';
      } finally {
        this.loading = false;
      }
    },
    isUrl(text) {
      // check if text is a url using regex
      const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      return urlRegex.test(text);
    },
    isImage(file) {
      return file?.type?.startsWith('image/');
    },
    formatSize(size) {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    handleUpdate(files) {
      this.$emit('update', files)
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.fileUrls.splice(index, 1);
      this.$emit('remove', index);
    },
    handlePreviewClick() {
      this.$emit('preview', this.files);
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
  content: '*';
  color: red;
  margin-left: 4px;
}

.remove-file-btn {
  position: absolute;
  top: 0.75em;
  right: 1em;
  z-index: 1;
  aspect-ratio: 1;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
    background-color: #c0c0c0;
    border-radius: 50%;
  }
}

:deep(.form-label) {
  width: 100%;
}

.file-preview {
  margin-top: 10px;
  cursor: pointer;
}

.file-preview-item {
  position: relative;
  margin-bottom: 10px;
}

.img-preview {
  max-width: 100%;
  height: auto;
}

.file-details {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.file-details p {
  margin: 0;
}

.loading {
  text-align: center;
  margin-top: 10px;

}

.placeholder {
  text-align: center;
  margin-top: 10px;
}
</style>
