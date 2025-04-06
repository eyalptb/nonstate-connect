
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
  // Simple approach like other working pages
  loadAllComponentTranslations('learn');
  
  // Ensure translations are directly added for the current language
  const currentLang = i18n.language;
  if (learnTranslations[currentLang]) {
    console.log(`Adding learn translations directly for ${currentLang}`);
    i18n.addResourceBundle(currentLang, 'common', { learn: learnTranslations[currentLang].learn }, true, true);
  }
  
  // Fallback to English if needed
  if (currentLang !== 'en' && learnTranslations.en) {
    console.log('Adding English learn translations as fallback');
    i18n.addResourceBundle('en', 'common', { learn: learnTranslations.en.learn }, true, false);
  }
  
  // Force refresh
  document.dispatchEvent(new Event('i18n-resources-loaded'));
};
