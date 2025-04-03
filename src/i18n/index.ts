
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { toast } from 'sonner';

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

// Initialize i18next with minimal configuration
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Enable debug for all environments to identify issues
    
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    
    // Explicit paths for loading translations - ensure all files exist
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Namespace for translations
    ns: ['common', 'auth', 'navigation', 'messaging', 'governance'],
    defaultNS: 'common',
    
    // Supported languages
    supportedLngs: Object.keys(languages),
    
    // Language detection options
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
    },

    // Important settings for React - disable suspense to prevent rendering issues
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
    },
    
    // For debugging missing translations
    missingKeyHandler: (lngs, ns, key) => {
      console.warn(`Missing translation: ${key} in namespace ${ns} for languages ${lngs}`);
      // Use a type-safe approach for storing missing translations
      const missingTranslations = window.localStorage.getItem('missingTranslations') || '[]';
      try {
        const parsed = JSON.parse(missingTranslations);
        parsed.push({ lngs, ns, key });
        window.localStorage.setItem('missingTranslations', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error storing missing translation', e);
      }
    }
  });

// Add debug logging for language changes
i18n.on('languageChanged', (lng) => {
  console.log(`Language changed to: ${lng}`);
  document.documentElement.lang = lng; // Update HTML lang attribute
  document.documentElement.dir = ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr'; // Handle RTL languages
  
  // Display toast notification for language change
  const langName = languages[lng as keyof typeof languages]?.name || lng;
  toast.success(`Language changed to ${langName}`);
  
  // Force update UI on language change - this triggers the useForceLanguageUpdate hook
  setTimeout(() => {
    console.log('Dispatching languageChanged event');
    window.dispatchEvent(new Event('languageChanged'));
  }, 100);
});

// Function to check if translation files exist - improved version
export const checkTranslationAvailability = async () => {
  const supportedLangs = Object.keys(languages);
  const namespaces = ['common', 'auth', 'navigation', 'messaging', 'governance'];
  const missingFiles = [];
  
  console.log('Checking translation file availability...');
  
  for (const lang of supportedLangs) {
    for (const ns of namespaces) {
      try {
        const url = `/locales/${lang}/${ns}.json`;
        console.log(`Checking: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          missingFiles.push(url);
          console.error(`Missing file: ${url}`);
        } else {
          console.log(`Found file: ${url}`);
        }
      } catch (err) {
        missingFiles.push(`/locales/${lang}/${ns}.json`);
        console.error(`Error checking ${lang}/${ns}.json:`, err);
      }
    }
  }
  
  if (missingFiles.length > 0) {
    console.error('Missing translation files:', missingFiles);
    toast.error(`Missing translation files: ${missingFiles.length} files`);
  } else {
    console.log('All translation files available');
    toast.success('All translation files are available');
  }
  
  // Return the check result
  return {
    success: missingFiles.length === 0,
    missingFiles
  };
};

// Call this function in all environments to identify issues
setTimeout(() => {
  checkTranslationAvailability();
}, 2000);

// Add a global method to manually reload translations
// Use a safer approach with a namespace
interface Window {
  reloadTranslations?: () => void;
}

// Define the reload function without modifying the Window interface directly
const reloadTranslations = () => {
  const currentLng = i18n.language;
  console.log('Manually reloading translations for', currentLng);
  i18n.reloadResources(currentLng).then(() => {
    console.log('Translations reloaded');
    window.dispatchEvent(new Event('languageChanged'));
    toast.success('Translations reloaded');
  });
};

// Make the function available globally but in a safer way
(window as any).reloadTranslations = reloadTranslations;

// Add a custom handler for missing translations
i18n.on('missingKey', (lngs, namespace, key) => {
  console.warn(`Missing translation: ${key} in ${namespace} for ${lngs}`);
});

export default i18n;
