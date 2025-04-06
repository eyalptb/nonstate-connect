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
  
  try {
    if (learnTranslations[language]) {
      console.log(`Adding learn translations for ${language}`, learnTranslations[language]);
      i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
    } else {
      console.warn(`No learn translations found for ${language}, falling back to English`);
      if (learnTranslations['en']) {
        i18n.addResourceBundle(language, 'common', learnTranslations['en'], true, true);
      }
    }
  } catch (error) {
    console.error(`Error adding learn translations for ${language}:`, error);
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
  
  addInMemoryTranslations(i18n.language);
  
  const currentResources = i18n.getResourceBundle(i18n.language, 'common');
  console.log(`Initial resources for ${i18n.language}:`, currentResources);
  
  const hasLearnTranslations = currentResources && 
    currentResources.learn && 
    Object.keys(currentResources.learn).length > 0;
  
  console.log(`Has learn translations: ${hasLearnTranslations}`);
  
  if (!hasLearnTranslations) {
    console.warn('Learn translations not loaded during initialization, adding them explicitly');
    try {
      const learnResource = learnTranslations[i18n.language] || learnTranslations['en'];
      if (learnResource) {
        i18n.addResourceBundle(i18n.language, 'common', learnResource, true, true);
        console.log('Learn translations added explicitly');
      }
    } catch (error) {
      console.error('Failed to add learn translations explicitly:', error);
    }
  }
});

i18n.on('loaded', (loaded) => {
  console.log('i18n resources loaded:', loaded);
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  console.log(`Language changed to ${lng}, updating document.documentElement.lang`);
  
  addInMemoryTranslations(lng);
  
  const loadedResources = i18n.getResourceBundle(lng, 'common');
  console.log(`Loaded resources for ${lng}:`, loadedResources);
  
  i18n.reloadResources([lng], ['common', 'navigation', 'auth', 'messaging', 'governance'])
    .then(() => {
      console.log(`Successfully reloaded resources for ${lng}`);
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    })
    .catch((error) => console.error(`Failed to reload resources for ${lng}:`, error));
});

export const reloadTranslations = async (language: string) => {
  try {
    console.log(`Reloading translations for ${language}`);
    
    addInMemoryTranslations(language);
    
    await i18n.reloadResources(language, ['common', 'navigation', 'auth', 'messaging', 'governance']);
    
    const resources = i18n.getResourceBundle(language, 'common');
    const hasLearnTranslations = resources && 
      resources.learn && 
      Object.keys(resources.learn).length > 0;
    
    console.log(`After reload - Has learn translations: ${hasLearnTranslations}`);
    
    if (!hasLearnTranslations && learnTranslations[language]) {
      i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
      console.log('Learn translations added explicitly after reload');
    }
    
    console.log(`Successfully reloaded translations for ${language}`);
    
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
