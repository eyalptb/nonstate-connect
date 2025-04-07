import { addComponentTranslations, loadAllComponentTranslations } from './translationCore';

// Wallet Translations
export const addWalletTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'wallet', namespace);
};

export const loadAllWalletTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('wallet', namespace);
};

// Feature Translations
export const addFeatureTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'feature', namespace);
};

export const loadAllFeatureTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('feature', namespace);
};

// Join CTA Translations
export const addJoinCtaTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'joinCta', namespace);
};

export const loadAllJoinCtaTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('joinCta', namespace);
};

// Project Translations
export const addProjectTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'project', namespace);
};

export const loadAllProjectTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('project', namespace);
};

// Footer Translations
export const addFooterTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'footer', namespace);
};

export const loadAllFooterTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('footer', namespace);
};

// Backend Translations
export const addBackendTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'backend', namespace);
};

export const loadAllBackendTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('backend', namespace);
};

// Feature Page Translations
export const addFeaturePageTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'featurePage', namespace);
};

export const loadAllFeaturePageTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('featurePage', namespace);
};

// Use Cases Translations
export const addUseCasesTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'useCases', namespace);
};

export const loadAllUseCasesTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('useCases', namespace);
};

// Learn Translations
export const addLearnTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'learn', namespace);
};

export const loadAllLearnTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('learn', namespace);
};

// Pricing Translations
export const addPricingTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'pricing', namespace);
};

export const loadAllPricingTranslations = (namespace: string = 'common') => {
  loadAllComponentTranslations('pricing', namespace);
};

// Export as named exports
export {
  addWalletTranslations,
  loadAllWalletTranslations,
  addFeatureTranslations,
  loadAllFeatureTranslations,
  addJoinCtaTranslations,
  loadAllJoinCtaTranslations,
  addProjectTranslations,
  loadAllProjectTranslations,
  addFooterTranslations,
  loadAllFooterTranslations,
  addBackendTranslations,
  loadAllBackendTranslations,
  addFeaturePageTranslations,
  loadAllFeaturePageTranslations,
  addUseCasesTranslations,
  loadAllUseCasesTranslations,
  addLearnTranslations,
  loadAllLearnTranslations,
  addPricingTranslations,
  loadAllPricingTranslations,
};
