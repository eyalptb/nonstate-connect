
import { learnTranslations as importedLearnTranslations } from './learn/index';

// Convert the nested structure to a flattened structure compatible with i18next
// This ensures that the translations can be added as a resource bundle
export const learnTranslations: Record<string, Record<string, string>> = Object.keys(importedLearnTranslations).reduce((acc, lang) => {
  acc[lang] = importedLearnTranslations[lang];
  return acc;
}, {} as Record<string, Record<string, string>>);

// Export the imported translations directly for completeness
export { importedLearnTranslations };
