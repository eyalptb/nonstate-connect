
import { learnTranslations as importedLearnTranslations } from './learn/index';

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

export const learnTranslations = importedLearnTranslations;
