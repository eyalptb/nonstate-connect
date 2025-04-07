
import { loadTranslations } from './translationCore';
import i18n from '@/i18n';

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
  
  // Get current translation data
  const currentTranslations = i18n.getResourceBundle(language, 'common');
  
  // Check if we already have learn translations
  if (currentTranslations && currentTranslations.learn) {
    console.log(`[componentTranslations] Learn translations already exist for ${language}`);
  }
  
  // Load the translations anyway to ensure they're up-to-date
  return loadTranslations('learn', { language });
};

export const loadAllLearnTranslations = async () => {
  console.log('[componentTranslations] Loading all learn translations');
  
  // Get current language
  const currentLang = i18n.language;
  console.log(`[componentTranslations] Current language: ${currentLang}`);
  
  // Load translations for current language first
  addLearnTranslations(currentLang);
  
  // Then load for all languages
  const result = loadTranslations('learn', { allLanguages: true });
  
  // Explicitly verify that the current language has learn translations
  console.log(`[componentTranslations] Verifying learn translations for current language: ${currentLang}`);
  
  // Get the current resource bundle
  const resources = i18n.getResourceBundle(currentLang, 'common');
  const hasLearnTranslations = resources && resources.learn && Object.keys(resources.learn).length > 0;
  
  if (!hasLearnTranslations) {
    console.warn(`[componentTranslations] Learn translations missing for ${currentLang}, forcing reload`);
    // Force reload resources for the current language
    try {
      await i18n.reloadResources([currentLang], ['common']);
      console.log(`[componentTranslations] Resources reloaded for ${currentLang}`);
      
      // Add learn translations explicitly
      return loadTranslations('learn', { language: currentLang });
    } catch (error) {
      console.error(`[componentTranslations] Error reloading resources: ${error}`);
    }
  } else {
    console.log(`[componentTranslations] Learn translations verified for ${currentLang}`);
  }
  
  return result;
};
