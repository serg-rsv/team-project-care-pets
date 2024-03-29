import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getInitialLanguage } from '../helpers/getInitialLanguage';
import en from './locales/en.json';
import uk from './locales/uk.json';

const resources = {
  en: { common: en },
  uk: { common: uk },
};

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
