
import i18n from '@/i18n';
import { ComponentType, translationResources } from './translationResources';
import { addTranslations, getSupportedLanguages } from './translationHelpers';

/**
 * Generic function to add translations for a specific language and component type
 * 
 * @param language The language code to add translations for
 * @param componentType The component type key in translationResources
 * @param namespace Optional namespace, defaults to 'common'
 */
export const addComponentTranslations = (
  language: string, 
  componentType: ComponentType,
  namespace: string = 'common'
): boolean => {
  // Get translations for the requested language, fallback to English
  const translations = translationResources[componentType][language] || translationResources[componentType].en;
  
  if (!translations) {
    console.error(`[addComponentTranslations] No translations found for ${componentType}/${language}`);
    return false;
  }
  
  console.log(`[addComponentTranslations] Adding translations for ${componentType}/${language}`, translations);
  
  // Add translations to the i18n instance
  return addTranslations(language, namespace, translations);
};

/**
 * Generic function to load translations for all supported languages for a specific component
 * 
 * @param componentType The component type key in translationResources
 * @param namespace Optional namespace, defaults to 'common'
 */
export const loadAllComponentTranslations = (
  componentType: ComponentType,
  namespace: string = 'common'
): void => {
  const supportedLanguages = getSupportedLanguages();
  console.log(`[loadAllComponentTranslations] Loading ${componentType} translations for languages:`, supportedLanguages);
  
  // Check if translations exist for this component type
  if (!translationResources[componentType]) {
    console.error(`[loadAllComponentTranslations] No translations found for component type: ${componentType}`);
    return;
  }
  
  // Add translations for each supported language
  supportedLanguages.forEach(lang => {
    console.log(`[loadAllComponentTranslations] Loading ${componentType} translations for ${lang}`);
    
    const translationData = translationResources[componentType][lang];
    console.log(`[loadAllComponentTranslations] Raw translation data for ${lang}:`, translationData);
    
    const success = addComponentTranslations(lang, componentType, namespace);
    
    if (success) {
      console.log(`[loadAllComponentTranslations] Successfully loaded ${componentType} translations for ${lang}`);
      
      // Verify translations were added correctly
      const resources = i18n.getResourceBundle(lang, namespace);
      console.log(`[loadAllComponentTranslations] Resulting resources for ${lang}/${namespace}:`, 
        resources && componentType === 'contactSales' ? resources.contactSales : 'Not showing full resources');
    } else {
      console.warn(`[loadAllComponentTranslations] Failed to load ${componentType} translations for ${lang}`);
    }
  });
  
  // Dispatch event to notify that translations are loaded
  document.dispatchEvent(new Event('i18n-resources-loaded'));
};

/**
 * Universal translation loader - a single function that can handle any component
 * 
 * @param componentType The component type key in translationResources
 * @param options Optional configuration
 */
export const loadTranslations = (
  componentType: ComponentType,
  options: {
    language?: string;
    namespace?: string;
    allLanguages?: boolean;
  } = {}
): boolean => {
  const { language, namespace = 'common', allLanguages = true } = options;
  
  console.log(`[loadTranslations] Loading ${componentType} translations with options:`, { language, namespace, allLanguages });
  
  try {
    if (allLanguages) {
      loadAllComponentTranslations(componentType, namespace);
      return true;
    } else if (language) {
      return addComponentTranslations(language, componentType, namespace);
    } else {
      // Default to current language if not specified
      return addComponentTranslations(i18n.language, componentType, namespace);
    }
  } catch (error) {
    console.error(`[loadTranslations] Failed to load translations for ${componentType}:`, error);
    return false;
  }
};
