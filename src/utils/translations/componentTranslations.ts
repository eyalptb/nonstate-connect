
import i18n from '@/i18n';
import { addComponentTranslations, loadAllComponentTranslations } from './translationCore';
import { learnTranslations } from './learnTranslations';

// Component-specific translations add functions
export const addWalletTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'wallet', namespace);

export const addFeatureTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'feature', namespace);

export const addJoinCtaTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'joinCta', namespace);

export const addProjectTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'project', namespace);

export const addFooterTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'footer', namespace);

export const addBackendTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'backend', namespace);

export const addFeaturePageTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'featurePage', namespace);

export const addUseCasesTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'useCases', namespace);

export const addLearnTranslations = (language: string, namespace: string = 'common') => 
  addComponentTranslations(language, 'learn', namespace);

// Component-specific load all translations functions
export const loadAllWalletTranslations = () => loadAllComponentTranslations('wallet');
export const loadAllFeatureTranslations = () => loadAllComponentTranslations('feature');
export const loadAllJoinCtaTranslations = () => loadAllComponentTranslations('joinCta');
export const loadAllProjectTranslations = () => loadAllComponentTranslations('project');
export const loadAllFooterTranslations = () => loadAllComponentTranslations('footer');
export const loadAllBackendTranslations = () => loadAllComponentTranslations('backend');
export const loadAllFeaturePageTranslations = () => loadAllComponentTranslations('featurePage');
export const loadAllUseCasesTranslations = () => loadAllComponentTranslations('useCases');
export const loadAllLearnTranslations = () => {
  console.log("Loading all learn translations");
  
  // Debugging: log available translations
  const supportedLanguages = i18n.options.supportedLngs || [];
  console.log("Supported languages:", supportedLanguages);
  
  // For debugging, check if translations exist for current language
  const currentLang = i18n.language;
  console.log(`Current language: ${currentLang}, has translations:`, !!learnTranslations[currentLang]);
  
  // Load all component translations
  loadAllComponentTranslations('learn');
  
  // Explicitly add translations for the current language as a fallback
  if (learnTranslations[currentLang]) {
    i18n.addResourceBundle(currentLang, 'common', { learn: learnTranslations[currentLang].learn }, true, true);
    console.log(`Explicitly added learn translations for ${currentLang}`);
  }
};
