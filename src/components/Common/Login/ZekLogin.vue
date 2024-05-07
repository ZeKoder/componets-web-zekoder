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
    :customClass="`zek-login ${customClass}`"
    :inputs="inputs"
    :submitButton="submitButton ?? undefined"
    :validation="validation"
    :errorMessage="customError ?? error"
    @submit="login"
  />
</template>

<script>
import { ZekBvForm } from '@zekoder/zekoder-web-components-bootstrap'
import auth0 from 'auth0-js'
import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'ZekLogin',
  components: {
    ZekBvForm
  },
  emits: ['beforeLogin', 'onLoginSuccess', 'onLoginError', 'onSocialClick'],
  props: {
    theme: {
      // Which theme to use, will be Bootstrap by default
      type: String,
      default: 'bootstrap'
    },
    customClass: String,
    email: Object,
    password: Object,
    showForgotLink: {
      type: Boolean,
      default: true
    },
    showRememberMe: {
      type: Boolean,
      default: true
    },
    rememberMe: Object,
    forgotPassword: String,
    loginButton: [String, Object],
    socialIcons: Array, // [{icon: '', image:'', label:''}]
    webAuthConfig: Object,
    firebaseConfig: Object,
    url: {
      type: String,
      required: true
    }, //login endpoint url
    redirectUrl: String,
    styleObj: Object,
    customError: String
  },
  created() {
    this.init()
    if (this.webAuthConfig) {
      this.webAuth = new auth0.WebAuth(this.webAuthConfig)
    } else if (this.firebaseConfig) {
      this.fireBase = initializeApp(this.firebaseConfig)
    }
  },
  data() {
    return {
      inputs: [
        {
          name: 'email',
          id: `email-${Date.now()}`,
          type: 'email',
          label: 'Email',
          save: 'login-email',
          placeholder: 'Email',
          required: true,
          customProps: {
            autocomplete: 'email'
          }
        },
        {
          name: 'password',
          id: `password-${Date.now()}`,
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          class: 'mt-2',
          required: true,
          customProps: {
            autocomplete: 'current-password'
          }
        }
      ],
      submitButton: undefined,
      validation: undefined,
      error: undefined
    }
  },
  methods: {
    init() {
      // Check if remember me is checked
      if (localStorage.getItem('rememberMe')) {
        this.inputs[0].value = localStorage.getItem('rememberMe')
      }
      // Handle Inputs
      if (this.email) {
        this.inputs[0] = this.email
      }
      if (this.password) {
        this.inputs[1] = this.password
      }
      // Handle Remember Me
      if (this.showRememberMe) {
        if (this.rememberMe) {
          this.inputs.push(this.rememberMe)
        } else {
          this.inputs.push({
            width: 6,
            class: 'py-1',
            component: 'checkbox',
            name: 'rememberMe',
            type: 'default',
            exclude: true,
            items: [{ text: 'Remember me', value: 'rememberMe' }]
          })
        }
      }
      // Handle Forgot Password
      if (this.showForgotLink) {
        if (this.forgotPassword) {
          this.inputs.push({
            width: 6,
            component: 'custom',
            html: this.forgotPassword
          })
        } else {
          this.inputs.push({
            width: 6,
            component: 'custom',
            type: 'custom',
            class: 'text-right py-2',
            html: "<a href='/forgot-password'> Forgot Password? </a>"
          })
        }
      }
      // Handle Login Button
      if (typeof this.loginButton === 'string') {
        this.submitButton = {
          label: this.loginButton,
          variant: 'primary',
          customClass: 'col-auto text-center mx-3'
        }
      } else {
        this.submitButton = this.loginButton
      }
    },
    handleSuccess(data) {
      this.validation = true
      this.$emit('onLoginSuccess', data)
      if (this.redirectUrl) {
        location.replace(this.redirectUrl)
      }
    },
    handleError(error) {
      this.validation = false
      this.$emit('onLoginError', error)
      const generic = 'There was a problem logging you in, please check your credentials. If the problem persists, please contact admin'
      this.error = error?.response?.data?.detail || error?.description || error?.error_description || generic
    },
    async login(data) {
      this.$emit('beforeLogin', data)
      if (!this.email?.error && !this.password?.error) {
        try {
          if (this.webAuth) {
            await this.auth0Login(data)
          } else if (this.fireBase) {
            await this.firebaseLogin(data)
          } else {
            await this.defaultLogin(data)
          }
        } catch (error) {
          this.handleError(error)
        }
      }
    },
    async firebaseLogin(data) {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, data['email'], data['password'])
      localStorage.setItem('userInfo', JSON.stringify(userCredential.user))
      localStorage.setItem('accessToken', userCredential.user.stsTokenManager.accessToken)
      this.handleSuccess(userCredential)
    },
    async defaultLogin(data) {
      const res = await axios.post(this.url, data)
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      localStorage.setItem('expirationTime', res.data.expirationTime)
      this.handleSuccess(res.data)
    },
    async auth0Login(data) {
      await this.webAuth.login(
        {
          realm: 'Username-Password-Authentication',
          username: data['email'],
          password: data['password']
        },
        (err, dat) => {
          if (err) {
            this.handleError(err)
          } else if (dat) {
            localStorage.setItem('userInfo', JSON.stringify(dat))
            this.handleSuccess(dat)
          }
        }
      )
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
