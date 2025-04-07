
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

// Learn translations - simplify to use standard approach
export const addLearnTranslations = (language: string, namespace: string = 'common') => {
  return addComponentTranslations(language, 'learn', namespace);
};

export const loadAllLearnTranslations = () => {
  loadAllComponentTranslations('learn');
};
