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
import { VCalendar } from 'vuetify/labs/VCalendar'

import piniaPersistedstate from 'pinia-plugin-persistedstate';

//import dayjs from 'dayjs'
import 'dayjs/locale/it' // Importa la lingua italiana per day.js
import i18n from './i18n'

const myCustomTheme = {
  dark: false, // Imposta true se vuoi una modalità scura
  colors: {
    primary: '#000000',
    secondary: '#607D8B',
    accent: '#FF3B30',
    background: '#FFFFFF',
    surface: '#f9f9f9',
    error: '#D32F2F',
    success: '#4CAF50',
    warning: '#FBC02D',
    info: '#42A5F5',
    text: '#212121',
    textSecondary: '#757575',
  }
}

// Crea un'istanza di Vuetify
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme
    }
  },
  components: {
    ...components,
    VDateInput,
    VCalendar
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
