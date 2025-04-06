
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
import { learnTranslations } from '@/utils/translations/learnTranslations';

declare global {
  interface Window {
    reloadTranslations: (language: string) => Promise<boolean>;
    i18n: typeof i18n; // Make i18n available globally for debugging
  }
}

const addInMemoryTranslations = (language: string) => {
  if (walletTranslations[language]) {
    i18n.addResourceBundle(language, 'common', walletTranslations[language], true, true);
  }
  
  if (featureTranslations[language]) {
    i18n.addResourceBundle(language, 'common', featureTranslations[language], true, true);
  }
  
  if (joinCtaTranslations[language]) {
    i18n.addResourceBundle(language, 'common', joinCtaTranslations[language], true, true);
  }
  
  if (projectTranslations[language]) {
    i18n.addResourceBundle(language, 'common', projectTranslations[language], true, true);
  }
  
  if (footerTranslations[language]) {
    i18n.addResourceBundle(language, 'common', footerTranslations[language], true, true);
  }
  
  if (backendTranslations[language]) {
    i18n.addResourceBundle(language, 'common', backendTranslations[language], true, true);
  }
  
  // Add Learn translations - with forced debug
  if (learnTranslations[language]) {
    console.log(`Adding learn translations for ${language} during initialization`);
    
    // CRITICAL: We need to add the translations in the exact format expected by i18next
    const success = i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
    console.log(`Learn translations add result: ${success ? 'Success' : 'Failed'}`);
    
    // Verify the translations were added
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`Resource bundle after adding learn translations:`, 
      bundle && bundle.learn ? 'Has learn section' : 'Missing learn section');
  } else if (learnTranslations['en']) {
    console.log(`No learn translations for ${language}, adding English as fallback`);
    i18n.addResourceBundle(language, 'common', learnTranslations['en'], true, true);
  }
};

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

i18n.on('initialized', () => {
  console.log('i18n initialized with language:', i18n.language);
  console.log('Available namespaces:', i18n.options.ns);
  console.log('Supported languages:', i18n.options.supportedLngs);
  
  // Add in-memory translations for current language
  addInMemoryTranslations(i18n.language);
  
  // Verify learn translations were added correctly
  const currentResources = i18n.getResourceBundle(i18n.language, 'common');
  console.log(`Initial resources for ${i18n.language}:`, currentResources);
  
  // Check if Learn translations are present
  const hasLearnTranslations = currentResources && 
    currentResources.learn && 
    Object.keys(currentResources.learn).length > 0;
  
  if (!hasLearnTranslations) {
    console.warn(`Learn translations not present after initialization, adding them explicitly`);
    if (learnTranslations[i18n.language]) {
      i18n.addResourceBundle(i18n.language, 'common', learnTranslations[i18n.language], true, true);
    } else if (learnTranslations['en']) {
      i18n.addResourceBundle(i18n.language, 'common', learnTranslations['en'], true, true);
    }
  } else {
    console.log(`Learn translations correctly loaded during initialization`);
  }
  
  // Notify listeners
  document.dispatchEvent(new Event('i18n-resources-loaded'));
});

i18n.on('loaded', (loaded) => {
  console.log('i18n resources loaded:', loaded);
  document.dispatchEvent(new Event('i18n-resources-loaded'));
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  console.log(`Language changed to ${lng}, updating document.documentElement.lang`);
  
  // Add in-memory translations for the new language
  addInMemoryTranslations(lng);
  
  // Verify translations were added
  const resources = i18n.getResourceBundle(lng, 'common');
  console.log(`Resources for ${lng} after language change:`, resources);
  
  // Verify Learn translations specifically
  const hasLearnTranslations = resources && 
    resources.learn && 
    Object.keys(resources.learn).length > 0;
    
  if (!hasLearnTranslations) {
    console.warn(`Learn translations missing after language change, adding them explicitly`);
    if (learnTranslations[lng]) {
      i18n.addResourceBundle(lng, 'common', learnTranslations[lng], true, true);
    } else if (learnTranslations['en']) {
      i18n.addResourceBundle(lng, 'common', learnTranslations['en'], true, true);
    }
  }
  
  // Reload resources to ensure everything is up-to-date
  i18n.reloadResources([lng], ['common', 'navigation', 'auth', 'messaging', 'governance'])
    .then(() => {
      console.log(`Successfully reloaded resources for ${lng}`);
      // Dispatch an event that components can listen for to know when to update
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    })
    .catch((error) => console.error(`Failed to reload resources for ${lng}:`, error));
});

export const reloadTranslations = async (language: string) => {
  try {
    console.log(`Reloading translations for ${language}`);
    
    // Add in-memory translations for the language
    addInMemoryTranslations(language);
    
    // Reload resources
    await i18n.reloadResources(language, ['common', 'navigation', 'auth', 'messaging', 'governance']);
    
    // Verify translations were added correctly
    const resources = i18n.getResourceBundle(language, 'common');
    const hasLearnTranslations = resources && 
      resources.learn && 
      Object.keys(resources.learn).length > 0;
    
    if (!hasLearnTranslations) {
      console.warn(`Learn translations missing after reload, adding them explicitly`);
      if (learnTranslations[language]) {
        i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
      } else if (learnTranslations['en']) {
        i18n.addResourceBundle(language, 'common', learnTranslations['en'], true, true);
      }
    }
    
    // Notify listeners
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return true;
  } catch (error) {
    console.error(`Failed to reload translations for ${language}:`, error);
    return false;
  }
};

if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18n = i18n;
}

export default i18n;
