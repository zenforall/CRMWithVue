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
import piniaPersistedstate from 'pinia-plugin-persistedstate';

import dayjs from 'dayjs'
import 'dayjs/locale/it' // Importa la lingua italiana per day.js

import i18n from './i18n'

// Crea un'istanza di Vuetify
const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  icons: {
    defaultSet: 'mdi', // Specifica il set di icone
  },
  locale: {
    locale:'it'
  },
  date : {
    locale: {
      it : 'it'
    }
  }
});

export { vuetify }; // rende utilizzabile l'oggetto da altre parti dell'applicazione

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPersistedstate);

app.use(pinia)
app.use(router)
app.use(vuetify);
app.use(i18n);
app.mount('#app')
