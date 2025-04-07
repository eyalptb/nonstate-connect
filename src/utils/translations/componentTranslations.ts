
import { loadTranslations } from './translationCore';
import i18n from '@/i18n';
import { learnTranslations } from './learnTranslations';

// Specific loaders for each component type

// Wallet Translations
export const addWalletTranslations = (language: string) => 
  loadTranslations('wallet', { language });

export const loadAllWalletTranslations = () => 
  loadTranslations('wallet', { allLanguages: true });

// Feature Translations
export const addFeatureTranslations = (language: string) => 
  loadTranslations('feature', { language });

export const loadAllFeatureTranslations = () => 
  loadTranslations('feature', { allLanguages: true });

// Join CTA Translations
export const addJoinCtaTranslations = (language: string) => 
  loadTranslations('joinCta', { language });

export const loadAllJoinCtaTranslations = () => 
  loadTranslations('joinCta', { allLanguages: true });

// Project Translations
export const addProjectTranslations = (language: string) => 
  loadTranslations('project', { language });

export const loadAllProjectTranslations = () => 
  loadTranslations('project', { allLanguages: true });

// Footer Translations
export const addFooterTranslations = (language: string) => 
  loadTranslations('footer', { language });

export const loadAllFooterTranslations = () => 
  loadTranslations('footer', { allLanguages: true });

// Backend Translations
export const addBackendTranslations = (language: string) => 
  loadTranslations('backend', { language });

export const loadAllBackendTranslations = () => 
  loadTranslations('backend', { allLanguages: true });

// Feature Page Translations
export const addFeaturePageTranslations = (language: string) => 
  loadTranslations('featurePage', { language });

export const loadAllFeaturePageTranslations = () => 
  loadTranslations('featurePage', { allLanguages: true });

// Use Cases Translations
export const addUseCasesTranslations = (language: string) => 
  loadTranslations('useCases', { language });

export const loadAllUseCasesTranslations = () => 
  loadTranslations('useCases', { allLanguages: true });

// Learn Translations - Simple direct approach
export const addLearnTranslations = (language: string) => {
  // Add translations directly from our structured translations
  if (learnTranslations[language]) {
    i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
  } else if (learnTranslations['en']) {
    // Fallback to English if current language not available
    i18n.addResourceBundle(language, 'common', learnTranslations['en'], true, true);
  }
  
  // Also load using standard method as a backup
  return loadTranslations('learn', { language });
};

export const loadAllLearnTranslations = () => {
  // Add translations for all languages directly
  Object.keys(learnTranslations).forEach(lang => {
    if (learnTranslations[lang]) {
      i18n.addResourceBundle(lang, 'common', learnTranslations[lang], true, true);
    }
  });
  
  // Also load using standard method as a backup
  return loadTranslations('learn', { allLanguages: true });
};
