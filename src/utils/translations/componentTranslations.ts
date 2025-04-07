
import i18n from '@/i18n';
import { addTranslations, getSupportedLanguages } from './translationHelpers';
import { addComponentTranslations, loadAllComponentTranslations, loadTranslations } from './translationCore';
import { learnTranslations } from './learnTranslations';

// Wallet translations
export const addWalletTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'wallet', namespace);
};

export const loadAllWalletTranslations = () => {
  loadAllComponentTranslations('wallet');
};

// Feature translations
export const addFeatureTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'feature', namespace);
};

export const loadAllFeatureTranslations = () => {
  loadAllComponentTranslations('feature');
};

// JoinCta translations
export const addJoinCtaTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'joinCta', namespace);
};

export const loadAllJoinCtaTranslations = () => {
  loadAllComponentTranslations('joinCta');
};

// Project translations
export const addProjectTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'project', namespace);
};

export const loadAllProjectTranslations = () => {
  loadAllComponentTranslations('project');
};

// Footer translations
export const addFooterTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'footer', namespace);
};

export const loadAllFooterTranslations = () => {
  loadAllComponentTranslations('footer');
};

// Backend translations
export const addBackendTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'backend', namespace);
};

export const loadAllBackendTranslations = () => {
  loadAllComponentTranslations('backend');
};

// FeaturePage translations
export const addFeaturePageTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'featurePage', namespace);
};

export const loadAllFeaturePageTranslations = () => {
  loadAllComponentTranslations('featurePage');
};

// UseCases translations
export const addUseCasesTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'useCases', namespace);
};

export const loadAllUseCasesTranslations = () => {
  loadAllComponentTranslations('useCases');
};

// Learn translations - more direct approach to fix the loading issue
export const addLearnTranslations = (language: string, namespace: string = 'common') => {
  console.log(`Adding learn translations for ${language}`);
  
  // Get the translations for the specified language or fallback to English
  const translations = learnTranslations[language] || learnTranslations['en'];
  
  if (!translations) {
    console.error(`No learn translations found for ${language} or fallback`);
    return false;
  }
  
  // Add the translations directly to i18n as a nested 'learn' object
  // This ensures the translations are available under the 'learn' namespace
  const result = i18n.addResourceBundle(
    language, 
    namespace, 
    { learn: translations }, 
    true,  // deep merge
    true   // overwrite
  );
  
  console.log(`Added learn translations for ${language}, result:`, result ? 'Success' : 'Failed');
  
  // Log the current state of translations after adding
  const bundle = i18n.getResourceBundle(language, namespace);
  console.log(`Resource bundle after adding learn translations:`, 
    bundle && bundle.learn ? 'Has learn section' : 'Missing learn section');
  
  return result;
};

export const loadAllLearnTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log("Loading learn translations for languages:", supportedLanguages);
  
  supportedLanguages.forEach(lang => {
    const success = addLearnTranslations(lang);
    if (success) {
      console.log(`Successfully loaded learn translations for ${lang}`);
    } else {
      console.warn(`Failed to load learn translations for ${lang}, trying fallback`);
      // Try to add English translations as fallback
      if (lang !== 'en') {
        addLearnTranslations('en');
      }
    }
  });
  
  // Make sure current language has translations
  const currentLang = i18n.language;
  const bundle = i18n.getResourceBundle(currentLang, 'common');
  
  if (!bundle || !bundle.learn) {
    console.warn(`Current language ${currentLang} still missing learn translations after loadAll, adding directly`);
    addLearnTranslations(currentLang);
  }
};
