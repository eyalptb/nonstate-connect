
import i18n from '@/i18n';
import { addTranslations, getSupportedLanguages } from './translationHelpers';
import { addComponentTranslations, loadAllComponentTranslations, loadTranslations } from './translationCore';
import { learnTranslations } from './learn/index';

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
  const result = i18n.addResourceBundle(
    language, 
    namespace, 
    { learn: translations }, 
    true,  // deep merge
    true   // overwrite
  );
  
  console.log(`Added learn translations for ${language}, result:`, result ? 'Success' : 'Failed');
  
  // Return the result of adding the translations
  return result;
};

export const loadAllLearnTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log("Loading learn translations for languages:", supportedLanguages);
  
  // Force load for the current language first
  addLearnTranslations(i18n.language);
  
  // Then load for all supported languages
  supportedLanguages.forEach(lang => {
    if (lang !== i18n.language) { // Skip the current language as we already loaded it
      addLearnTranslations(lang);
    }
  });
};
