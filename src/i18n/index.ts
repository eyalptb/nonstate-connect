
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
    forceLoadLearnTranslations: (language?: string) => boolean; // Add for direct access
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
  
  // Add Learn translations directly during initialization
  if (learnTranslations[language]) {
    console.log(`[i18n] Adding learn translations for ${language} during initialization`);
    console.log(`[i18n] Learn translations structure for ${language}:`, learnTranslations[language]);
    
    // First add the entire object
    i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
    
    // Then add just the learn part specifically to ensure it's there
    if (learnTranslations[language].learn) {
      const learnOnly = { learn: learnTranslations[language].learn };
      i18n.addResourceBundle(language, 'common', learnOnly, true, true);
    }
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[i18n] After adding, learn translations exist for ${language}:`, 
      bundle && bundle.learn ? "Yes" : "No");
  }
};

// Initialize i18n with our configuration
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

// Set up event handlers
i18n.on('initialized', () => {
  console.log('[i18n] Initialized with language:', i18n.language);
  console.log('[i18n] Available namespaces:', i18n.options.ns);
  
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
      
      // Create an object with just the learn key
      const learnOnly = { learn: learnTranslations[i18n.language].learn };
      i18n.addResourceBundle(i18n.language, 'common', learnOnly, true, true);
    } else if (learnTranslations['en']) {
      console.log(`[i18n] Adding English learn translations as fallback`);
      
      // Create an object with just the learn key
      const learnOnly = { learn: learnTranslations['en'].learn };
      i18n.addResourceBundle(i18n.language, 'common', learnOnly, true, true);
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
      
      // Create an object with just the learn key
      const learnOnly = { learn: learnTranslations[lng].learn };
      i18n.addResourceBundle(lng, 'common', learnOnly, true, true);
    } else if (learnTranslations['en']) {
      console.log(`[i18n] Adding English learn translations as fallback`);
      
      // Create an object with just the learn key
      const learnOnly = { learn: learnTranslations['en'].learn };
      i18n.addResourceBundle(lng, 'common', learnOnly, true, true);
    }
  }
  
  // Reload resources to ensure everything is up-to-date
  i18n.reloadResources([lng], ['common'])
    .then(() => {
      console.log(`[i18n] Successfully reloaded resources for ${lng}`);
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    })
    .catch((error) => console.error(`[i18n] Failed to reload resources for ${lng}:`, error));
});

// Expose reloadTranslations function for global use
export const reloadTranslations = async (language: string) => {
  try {
    console.log(`[i18n] Reloading translations for ${language}`);
    
    // Add in-memory translations for the language
    addInMemoryTranslations(language);
    
    // Reload resources
    await i18n.reloadResources(language, ['common']);
    
    // Verify translations were added correctly
    const resources = i18n.getResourceBundle(language, 'common');
    const hasLearnTranslations = resources && 
      resources.learn && 
      Object.keys(resources.learn).length > 0;
    
    if (!hasLearnTranslations) {
      console.warn(`[i18n] Learn translations missing after reload, adding them explicitly`);
      if (learnTranslations[language]) {
        console.log(`[i18n] Adding learn translations during reload for ${language}`);
        
        // Create an object with just the learn key
        const learnOnly = { learn: learnTranslations[language].learn };
        i18n.addResourceBundle(language, 'common', learnOnly, true, true);
      } else if (learnTranslations['en']) {
        console.log(`[i18n] Adding English learn translations as fallback`);
        
        // Create an object with just the learn key
        const learnOnly = { learn: learnTranslations['en'].learn };
        i18n.addResourceBundle(language, 'common', learnOnly, true, true);
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

// Add the forceLoadLearnTranslations function from translationDebugger
import { forceLoadLearnTranslations } from '@/utils/translations/translationDebugger';

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.reloadTranslations = reloadTranslations;
  window.i18n = i18n;
  window.forceLoadLearnTranslations = forceLoadLearnTranslations;
}

export default i18n;
