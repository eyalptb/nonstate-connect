
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
      return addTranslations(language, namespace, { learn: learnTranslations['en'].learn });
    }
    return false;
  }
  
  console.log(`Adding learn translations for ${language}:`, learnTranslations[language]);
  return addTranslations(language, namespace, { learn: learnTranslations[language].learn });
};

export const loadAllLearnTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log(`Loading learn translations for languages:`, supportedLanguages);
  
  supportedLanguages.forEach(lang => {
    const success = addLearnTranslations(lang);
    if (success) {
      console.log(`Successfully loaded learn translations for ${lang}`);
    } else {
      console.warn(`Failed to load learn translations for ${lang}`);
    }
  });
  
  // Dispatch event to notify that translations are loaded
  document.dispatchEvent(new Event('i18n-resources-loaded'));
};
