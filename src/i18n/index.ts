
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next with essential configurations
i18n
  .use(HttpBackend) // Load translations via http (from public/locales/)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Initialize react-i18next
  .init({
    // Default language
    fallbackLng: 'en',
    
    // Default namespace
    defaultNS: 'common',
    
    // Supported languages
    supportedLngs: ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'],
    
    // Backend configuration to load translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      requestOptions: {
        cache: 'no-cache'
      }
    },
    
    // Allow keys to be phrases having `:`, `.` inside
    keySeparator: false,
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false, // Do not use suspense - simplifies usage
      bindI18n: 'languageChanged loaded', // Events that trigger a re-render
      bindI18nStore: 'added removed', // Store events that trigger a re-render
    }
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  
  // Reload resources for the current language
  i18n.reloadResources([lng], ['common', 'navigation', 'messaging', 'auth']);
});

// Add the reloadTranslations function for explicit control
export const reloadTranslations = async (language: string) => {
  try {
    await i18n.reloadResources(language, ['common', 'navigation', 'auth', 'messaging']);
    return true;
  } catch (error) {
    return false;
  }
};

// Make the reloadTranslations function available globally for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
}

export default i18n;
