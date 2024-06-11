<template>
  <slot :apiRes="response" :apiLoad="loading" :apiErr="error" v-bind="mappedData"> </slot>
</template>

<script>
// FIXME: Features to be added
// 1. Implement functionality to handle different types of requests like POST, PUT, DELETE
// 2. Implement Loading and Error handling
// 3. Implement in `ZekContainer` to handle the API calls

import axios from 'axios'
  export default {
    name: 'ZekApi',
    props: {
      url: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'GET'
      },
      secure: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: () => ({})
      },
      headers: {
        type: Object,
        default: () => ({})
      },
      map: {
        type: Object,
        default: () => ({})
      },
      onSuccess: {
        type: Function,
        default: () => {}
      },
      onError: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        loading: false,
        error: null,
        response: null,
        mappedData: null
      }
    },
    methods: {
      async fetchData() {
        this.loading = true
        let specialHeaders = {}
        if (this.secure) {
          const token = localStorage.getItem('accessToken')
          specialHeaders = {
            Authorization: `Bearer ${token}`,
            ...specialHeaders
          }
        }
        try {
          const response = await axios({
            method: this.method,
            url: this.url,
            data: this.data,
            headers: {
              ...specialHeaders,
              ...this.headers}
          })
          this.processSuccess(response)
        } catch (error) {
          this.processError(error)
        } finally {
          this.loading = false
        }
      },
      mapData() {
        const data = {}
        Object.keys(this.map).forEach(key => {
          data[key] = this.response.data[this.map[key]]
        })
        return data
      },
      processSuccess(response) {
        this.response = response
        this.mappedData = this.mapData()
        this.onSuccess(response)
      },
      processError(error) {
        this.error = error
        this.onError(error)
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style lang="sass" scoped>

</style>