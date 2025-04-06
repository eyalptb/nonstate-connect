
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
  
  // For Learn component, we need to handle the nested structure differently
  if (componentType === 'learn') {
    // Add the entire nested object structure for learn
    try {
      i18n.addResourceBundle(language, namespace, { learn: translations.learn }, true, true);
      console.log(`[addComponentTranslations] Successfully added learn translations for ${language}`);
      return true;
    } catch (error) {
      console.error(`[addComponentTranslations] Failed to add learn translations for ${language}:`, error);
      return false;
    }
  }
  
  // Add translations to the i18n instance for other components
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
  console.log(`Loading ${componentType} translations for languages:`, supportedLanguages);
  
  // Check if translations exist for this component type
  if (!translationResources[componentType]) {
    console.error(`No translations found for component type: ${componentType}`);
    return;
  }
  
  // Add translations for each supported language
  supportedLanguages.forEach(lang => {
    const success = addComponentTranslations(lang, componentType, namespace);
    if (success) {
      console.log(`Successfully loaded ${componentType} translations for ${lang}`);
    } else {
      console.warn(`Failed to load ${componentType} translations for ${lang}`);
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
    console.error(`Failed to load translations for ${componentType}:`, error);
    return false;
  }
};
