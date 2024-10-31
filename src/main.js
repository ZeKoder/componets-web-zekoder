import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// BootstrapVue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap as BootstrapVueNextPlugin } from 'bootstrap-vue-next'

// Vuetify (Can be lazy-loaded with vite-plugin-vuetify)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css' // There are more themes this is just an example

// Carbon Vue
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue';

app.use(BootstrapVueNextPlugin) // BootstrapVue
app.use(vuetify) // Vuetify
app.use(PrimeVue); // PrimeVue
app.use(CarbonComponentsVue); // Carbon Vue

app.mount('#app')

