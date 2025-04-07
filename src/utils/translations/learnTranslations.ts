
import { learnTranslations as importedLearnTranslations } from './learn/index';
import i18n from '@/i18n';

// Function to add translations directly to i18n - improved version
export const addLearnTranslationsDirectly = (language: string) => {
  if (importedLearnTranslations[language]) {
    console.log(`[learnTranslations.ts] Directly adding learn translations for ${language}`);
    
    try {
      // Add the translations to the common namespace
      i18n.addResourceBundle(language, 'common', importedLearnTranslations[language], true, true);
      
      // Force a reload of resources to ensure they're available
      i18n.reloadResources([language], ['common']).then(() => {
        console.log(`[learnTranslations.ts] Successfully reloaded resources for ${language}`);
      });
      
      // Verify the translations were added correctly
      const bundle = i18n.getResourceBundle(language, 'common');
      const hasLearnSection = bundle && bundle.learn && Object.keys(bundle.learn).length > 0;
      
      if (hasLearnSection) {
        console.log(`[learnTranslations.ts] Successfully verified learn translations for ${language} with ${Object.keys(bundle.learn).length} keys`);
      } else {
        console.error(`[learnTranslations.ts] FAILED to verify learn translations for ${language} after adding`);
        
        // Special emergency fix - add translations directly to the resources
        if (i18n.options.resources && i18n.options.resources[language]) {
          const currentResources = i18n.options.resources[language].common || {};
          const learnTranslationsObj = importedLearnTranslations[language] || {};
          
          i18n.options.resources[language].common = Object.assign(
            {}, 
            currentResources, 
            learnTranslationsObj
          );
          
          console.log(`[learnTranslations.ts] Emergency fix applied for ${language}`);
        }
      }
      
      return true;
    } catch (error) {
      console.error(`[learnTranslations.ts] Error adding translations for ${language}:`, error);
      return false;
    }
  }
  return false;
};

// Force add all supported languages - more robust version
export const forceAddAllLearnTranslations = () => {
  const languages = Object.keys(importedLearnTranslations);
  console.log(`[learnTranslations.ts] Force adding learn translations for all languages: ${languages.join(', ')}`);
  
  let allSuccess = true;
  for (const lang of languages) {
    try {
      // Add translations in both formats to be extra safe
      i18n.addResourceBundle(lang, 'common', importedLearnTranslations[lang], true, true);
      
      // Apply emergency direct approach for persistent issues
      if (i18n.options.resources && i18n.options.resources[lang]) {
        const currentResources = i18n.options.resources[lang].common || {};
        const learnTranslationsObj = importedLearnTranslations[lang] || {};
        
        i18n.options.resources[lang].common = Object.assign(
          {},
          currentResources,
          learnTranslationsObj
        );
      }
      
      // Verify translations were added
      const bundle = i18n.getResourceBundle(lang, 'common');
      const hasLearn = bundle && bundle.learn && Object.keys(bundle.learn).length > 0;
      
      if (!hasLearn) {
        console.error(`[learnTranslations.ts] Failed to verify translations for ${lang} after adding`);
        allSuccess = false;
      }
    } catch (error) {
      console.error(`[learnTranslations.ts] Error adding translations for ${lang}:`, error);
      allSuccess = false;
    }
  }
  
  // Always reload resources after adding all translations
  i18n.reloadResources(languages, ['common']).then(() => {
    console.log('[learnTranslations.ts] Resources reloaded for all languages');
  });
  
  return allSuccess;
};

// Function to initialize translations - call this early in the app lifecycle
export const initializeLearnTranslations = () => {
  console.log('[learnTranslations.ts] Initializing learn translations for all languages');
  
  // Force add translations for all languages at initialization time
  const result = forceAddAllLearnTranslations();
  
  // Make sure current language is loaded
  const currentLang = i18n.language;
  addLearnTranslationsDirectly(currentLang);
  
  // Add an event listener for language changes to ensure translations are always available
  i18n.on('languageChanged', (lng) => {
    console.log(`[learnTranslations.ts] Language changed to ${lng}, ensuring learn translations`);
    setTimeout(() => addLearnTranslationsDirectly(lng), 0);
  });
  
  return result;
};

// Add a new function to get the translations for debugging
export const getLearnTranslationForLanguage = (language: string) => {
  return importedLearnTranslations[language] || null;
};

// Force initialize translations upon module load
initializeLearnTranslations();

export const learnTranslations = importedLearnTranslations;
