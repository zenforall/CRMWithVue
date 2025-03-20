//import './assets/main.css'
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
    primary: '#00A76F',  // Verde Smeraldo
    secondary: '#E38B29', // Arancione Vivace
    accent:  '#FF6B35',//'#FFD700', // Giallo Oro
    background: '#F4F8F6', // Verde Acqua Chiaro
    surface: '#FFFFFF', // Bianco Puro
    error: '#E63946', // Rosso Corallo
    success: '#2ECC71', // Verde Menta
    warning: '#F39C12', // Giallo Caldo
    info: '#3498DB', // Azzurro Brillante
    text: '#2C3E50', // Grigio Blu
    darkAccent: '#B84E24'
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
