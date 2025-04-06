
import i18n from '@/i18n';
import { walletTranslations } from './translations/walletTranslations';
import { featureTranslations } from './translations/featureTranslations';
import { joinCtaTranslations } from './translations/joinCtaTranslations';

/**
 * Dynamically adds translations to the i18n instance
 * This works even for "read-only" translation files as it adds translations to the runtime
 */
export const addTranslations = (
  language: string, 
  namespace: string, 
  resources: Record<string, string>
) => {
  try {
    // Add the resources to the i18n instance
    i18n.addResourceBundle(language, namespace, resources, true, true);
    console.log(`Added translations for ${language}/${namespace}:`, resources);
    return true;
  } catch (error) {
    console.error(`Failed to add translations for ${language}/${namespace}:`, error);
    return false;
  }
};

/**
 * Adds wallet translations for a specific language
 */
export const addWalletTranslations = (language: string) => {
  // Get translations for the requested language, fallback to English
  const translations = walletTranslations[language] || walletTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Adds feature translations for a specific language
 */
export const addFeatureTranslations = (language: string) => {
  // Get translations for the requested language, fallback to English
  const translations = featureTranslations[language] || featureTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Adds JoinCta translations for a specific language
 */
export const addJoinCtaTranslations = (language: string) => {
  // Get translations for the requested language, fallback to English
  const translations = joinCtaTranslations[language] || joinCtaTranslations.en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Load wallet translations for all supported languages
 */
export const loadAllWalletTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log('Loading wallet translations for languages:', supportedLanguages);
  
  // Add translations for each language
  supportedLanguages.forEach(lang => {
    addWalletTranslations(lang);
  });
};

/**
 * Load feature translations for all supported languages
 */
export const loadAllFeatureTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log('Loading feature translations for languages:', supportedLanguages);
  
  // Add translations for each language
  supportedLanguages.forEach(lang => {
    addFeatureTranslations(lang);
  });
};

/**
 * Load JoinCta translations for all supported languages
 */
export const loadAllJoinCtaTranslations = () => {
  const supportedLanguages = getSupportedLanguages();
  console.log('Loading JoinCta translations for languages:', supportedLanguages);
  
  // Add translations for each language
  supportedLanguages.forEach(lang => {
    addJoinCtaTranslations(lang);
  });
};

/**
 * Helper to get supported languages excluding special codes
 */
const getSupportedLanguages = () => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  
  // Filter out 'cimode' and other special language codes
  return supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
};

export default {
  addTranslations,
  addWalletTranslations,
  addFeatureTranslations,
  addJoinCtaTranslations,
  loadAllWalletTranslations,
  loadAllFeatureTranslations,
  loadAllJoinCtaTranslations
};
