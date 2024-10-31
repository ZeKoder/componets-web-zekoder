// BootstrapVue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { createBootstrap as BootstrapVueNextPlugin } from 'bootstrap-vue-next'

// Vuetify (Can be lazy-loaded with vite-plugin-vuetify)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const Vuetify = createVuetify({
  components,
  directives,
})

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css' // There are more themes this is just an example

// Carbon Vue
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue';

// Bind plugins to the app
import { setup } from "@storybook/vue3"
setup((app) => {
  app.use(BootstrapVueNextPlugin({ components: false, directives: true})); // BootstrapVue
  app.use(Vuetify); // Vuetify
  app.use(PrimeVue); // PrimeVue
  app.use(CarbonComponentsVue); // Carbon Vue
})

import DocumentationTemplate from './DocumentationTemplate.mdx';

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'Dimmed',
      values: [
        { name: 'Dimmed', value: '#eeeceb'},
        { name: 'Light', value: '#ffffff' },
        { name: 'Dark', value: '#000000' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      page: DocumentationTemplate,
    },
  }
}



export default preview
