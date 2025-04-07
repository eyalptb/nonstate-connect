
import { learnTranslations as importedLearnTranslations } from './learn/index';

// Directly export the imported translations
export const learnTranslations = importedLearnTranslations;

// Add debug log to check what translations are available
console.log('[learnTranslations] Translations loaded:', Object.keys(importedLearnTranslations));
for (const lang in importedLearnTranslations) {
  console.log(`[learnTranslations] ${lang} translation keys:`, 
    importedLearnTranslations[lang] ? Object.keys(importedLearnTranslations[lang]) : 'none');
}
