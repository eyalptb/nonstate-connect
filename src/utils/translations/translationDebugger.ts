
import i18n from '@/i18n';
import { learnTranslations } from './learnTranslations';

/**
 * Force load learn translations 
 * This function directly applies translations to fix loading issues
 */
export const forceLoadLearnTranslations = (language?: string) => {
  const lang = language || i18n.language;
  
  if (!learnTranslations[lang]) {
    return false;
  }
  
  try {
    // Direct approach - add translations as flat keys
    // This ensures they're properly accessible via t('learn.title') etc.
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
