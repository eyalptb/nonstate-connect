
import { loadTranslations } from './translationCore';
import { addComponentTranslations } from './translationCore';

// Component-specific wrapper functions for backward compatibility
export const addWalletTranslations = (language: string) => 
  addComponentTranslations(language, 'wallet');

export const addFeatureTranslations = (language: string) => 
  addComponentTranslations(language, 'feature');

export const addJoinCtaTranslations = (language: string) => 
  addComponentTranslations(language, 'joinCta');

export const addProjectTranslations = (language: string) => 
  addComponentTranslations(language, 'project');

export const addFooterTranslations = (language: string) => 
  addComponentTranslations(language, 'footer');

export const addBackendTranslations = (language: string) => 
  addComponentTranslations(language, 'backend');

export const addFeaturePageTranslations = (language: string) => 
  addComponentTranslations(language, 'featurePage');

export const addUseCasesTranslations = (language: string) =>
  addComponentTranslations(language, 'useCases');

export const addLearnTranslations = (language: string) =>
  addComponentTranslations(language, 'learn');

// Load all translations functions for backward compatibility
export const loadAllWalletTranslations = () => 
  loadTranslations('wallet', { allLanguages: true });

export const loadAllFeatureTranslations = () => 
  loadTranslations('feature', { allLanguages: true });

export const loadAllJoinCtaTranslations = () => 
  loadTranslations('joinCta', { allLanguages: true });

export const loadAllProjectTranslations = () => 
  loadTranslations('project', { allLanguages: true });

export const loadAllFooterTranslations = () => 
  loadTranslations('footer', { allLanguages: true });

export const loadAllBackendTranslations = () => 
  loadTranslations('backend', { allLanguages: true });

export const loadAllFeaturePageTranslations = () => 
  loadTranslations('featurePage', { allLanguages: true });

export const loadAllUseCasesTranslations = () =>
  loadTranslations('useCases', { allLanguages: true });

export const loadAllLearnTranslations = () =>
  loadTranslations('learn', { allLanguages: true });
