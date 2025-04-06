
import i18n from '@/i18n';
import { walletTranslations } from './translations/walletTranslations';
import { featureTranslations } from './translations/featureTranslations';
import { joinCtaTranslations } from './translations/joinCtaTranslations';
import { projectTranslations } from './translations/projectTranslations';
import { footerTranslations } from './translations/footerTranslations';
import { backendTranslations } from './translations/backendTranslations';

/**
 * Map of all translation resources by namespace
 */
const translationResources = {
  wallet: walletTranslations,
  feature: featureTranslations,
  joinCta: joinCtaTranslations,
  project: projectTranslations,
  footer: footerTranslations,
  backend: backendTranslations
};

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
 * Helper to get supported languages excluding special codes
 */
const getSupportedLanguages = () => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  
  // Filter out 'cimode' and other special language codes
  return supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
};

/**
 * Generic function to add translations for a specific language and component type
 */
const addComponentTranslations = (language: string, componentType: keyof typeof translationResources) => {
  // Get translations for the requested language, fallback to English
  const translations = translationResources[componentType][language] || translationResources[componentType].en;
  
  // Add translations to the i18n instance
  return addTranslations(language, 'common', translations);
};

/**
 * Generic function to load translations for all supported languages for a specific component
 */
const loadAllComponentTranslations = (componentType: keyof typeof translationResources) => {
  const supportedLanguages = getSupportedLanguages();
  console.log(`Loading ${componentType} translations for languages:`, supportedLanguages);
  
  // Add translations for each language
  supportedLanguages.forEach(lang => {
    addComponentTranslations(lang, componentType);
  });
};

// Component-specific wrapper functions for backward compatibility
export const addWalletTranslations = (language: string) => 
  addComponentTranslations(language, 'wallet');

export const addFeatureTranslations = (language: string) => 
  addComponentTranslations(language, 'feature');

export const addJoinCtaTranslations = (language: string) => 
  addComponentTranslations(language, 'joinCta');

export const addProjectTranslations = (language: string) => 
  addComponentTranslations(language, 'project');

export const addFooterTranslations = (language: string) => 
  addComponentTranslations(language, 'footer');

export const addBackendTranslations = (language: string) => 
  addComponentTranslations(language, 'backend');

// Load all translations functions for backward compatibility
export const loadAllWalletTranslations = () => 
  loadAllComponentTranslations('wallet');

export const loadAllFeatureTranslations = () => 
  loadAllComponentTranslations('feature');

export const loadAllJoinCtaTranslations = () => 
  loadAllComponentTranslations('joinCta');

export const loadAllProjectTranslations = () => 
  loadAllComponentTranslations('project');

export const loadAllFooterTranslations = () => 
  loadAllComponentTranslations('footer');

export const loadAllBackendTranslations = () => 
  loadAllComponentTranslations('backend');

// Export public API
export default {
  addTranslations,
  addWalletTranslations,
  addFeatureTranslations,
  addJoinCtaTranslations,
  addProjectTranslations,
  addFooterTranslations,
  addBackendTranslations,
  loadAllWalletTranslations,
  loadAllFeatureTranslations,
  loadAllJoinCtaTranslations,
  loadAllProjectTranslations,
  loadAllFooterTranslations,
  loadAllBackendTranslations
};
