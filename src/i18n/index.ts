
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
  console.log(`[i18n] Adding in-memory translations for ${language}`);
  
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
  
  // Add Learn translations directly from the module
  if (learnTranslations[language]) {
    console.log(`[i18n] Adding learn translations for ${language} during initialization`);
    console.log(`[i18n] Learn translations structure for ${language}:`, learnTranslations[language]);
    i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[i18n] After adding, learn translations exist for ${language}:`, 
      bundle && bundle.learn ? "Yes" : "No");
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
  console.log('[i18n] Initialized with language:', i18n.language);
  console.log('[i18n] Available namespaces:', i18n.options.ns);
  console.log('[i18n] Supported languages:', i18n.options.supportedLngs);
  
  // Add in-memory translations for current language
  addInMemoryTranslations(i18n.language);
  
  // Verify learn translations were added correctly
  const currentResources = i18n.getResourceBundle(i18n.language, 'common');
  console.log(`[i18n] Initial resources for ${i18n.language}:`, currentResources);
  
  // Check if Learn translations are present
  const hasLearnTranslations = currentResources && 
    currentResources.learn && 
    Object.keys(currentResources.learn).length > 0;
  
  if (!hasLearnTranslations) {
    console.warn(`[i18n] Learn translations not present after initialization, adding them explicitly`);
    if (learnTranslations[i18n.language]) {
      console.log(`[i18n] Adding learn translations for ${i18n.language} manually after init`);
      i18n.addResourceBundle(i18n.language, 'common', learnTranslations[i18n.language], true, true);
    } else if (learnTranslations['en']) {
      console.log(`[i18n] Adding English learn translations as fallback`);
      i18n.addResourceBundle(i18n.language, 'common', learnTranslations['en'], true, true);
    }
  } else {
    console.log(`[i18n] Learn translations correctly loaded during initialization`);
  }
  
  // Notify listeners
  document.dispatchEvent(new Event('i18n-resources-loaded'));
});

i18n.on('loaded', (loaded) => {
  console.log('[i18n] Resources loaded:', loaded);
  document.dispatchEvent(new Event('i18n-resources-loaded'));
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  console.log(`[i18n] Language changed to ${lng}, updating document.documentElement.lang`);
  
  // Add in-memory translations for the new language
  addInMemoryTranslations(lng);
  
  // Verify translations were added
  const resources = i18n.getResourceBundle(lng, 'common');
  console.log(`[i18n] Resources for ${lng} after language change:`, resources);
  
  // Verify Learn translations specifically
  const hasLearnTranslations = resources && 
    resources.learn && 
    Object.keys(resources.learn).length > 0;
    
  if (!hasLearnTranslations) {
    console.warn(`[i18n] Learn translations missing after language change, adding them explicitly`);
    if (learnTranslations[lng]) {
      console.log(`[i18n] Adding learn translations for ${lng} after language change`);
      console.log(`[i18n] Learn translations structure to be added:`, learnTranslations[lng]);
      i18n.addResourceBundle(lng, 'common', learnTranslations[lng], true, true);
      
      // Verify they were added correctly
      const updatedResources = i18n.getResourceBundle(lng, 'common');
      console.log(`[i18n] Learn translations present after manual add:`, 
        updatedResources && updatedResources.learn ? "Yes" : "No");
    } else if (learnTranslations['en']) {
      console.log(`[i18n] Adding English learn translations as fallback after language change`);
      i18n.addResourceBundle(lng, 'common', learnTranslations['en'], true, true);
    }
  }
  
  // Reload resources to ensure everything is up-to-date
  i18n.reloadResources([lng], ['common', 'navigation', 'auth', 'messaging', 'governance'])
    .then(() => {
      console.log(`[i18n] Successfully reloaded resources for ${lng}`);
      
      // Check if learn translations are present after reload
      const reloadedBundle = i18n.getResourceBundle(lng, 'common');
      console.log(`[i18n] Learn translations present after reload:`, 
        reloadedBundle && reloadedBundle.learn ? "Yes" : "No");
      
      // Dispatch an event that components can listen for to know when to update
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    })
    .catch((error) => console.error(`[i18n] Failed to reload resources for ${lng}:`, error));
});

export const reloadTranslations = async (language: string) => {
  try {
    console.log(`[i18n] Reloading translations for ${language}`);
    
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
      console.warn(`[i18n] Learn translations missing after reload, adding them explicitly`);
      if (learnTranslations[language]) {
        console.log(`[i18n] Adding learn translations during reload for ${language}`);
        i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
        
        // Verify once more
        const finalCheck = i18n.getResourceBundle(language, 'common');
        console.log(`[i18n] Final check - Learn translations present:`, 
          finalCheck && finalCheck.learn ? "Yes" : "No");
      } else if (learnTranslations['en']) {
        console.log(`[i18n] Adding English learn translations as fallback during reload`);
        i18n.addResourceBundle(language, 'common', learnTranslations['en'], true, true);
      }
    }
    
    // Notify listeners
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return true;
  } catch (error) {
    console.error(`[i18n] Failed to reload translations for ${language}:`, error);
    return false;
  }
};

if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18n = i18n;
}

export default i18n;
