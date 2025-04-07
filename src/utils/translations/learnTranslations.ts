
import { learnTranslations as importedLearnTranslations } from './learn/index';
import i18n from '@/i18n';

// Function to add translations directly to i18n
export const addLearnTranslationsDirectly = (language: string) => {
  if (importedLearnTranslations[language]) {
    console.log(`[learnTranslations.ts] Directly adding learn translations for ${language}`);
    
    // Add the translations to the common namespace
    i18n.addResourceBundle(language, 'common', importedLearnTranslations[language], true, true);
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    const hasLearnSection = bundle && bundle.learn && Object.keys(bundle.learn).length > 0;
    
    console.log(`[learnTranslations.ts] After direct add, learn translations exist for ${language}: ${hasLearnSection ? "Yes" : "No"}`);
    
    if (hasLearnSection) {
      console.log(`[learnTranslations.ts] Found ${Object.keys(bundle.learn).length} keys in learn section`);
    }
    
    return hasLearnSection;
  }
  return false;
};

// Force add all supported languages
export const forceAddAllLearnTranslations = () => {
  const languages = Object.keys(importedLearnTranslations);
  console.log(`[learnTranslations.ts] Force adding learn translations for all languages: ${languages.join(', ')}`);
  
  for (const lang of languages) {
    addLearnTranslationsDirectly(lang);
  }
};

export const learnTranslations = importedLearnTranslations;
