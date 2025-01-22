import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Stili di base Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Assicura il CSS per le icone
import 'vuetify/dist/vuetify.min.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { VDateInput } from 'vuetify/labs/VDateInput'
import { VDatePicker } from 'vuetify/components'

import dayjs from 'dayjs'
import 'dayjs/locale/it' // Importa la lingua italiana per day.js

// Crea un'istanza di Vuetify
const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
    VDatePicker
  },
  defaults: {
    VDatePicker: {
      locale: 'it',  // Imposta il locale del VDatePicker
    },
  },
  directives,
  icons: {
    defaultSet: 'mdi', // Specifica il set di icone
  },
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);
dayjs.locale('it') // Configura la lingua italiana

app.mount('#app')
