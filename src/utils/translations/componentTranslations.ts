
import { loadTranslations } from './translationCore';
import i18n from '@/i18n';
import { forceAddAllLearnTranslations, addLearnTranslationsDirectly } from './learnTranslations';

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

// Learn Translations
export const addLearnTranslations = (language: string) => {
  console.log(`[componentTranslations] Adding learn translations for ${language}`);
  
  // Add translations directly first for immediate availability
  const directAddSuccess = addLearnTranslationsDirectly(language);
  
  if (directAddSuccess) {
    console.log(`[componentTranslations] Direct add of learn translations for ${language} succeeded`);
  } else {
    console.warn(`[componentTranslations] Direct add of learn translations for ${language} failed`);
  }
  
  // Then also load using the standard method as a backup
  return loadTranslations('learn', { language });
};

export const loadAllLearnTranslations = async () => {
  console.log('[componentTranslations] Loading all learn translations');
  
  // Force add all translations directly first
  forceAddAllLearnTranslations();
  
  // Get current language
  const currentLang = i18n.language;
  console.log(`[componentTranslations] Current language: ${currentLang}`);
  
  // Load translations for current language specifically
  const directAddSuccess = addLearnTranslationsDirectly(currentLang);
  
  if (directAddSuccess) {
    console.log(`[componentTranslations] Direct add of learn translations for ${currentLang} succeeded`);
  } else {
    console.warn(`[componentTranslations] Direct add of learn translations for ${currentLang} failed, trying standard method`);
    // Try standard method as backup
    await loadTranslations('learn', { language: currentLang });
  }
  
  // Also load for all languages
  return loadTranslations('learn', { allLanguages: true });
};
