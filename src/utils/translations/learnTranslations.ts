
import { learnTranslations as importedLearnTranslations } from './learn/index';
import i18n from '@/i18n';

// Function to add translations directly to i18n
export const addLearnTranslationsDirectly = (language: string) => {
  if (importedLearnTranslations[language]) {
    console.log(`Adding learn translations for ${language}`);
    
    try {
      // Add the translations to the common namespace
      i18n.addResourceBundle(language, 'common', importedLearnTranslations[language], true, true);
      return true;
    } catch (error) {
      console.error(`Error adding translations for ${language}:`, error);
      return false;
    }
  }
  return false;
};

// Force add all supported languages
export const forceAddAllLearnTranslations = () => {
  const languages = Object.keys(importedLearnTranslations);
  console.log(`Force adding learn translations for all languages: ${languages.join(', ')}`);
  
  for (const lang of languages) {
    try {
      i18n.addResourceBundle(lang, 'common', importedLearnTranslations[lang], true, true);
    } catch (error) {
      console.error(`Error adding translations for ${lang}:`, error);
    }
  }
};

// Function to get the translations for a specific language
export const getLearnTranslationForLanguage = (language: string) => {
  return importedLearnTranslations[language] || null;
};

export const learnTranslations = importedLearnTranslations;
