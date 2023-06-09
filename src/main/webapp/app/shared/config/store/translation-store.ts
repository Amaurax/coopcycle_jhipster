import { Module } from 'vuex';

export const translationStore: Module<any, any> = {
  state: {
    currentLanguage: localStorage.getItem('currentLanguage') || 'fr',
    languages: {
      en: { name: 'English' },
      fr: { name: 'Français' },
      de: { name: 'Deutsch' },
      ja: { name: '日本語' },
      ru: { name: 'Русский' },
      es: { name: 'Español' },
      // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    },
  },
  getters: {
    currentLanguage: state => state.currentLanguage,
    languages: state => state.languages,
  },
  mutations: {
    currentLanguage(state, newLanguage) {
      state.currentLanguage = newLanguage;
      localStorage.setItem('currentLanguage', newLanguage);
    },
  },
};
