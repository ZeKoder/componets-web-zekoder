<template>
  <template v-if="socialIcons && socialIcons.length">
    <div class="social-login">
      <div
        class="social-icon"
        :class="social.label"
        v-for="(social, i) in socialIcons"
        :key="i"
        :title="social.label"
        :style="social.styleObj"
        @click.prevent="onSocialClick(social)"
      >
        <i v-if="social.icon" :class="social.icon"></i>
        <img v-else-if="social.image" :src="social.image" :alt="social.label" />
      </div>
    </div>
  </template>
  <ZekBvForm
    :customClass="`zek-signup ${customClass}`"
    :inputs="renderedInputs"
    :submitButton="submitButton ?? undefined"
    :validation="validation"
    :errorMessage="customError ?? error"
    :successMessage="customSuccess ?? success"
    @submit="signup"
    @error="handleError"
  />
</template>

<script>
import ZekBvForm from '../Form/ZekBvForm.vue'
import axios from 'axios'
export default {
  name: 'ZekSignup',
  components: {
    ZekBvForm
  },
  emits: ['beforeSignup', 'onSignupSuccess', 'onSignupError', 'onSocialClick'],
  props: {
    theme: {
      // Which theme to use, will be Bootstrap by default
      type: String,
      default: 'bootstrap'
    },
    customClass: String,
    inputs: Array,
    signupButton: [String, Object],
    socialIcons: Array, // [{icon: '', image:'', label:''}]
    url: {
      type: String,
      required: true
    }, //login endpoint url
    redirectUrl: String,
    styleObj: Object,
    customError: String,
    customSuccess: String,
    terms: {
      type: String,
      default:
        'Creating an account means you are okay with our Terms of Service, Privacy Policy, and our default Notification Settings.'
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      renderedInputs: [
        {
          name: 'first_name',
          type: 'short-text',
          customClass: 'first-name',
          placeholder: 'Please enter your first name',
          label: 'First Name',
          width: 6,
          required: true
        },
        {
          name: 'last_name',
          type: 'short-text',
          customClass: 'last-name',
          placeholder: 'Please enter your last name',
          label: 'Last Name',
          width: 6,
          required: true
        },
        {
          name: 'email',
          type: 'email',
          class: 'email',
          placeholder: 'Please enter your e-mail',
          label: 'E-mail',
          required: true
        },
        {
          name: 'password',
          type: 'password',
          class: 'password',
          placeholder: 'Please enter your password',
          label: 'Password',
          required: true
        },
        {
          name: 'confirm_password',
          type: 'password',
          class: 'password',
          placeholder: 'Please re-enter your password',
          label: 'Confirm Password',
          exclude: true,
          required: true,
          match: 'password'
        },
        {
          name: 'tnc',
          type: 'default',
          component: 'checkbox',
          class: 'tnc',
          exclude: true,
          numberOfRequiredChecks: 1,
          items: [{ text: this.terms, value: 'terms' }]
        }
      ],
      submitButton: undefined,
      validation: undefined,
      error: undefined,
      success: 'Signup successful!'
    }
  },
  methods: {
    init() {
      // Handle Inputs
      if (this.inputs?.length > 2) {
        this.renderedInputs = { ...this.inputs }
      }
      // Handle Signup Button
      if (typeof this.signupButton === 'string') {
        this.submitButton = {
          label: this.signupButton,
          variant: 'primary',
          customClass: 'col-auto text-center mx-3'
        }
      } else {
        this.submitButton = this.signupButton
      }
    },
    handleSuccess(data) {
      this.validation = true
      this.$emit('onSignupSuccess', data)
      if (this.redirectUrl) {
        location.replace(this.redirectUrl)
      }
    },
    handleError(error) {
      this.validation = false
      this.$emit('onSignupError', error)
      const generic =
        'There was a problem logging you in, please check your credentials. If the problem persists, please contact admin'
      this.error =
        error?.response?.data?.detail ||
        error?.description ||
        error?.error_description ||
        error ||
        generic
    },
    async signup(data) {
      this.$emit('beforeSignup', data)
      try {
        await this.defaultLogin(data)
      } catch (error) {
        this.handleError(error)
      }
    },
    async defaultLogin(data) {
      const res = await axios.post(this.url, data)
      this.handleSuccess(res.data)
    },
    onSocialClick(social) {
      if (social.url) {
        location.replace(social.url)
      }
      this.$emit('onSocialClick', social.label)
    }
  }
}
</script>

<style lang="scss" scoped></style>
