
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

// Special handling for learn translations due to structure differences
export const loadAllLearnTranslations = async () => {
  // First try to load translations using the standard approach
  loadAllComponentTranslations('learn');
  
  // Get all supported languages
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  const realLanguages = supportedLanguages.filter(lang => 
    lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
  
  // Explicitly add all translations for all languages
  realLanguages.forEach(lang => {
    if (learnTranslations[lang]) {
      try {
        i18n.addResourceBundle(
          lang, 
          'common', 
          { learn: learnTranslations[lang].learn }, 
          true, // override existing
          true  // deep merge
        );
      } catch (error) {
        console.error(`Error adding learn translations for ${lang}:`, error);
      }
    } else if (lang !== 'en') {
      // For languages without translations, add English as fallback
      try {
        i18n.addResourceBundle(
          lang, 
          'common', 
          { learn: learnTranslations.en.learn }, 
          true, 
          false // don't deep merge for fallbacks
        );
      } catch (error) {
        console.error(`Error adding English fallback for ${lang}:`, error);
      }
    }
  });
  
  // Create a promise that resolves when translations are ready
  return new Promise((resolve) => {
    // Dispatch event to signal translations are loaded
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    resolve(true);
  });
};
