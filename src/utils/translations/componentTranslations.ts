
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

// Learn translations
export const addLearnTranslations = (language: string, namespace: string = 'common') => {
  if (!learnTranslations[language]) {
    console.warn(`No learn translations found for ${language}, falling back to English`);
    // Try to add English translations as fallback
    if (learnTranslations['en']) {
      return addTranslations(language, namespace, learnTranslations['en']);
    }
    return false;
  }
  
  console.log(`Adding learn translations for ${language}:`, learnTranslations[language]);
  return addTranslations(language, namespace, learnTranslations[language]);
};

export const loadAllLearnTranslations = async () => {
  const currentLanguage = i18n.language;
  console.log(`Loading learn translations for current language: ${currentLanguage}`);
  
  // First add translations for current language
  addLearnTranslations(currentLanguage);
  
  // Then add for all supported languages in background
  const supportedLanguages = getSupportedLanguages();
  for (const lang of supportedLanguages) {
    if (lang !== currentLanguage) {
      addLearnTranslations(lang);
    }
  }
  
  // Force refresh translations and notify listeners
  try {
    await i18n.reloadResources(currentLanguage, ['common']);
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    console.log(`Learn translations loaded and event dispatched`);
    return true;
  } catch (error) {
    console.error(`Error reloading resources: ${error}`);
    return false;
  }
};
