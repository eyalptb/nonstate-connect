
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
    // Debugging
    debug: true,
    
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
        // Custom headers for HTTP requests to backend
        cache: 'no-cache'
      }
    },
    
    // Allow keys to be phrases having `:`, `.` inside
    keySeparator: false,
    
    // Do not use keys as fallback - show actual keys for debugging
    saveMissing: true,
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false, // Do not use suspense - simplifies usage
    }
  });

// Add a helper function to manually trigger reloads when needed
export const reloadTranslations = async (language: string) => {
  console.log(`Manually reloading translations for: ${language}`);
  try {
    await i18n.reloadResources(language);
    console.log(`Translations reloaded for: ${language}`);
    return true;
  } catch (error) {
    console.error('Error reloading translations:', error);
    return false;
  }
};

// Make function globally available for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
}

// Add listener to detect missing translation files and log warnings
i18n.on('missingKey', (lng, ns, key) => {
  console.warn(`Missing translation - Language: ${lng}, Namespace: ${ns}, Key: ${key}`);
});

export default i18n;
