
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { walletTranslations } from '@/utils/translations/walletTranslations';
import { featureTranslations } from '@/utils/translations/featureTranslations';
import { joinCtaTranslations } from '@/utils/translations/joinCtaTranslations';
import { projectTranslations } from '@/utils/translations/projectTranslations';
import { footerTranslations } from '@/utils/translations/footerTranslations';
import { backendTranslations } from '@/utils/translations/backendTranslations';

// Define the window interface to include reloadTranslations property
declare global {
  interface Window {
    reloadTranslations: (language: string) => Promise<boolean>;
    i18n: typeof i18n; // Make i18n available globally for debugging
  }
}

// Helper to add in-memory translations
const addInMemoryTranslations = (language: string) => {
  // Add wallet translations
  if (walletTranslations[language]) {
    i18n.addResourceBundle(language, 'common', walletTranslations[language], true, true);
  }
  
  // Add feature translations
  if (featureTranslations[language]) {
    i18n.addResourceBundle(language, 'common', featureTranslations[language], true, true);
  }
  
  // Add joinCta translations
  if (joinCtaTranslations[language]) {
    i18n.addResourceBundle(language, 'common', joinCtaTranslations[language], true, true);
  }
  
  // Add project translations
  if (projectTranslations[language]) {
    i18n.addResourceBundle(language, 'common', projectTranslations[language], true, true);
  }
  
  // Add footer translations
  if (footerTranslations[language]) {
    i18n.addResourceBundle(language, 'common', footerTranslations[language], true, true);
  }
  
  // Add backend translations
  if (backendTranslations[language]) {
    i18n.addResourceBundle(language, 'common', backendTranslations[language], true, true);
  }
};

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
        // Disable cache to ensure fresh translations during development
        cache: 'no-store',
        credentials: 'same-origin',
        mode: 'cors'
      }
    },
    
    // Allow keys to be phrases having `:`, `.` inside
    keySeparator: false,
    
    // Debug mode for development
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
      transEmptyNodeValue: '', // Use empty string for empty nodes
    },
    
    // Ensure resources are loaded before app starts
    initImmediate: false,
    
    // Load all namespaces by default
    load: 'all',
    
    // Don't use nested objects
    nsSeparator: ':',
    
    // Enable fallback to other languages
    fallbackNS: 'common'
  });

// Add debug logging
i18n.on('initialized', () => {
  console.log('i18n initialized with language:', i18n.language);
  console.log('Available namespaces:', i18n.options.ns);
  console.log('Supported languages:', i18n.options.supportedLngs);
  
  // Add in-memory translations for current language
  addInMemoryTranslations(i18n.language);
  
  // Log the loaded resources for the current language
  const currentResources = i18n.getResourceBundle(i18n.language, 'common');
  console.log(`Initial resources for ${i18n.language}:`, currentResources);
});

i18n.on('loaded', (loaded) => {
  console.log('i18n resources loaded:', loaded);
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  console.log(`Language changed to ${lng}, updating document.documentElement.lang`);
  
  // Add in-memory translations for new language
  addInMemoryTranslations(lng);
  
  // Log currently loaded resources for debugging
  const loadedResources = i18n.getResourceBundle(lng, 'common');
  console.log(`Loaded resources for ${lng}:`, loadedResources);
  
  // Reload resources for the current language
  i18n.reloadResources([lng], ['common', 'navigation', 'messaging', 'auth', 'governance'])
    .then(() => {
      console.log(`Successfully reloaded resources for ${lng}`);
      // Force a refresh of translations
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    })
    .catch((error) => console.error(`Failed to reload resources for ${lng}:`, error));
});

// Add the reloadTranslations function for explicit control
export const reloadTranslations = async (language: string) => {
  try {
    // Add in-memory translations first
    addInMemoryTranslations(language);
    
    // Then reload from backend
    await i18n.reloadResources(language, ['common', 'navigation', 'auth', 'messaging', 'governance']);
    console.log(`Successfully reloaded translations for ${language}`);
    // Force a refresh of translations
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return true;
  } catch (error) {
    console.error(`Failed to reload translations for ${language}:`, error);
    return false;
  }
};

// Make the reloadTranslations function available globally for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18n = i18n; // Make i18n available globally for debugging
}

export default i18n;
