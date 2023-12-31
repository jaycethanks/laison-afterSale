import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const languages = {
  en: {},
};
const messages = Object.assign(languages);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
