
import { learnTranslations as importedLearnTranslations } from './learn/index';
import i18n from '@/i18n';

// Add debug logging to check the structure
console.log('[learnTranslations.ts] Imported learn translations structure:', importedLearnTranslations);
console.log('[learnTranslations.ts] Available languages:', Object.keys(importedLearnTranslations));

// Check if the structure has the expected format for each language
Object.keys(importedLearnTranslations).forEach(lang => {
  console.log(`[learnTranslations.ts] Structure for ${lang}:`, importedLearnTranslations[lang]);
  if (importedLearnTranslations[lang] && importedLearnTranslations[lang].learn) {
    console.log(`[learnTranslations.ts] ${lang} has correct nested 'learn' structure`);
  } else {
    console.warn(`[learnTranslations.ts] ${lang} is missing nested 'learn' structure!`);
  }
});

// Function to add translations directly to i18n
export const addLearnTranslationsDirectly = (language: string) => {
  if (importedLearnTranslations[language]) {
    console.log(`[learnTranslations.ts] Directly adding learn translations for ${language}`);
    i18n.addResourceBundle(language, 'common', importedLearnTranslations[language], true, true);
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[learnTranslations.ts] After direct add, learn translations exist for ${language}:`, 
      bundle && bundle.learn ? "Yes" : "No");
      
    return true;
  }
  return false;
};

export const learnTranslations = importedLearnTranslations;
