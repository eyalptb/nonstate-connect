
import i18n from '@/i18n';
import { learnTranslations } from './learnTranslations';

/**
 * Apply learn translations directly to ensure they're available
 * This function directly flattens and applies translations
 */
export const forceLoadLearnTranslations = (language?: string) => {
  const lang = language || i18n.language;
  
  if (!learnTranslations[lang]) {
    return false;
  }
  
  try {
    // Flatten nested objects with dot notation for proper i18next access
    const flatKeys: Record<string, string> = {};
    
    // Helper function to flatten nested objects with dot notation
    const flattenObject = (obj: any, prefix = '') => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], `${prefix}${key}.`);
        } else {
          flatKeys[`${prefix}${key}`] = obj[key];
        }
      }
    };
    
    // Flatten the learn object
    flattenObject(learnTranslations[lang].learn, 'learn.');
    
    // Add all flattened keys directly to i18n
    i18n.addResources(lang, 'common', flatKeys);
    
    return true;
  } catch (error) {
    return false;
  }
};
