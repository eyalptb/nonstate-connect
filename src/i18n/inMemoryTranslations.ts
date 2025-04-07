
import i18n from 'i18next';
import { walletTranslations } from '@/utils/translations/walletTranslations';
import { featureTranslations } from '@/utils/translations/featureTranslations';
import { joinCtaTranslations } from '@/utils/translations/joinCtaTranslations';
import { projectTranslations } from '@/utils/translations/projectTranslations';
import { footerTranslations } from '@/utils/translations/footerTranslations';
import { backendTranslations } from '@/utils/translations/backendTranslations';
import { learnTranslations } from '@/utils/translations/learnTranslations';
import { pricingTranslations } from '@/utils/translations/pricingTranslations';

// Cache successful translations to avoid reprocessing
const successfullyLoadedTranslations = new Set<string>();

/**
 * Safely adds a resource bundle with error handling
 */
const safeAddResourceBundle = (language: string, namespace: string, resources: any, deep: boolean = true) => {
  try {
    if (!resources) {
      return false;
    }
    
    // Skip adding if already added
    const resourceKey = `${language}:${namespace}`;
    if (successfullyLoadedTranslations.has(resourceKey)) {
      return true;
    }
    
    i18n.addResourceBundle(language, namespace, resources, deep, true);
    successfullyLoadedTranslations.add(resourceKey);
    
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Adds in-memory translations for the specified language
 */
export const addInMemoryTranslations = (language: string) => {
  // English is our fallback language
  const fallbackLang = 'en';
  
  try {
    // Add each translation set safely
    safeAddResourceBundle(language, 'common', walletTranslations[language] || walletTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', featureTranslations[language] || featureTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', joinCtaTranslations[language] || joinCtaTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', projectTranslations[language] || projectTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', footerTranslations[language] || footerTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', backendTranslations[language] || backendTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', learnTranslations[language] || learnTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', pricingTranslations[language] || pricingTranslations[fallbackLang]);
  } catch (error) {
    // Fail silently for stability
  }
};

/**
 * Adds learn translations with fallback to English if needed
 */
export const addLearnTranslations = (language: string) => {
  const translations = learnTranslations[language] || learnTranslations['en'];
  return safeAddResourceBundle(language, 'common', translations);
};

/**
 * Adds pricing translations with fallback to English if needed
 */
export const addPricingTranslations = (language: string) => {
  const translations = pricingTranslations[language] || pricingTranslations['en'];
  return safeAddResourceBundle(language, 'common', translations);
};
