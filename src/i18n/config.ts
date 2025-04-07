
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configure and initialize i18n with our base configuration
const initializeI18n = () => {
  i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      defaultNS: 'common',
      supportedLngs: ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        requestOptions: {
          cache: 'no-store',
          credentials: 'same-origin',
          mode: 'cors'
        }
      },
      keySeparator: false,
      debug: true,
      ns: ['common', 'navigation', 'auth', 'messaging', 'governance'],
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        transEmptyNodeValue: ''
      },
      initImmediate: false,
      load: 'all',
      nsSeparator: ':',
      fallbackNS: 'common'
    });

  return i18n;
};

export default initializeI18n;
