import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import it from "./locales/it.json";

const i18n = createI18n({
  legacy: false, // Vue 3 Composition API
  locale: "it",
  fallbackLocale: "it",
  messages: {
    en,
    it,
  },
});

export function setLanguage(locale: "it" | "en") {
  i18n.global.locale.value = locale; // Metodo corretto per aggiornare il valore
}

export default i18n;
