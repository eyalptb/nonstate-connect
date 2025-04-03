
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

console.log('i18n module initialization started');

// Define a consistent logger for i18n events
const logI18n = (event, details = {}) => {
  console.log(`[i18n ${event}]`, { timestamp: new Date().toISOString(), ...details });
};

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
  }, (err, t) => {
    if (err) {
      logI18n('initialization-error', { error: err });
    } else {
      logI18n('initialized', { language: i18n.language, languages: i18n.languages });
    }
  });

// Log all i18n events
i18n.on('initialized', (options) => {
  logI18n('initialized-event', { options });
});

i18n.on('loaded', (loaded) => {
  logI18n('loaded', { resources: Object.keys(loaded) });
});

i18n.on('failedLoading', (lng, ns, msg) => {
  logI18n('loading-failed', { lng, ns, msg });
});

i18n.on('missingKey', (lng, ns, key, res) => {
  logI18n('missing-key', { lng, ns, key });
});

i18n.on('languageChanged', (lng) => {
  logI18n('language-changed', { lng, languages: i18n.languages, resources: i18n.store.data });
  // Update HTML lang attribute
  document.documentElement.lang = lng;
});

// Add a helper function to manually reload translations
export const reloadTranslations = async (language: string) => {
  logI18n('manual-reload-requested', { language });
  try {
    await i18n.reloadResources(language);
    logI18n('manual-reload-completed', { language });
    return true;
  } catch (error) {
    logI18n('manual-reload-failed', { language, error });
    return false;
  }
};

// Make the reloadTranslations function available globally for debugging
declare global {
  interface Window {
    reloadTranslations: typeof reloadTranslations;
    i18nDebug: {
      log: (message: string) => void;
      getStore: () => any;
      getLanguage: () => string;
      getLoadedNamespaces: () => string[];
    };
  }
}

// Add to window object only in browser environment
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18nDebug = {
    log: (message) => logI18n('debug', { message }),
    getStore: () => i18n.store.data,
    getLanguage: () => i18n.language,
    getLoadedNamespaces: () => i18n.reportNamespaces.getUsedNamespaces(),
  };
}

export default i18n;
