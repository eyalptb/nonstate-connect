
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
    debug: process.env.NODE_ENV === 'development',
    
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
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    // Important settings for React - disable suspense to prevent rendering issues
    react: {
      useSuspense: false,
    },
    
    // For debugging missing translations
    missingKeyHandler: (lngs, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation: ${key} in namespace ${ns} for languages ${lngs}`);
      }
    }
  });

// Add debug logging for language changes
i18n.on('languageChanged', (lng) => {
  console.log(`Language changed to: ${lng}`);
  document.documentElement.lang = lng; // Update HTML lang attribute
  document.documentElement.dir = ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr'; // Handle RTL languages
  
  // Force update UI on language change
  window.dispatchEvent(new Event('languageChanged'));
});

// Function to check if translation files exist - improved version
export const checkTranslationAvailability = async () => {
  const supportedLangs = Object.keys(languages);
  const namespaces = ['common', 'auth', 'navigation', 'messaging', 'governance'];
  const missingFiles = [];
  
  for (const lang of supportedLangs) {
    for (const ns of namespaces) {
      try {
        const response = await fetch(`/locales/${lang}/${ns}.json`);
        if (!response.ok) {
          missingFiles.push(`/locales/${lang}/${ns}.json`);
        }
      } catch (err) {
        missingFiles.push(`/locales/${lang}/${ns}.json`);
      }
    }
  }
  
  if (missingFiles.length > 0) {
    console.error('Missing translation files:', missingFiles);
    if (process.env.NODE_ENV === 'development') {
      toast.error(`Missing translation files: ${missingFiles.length} files`);
    }
  } else {
    console.log('All translation files available');
  }
};

// Call this function in development mode
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    checkTranslationAvailability();
  }, 2000);
}

export default i18n;
