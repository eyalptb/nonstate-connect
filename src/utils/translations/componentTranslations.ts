
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
  
  // First, try to add translations directly for immediate availability
  const directAddSuccess = addLearnTranslationsDirectly(language);
  
  if (directAddSuccess) {
    console.log(`[componentTranslations] Direct add of learn translations for ${language} succeeded`);
    
    // Verify the translations were added
    const resources = i18n.getResourceBundle(language, 'common');
    if (resources && resources.learn) {
      console.log(`[componentTranslations] Verified learn translations for ${language} with ${Object.keys(resources.learn).length} keys`);
    }
  } else {
    console.warn(`[componentTranslations] Direct add of learn translations for ${language} failed, trying standard method`);
    
    // Try fallback to English if not current language
    if (language !== 'en') {
      console.log(`[componentTranslations] Trying English fallback`);
      addLearnTranslationsDirectly('en');
    }
  }
  
  // Still load using the standard method as a backup
  return loadTranslations('learn', { language });
};

export const loadAllLearnTranslations = async () => {
  console.log('[componentTranslations] Loading all learn translations');
  
  // First, force add all translations directly for immediate availability
  const directAddSuccess = forceAddAllLearnTranslations();
  console.log(`[componentTranslations] Direct add of all learn translations ${directAddSuccess ? 'succeeded' : 'had some failures'}`);
  
  // Get current language
  const currentLang = i18n.language;
  console.log(`[componentTranslations] Current language: ${currentLang}`);
  
  // Ensure translations for current language are loaded
  const currentLangSuccess = addLearnTranslationsDirectly(currentLang);
  
  if (!currentLangSuccess && currentLang !== 'en') {
    console.log(`[componentTranslations] Falling back to English for learn translations`);
    addLearnTranslationsDirectly('en');
  }
  
  // Also load using standard method as backup
  await loadTranslations('learn', { allLanguages: true });
  
  // Force a reload of resources for the current language
  await i18n.reloadResources([currentLang], ['common']);
  
  // Verify translations were loaded properly
  const resources = i18n.getResourceBundle(currentLang, 'common');
  const hasLearnSection = resources && resources.learn && Object.keys(resources.learn).length > 0;
  
  console.log(`[componentTranslations] After all attempts, learn translations exist: ${hasLearnSection ? 'Yes' : 'No'}`);
  if (hasLearnSection) {
    console.log(`[componentTranslations] Learn keys available: ${Object.keys(resources.learn).length}`);
  }
  
  return hasLearnSection;
};
