<template>
  <div class="image-container">
    <a :href="link" @click.prevent="handleClick" class="image-anchor">
      <img
        v-if="!isLoading"
        :width="width"
        :height="height"
        :src="imgSrc"
        :alt="altText"
        @load="handleImageLoad"
        :style="imgStyle"
        v-bind="customProps"
        v-on="customEvents"
      />
      <div v-if="showLoading && isLoading" class="loading-overlay">Loading...</div>
    </a>
    <div v-if="showHoverText && !isLoading" class="hover-text">
      {{ altText }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    height: {
      type: Number,
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    imageUrl: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    secure: {
      type: Boolean,
      default: false
    },
    accessToken: {
      type: String,
      default: ''
    },
    showHoverText: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: true
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
    }
  },
  emits: ['onClick', 'onImageLoad'],
  data() {
    return {
      isLoading: false,
      imgStyle: {
        objectFit: this.objectFit,
        ...this.customStyle
      },
      imgSrc: this.imageUrl
    }
  },
  async created() {
    if (this.secure) {
      await this.fetchImageWithSecurity()
    }
  },
  methods: {
    handleClick() {
      this.$emit('onClick')
      if (this.link) {
        window.location.href = this.link
      }
    },
    async fetchImageWithSecurity() {
      this.isLoading = true
      const accessToken = this.accessToken || localStorage.getItem('accessToken')
      await axios
        .get(this.imageUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          responseType: 'blob'
        })
        .then((response) => {
          const reader = new FileReader()
          reader.readAsDataURL(response.data)
          reader.onload = () => {
            this.imgSrc = reader.result
            this.isLoading = false
          }
        })
        .catch((error) => {
          console.error('Error fetching image with security:', error)
          this.isLoading = false
        })
    },
    handleImageLoad() {
      this.isLoading = false
      this.$emit('onImageLoad')
    }
  }
}
</script>

<style>
.image-container {
  position: relative;
}
.image-anchor {
  text-decoration: none;
}
.loading-overlay {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-size: 18px;
  padding: 10px;
}

.hover-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 5px;
  font-size: 14px;
}
</style>
