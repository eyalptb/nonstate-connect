
import i18n from '@/i18n';
import { ComponentType, translationResources } from './translationResources';
import { addTranslations, getSupportedLanguages } from './translationHelpers';
import { learnTranslations } from './learnTranslations';

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
    console.error(`No translations found for ${componentType}/${language}`);
    return false;
  }
  
  console.log(`Adding translations for ${componentType}/${language}`, translations);
  
  // Special handling for learn component to ensure proper structure
  if (componentType === 'learn') {
    if (language === 'ru' && learnTranslations.ru) {
      console.log(`Adding learn translations for ${language}`, learnTranslations[language]);
      // For Russian, ensure we're explicitly adding the learn translations with the correct structure
      // Use i18n directly to avoid type issues with addTranslations
      i18n.addResourceBundle(
        language,
        namespace,
        { learn: learnTranslations[language].learn },
        true, // Override existing
        true  // Deep merge
      );
      return true;
    }
    
    // For all other languages, use standard approach but with the correct structure
    if (translations.learn) {
      // Use i18n directly to avoid type issues with addTranslations
      i18n.addResourceBundle(
        language,
        namespace,
        { learn: translations.learn },
        true, // Override existing
        true  // Deep merge
      );
      return true;
    } else {
      console.error(`Malformed learn translations for ${language}`);
      return false;
    }
  }
  
  // Add translations to the i18n instance (for non-learn components)
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
  
  // Special handling for learn component
  if (componentType === 'learn') {
    supportedLanguages.forEach(lang => {
      if (learnTranslations[lang]) {
        console.log(`Adding learn translations for ${lang}`, learnTranslations[lang]);
        i18n.addResourceBundle(
          lang, 
          namespace, 
          { learn: learnTranslations[lang].learn }, 
          true, // override existing
          true  // deep merge
        );
      } else if (lang !== 'en') {
        // Add English as fallback for missing languages
        i18n.addResourceBundle(
          lang, 
          namespace, 
          { learn: learnTranslations.en.learn }, 
          true, 
          false
        );
      }
    });
    
    // Dispatch event to notify that translations are loaded
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return;
  }
  
  // Standard handling for other components
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
