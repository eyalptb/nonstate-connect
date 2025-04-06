
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define the window interface to include reloadTranslations property
declare global {
  interface Window {
    reloadTranslations: (language: string) => Promise<boolean>;
  }
}

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
    
    // Debug mode for development - set to true to help troubleshoot
    debug: true,
    
    // Namespaces to load on init - ensuring all needed namespaces are here
    ns: ['common', 'navigation', 'auth', 'messaging', 'governance'],
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false, // Do not use suspense - simplifies usage
      bindI18n: 'languageChanged loaded', // Events that trigger a re-render
      bindI18nStore: 'added removed', // Store events that trigger a re-render
    },
    
    // Ensure resources are loaded before app starts
    initImmediate: false,
    
    // Load all namespaces by default
    load: 'all'
  });

// Add debug logging
i18n.on('initialized', () => {
  console.log('i18n initialized with language:', i18n.language);
  console.log('Available namespaces:', i18n.options.ns);
  console.log('Supported languages:', i18n.options.supportedLngs);
});

i18n.on('loaded', (loaded) => {
  console.log('i18n resources loaded:', loaded);
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  console.log(`Language changed to ${lng}, updating document.documentElement.lang`);
  
  // Log currently loaded resources for debugging
  const loadedResources = i18n.store?.data || {};
  console.log(`Loaded resources for ${lng}:`, loadedResources[lng]);
  
  // Reload resources for the current language
  i18n.reloadResources([lng], ['common', 'navigation', 'messaging', 'auth', 'governance'])
    .then(() => console.log(`Successfully reloaded resources for ${lng}`))
    .catch((error) => console.error(`Failed to reload resources for ${lng}:`, error));
});

// Add the reloadTranslations function for explicit control
export const reloadTranslations = async (language: string) => {
  try {
    await i18n.reloadResources(language, ['common', 'navigation', 'auth', 'messaging', 'governance']);
    console.log(`Successfully reloaded translations for ${language}`);
    return true;
  } catch (error) {
    console.error(`Failed to reload translations for ${language}:`, error);
    return false;
  }
};

// Make the reloadTranslations function available globally for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
}

export default i18n;
