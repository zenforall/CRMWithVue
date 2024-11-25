import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Stili di base Vuetify

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Crea un'istanza di Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);

app.mount('#app')
