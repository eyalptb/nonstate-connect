
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define our supported languages and their native names
export const languages = {
  en: { name: 'English', nativeName: 'English' },
  zh: { name: 'Chinese', nativeName: '中文' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  fr: { name: 'French', nativeName: 'Français' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
  bn: { name: 'Bengali', nativeName: 'বাংলা' },
  pt: { name: 'Portuguese', nativeName: 'Português' },
  ru: { name: 'Russian', nativeName: 'Русский' },
  de: { name: 'German', nativeName: 'Deutsch' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  he: { name: 'Hebrew', nativeName: 'עברית' },
};

// Initialize i18next with minimal synchronous configuration
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    
    // Load translations from public/locales folder
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Namespace for translations
    ns: ['common', 'auth', 'navigation'],
    defaultNS: 'common',
    
    // Supported languages
    supportedLngs: Object.keys(languages),
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    }
  });

// Add debug logging for language changes
i18n.on('languageChanged', (lng) => {
  console.log(`Language changed to: ${lng}`);
  document.documentElement.lang = lng; // Update HTML lang attribute
  document.documentElement.dir = ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr'; // Handle RTL languages
});

export default i18n;
