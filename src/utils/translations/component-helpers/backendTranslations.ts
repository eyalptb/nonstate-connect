
import i18n from '@/i18n';
import { addTranslations } from '../translationHelpers';
import { backendTranslations } from '../backendTranslations';
import { getTranslationsWithFallback } from './translationHelpers';

/**
 * Adds backend translations for the specified language
 */
export const addBackendTranslations = (language = i18n.language) => {
  console.log(`Adding backend translations for ${language}`);
  
  // Get the backend data with fallback
  const backendData = getTranslationsWithFallback(backendTranslations, language);
  
  // Add the translations
  const result = addTranslations(language, 'common', backendData);
  
  // Force reload resources if successful
  if (result) {
    i18n.reloadResources([language], ['common']);
  }
  
  return result;
};

/**
 * Loads all backend translations for all supported languages
 */
export const loadAllBackendTranslations = () => {
  console.log('Loading all Backend translations');
  
  // First add the translations for the current language
  addBackendTranslations(i18n.language);
  
  // Force reload resources
  i18n.reloadResources([i18n.language], ['common']);
  
  return true;
};
