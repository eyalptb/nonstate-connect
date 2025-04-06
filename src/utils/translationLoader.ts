
import i18n from '@/i18n';
import { walletTranslations } from './translations/walletTranslations';
import { featureTranslations } from './translations/featureTranslations';
import { joinCtaTranslations } from './translations/joinCtaTranslations';
import { projectTranslations } from './translations/projectTranslations';
import { footerTranslations } from './translations/footerTranslations';
import { backendTranslations } from './translations/backendTranslations';

/**
 * Type for component translation resources
 */
type TranslationResources = Record<string, Record<string, Record<string, string>>>;

/**
 * Map of all translation resources by namespace
 */
const translationResources: TranslationResources = {
  wallet: walletTranslations,
  feature: featureTranslations,
  joinCta: joinCtaTranslations,
  project: projectTranslations,
  footer: footerTranslations,
  backend: backendTranslations
};

/**
 * Helper to get supported languages excluding special codes
 */
const getSupportedLanguages = (): string[] => {
  const supportedLanguages = i18n.options.supportedLngs || ['en', 'fr', 'de', 'es', 'ar', 'bn', 'hi', 'ja', 'pt', 'ru', 'zh', 'he'];
  
  // Filter out 'cimode' and other special language codes
  return supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && lang !== 'en-US'
  );
};

/**
 * Dynamically adds translations to the i18n instance
 * This works even for "read-only" translation files as it adds translations to the runtime
 */
export const addTranslations = (
  language: string, 
  namespace: string, 
  resources: Record<string, string>
): boolean => {
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
 * Generic function to add translations for a specific language and component type
 * 
 * @param language The language code to add translations for
 * @param componentType The component type key in translationResources
 * @param namespace Optional namespace, defaults to 'common'
 */
export const addComponentTranslations = (
  language: string, 
  componentType: keyof typeof translationResources,
  namespace: string = 'common'
): boolean => {
  // Get translations for the requested language, fallback to English
  const translations = translationResources[componentType][language] || translationResources[componentType].en;
  
  if (!translations) {
    console.error(`No translations found for ${componentType}/${language}`);
    return false;
  }
  
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
  componentType: keyof typeof translationResources,
  namespace: string = 'common'
): void => {
  const supportedLanguages = getSupportedLanguages();
  console.log(`Loading ${componentType} translations for languages:`, supportedLanguages);
  
  // Add translations for each language
  supportedLanguages.forEach(lang => {
    addComponentTranslations(lang, componentType, namespace);
  });
};

/**
 * Universal translation loader - a single function that can handle any component
 * 
 * @param componentType The component type key in translationResources
 * @param options Optional configuration
 */
export const loadTranslations = (
  componentType: keyof typeof translationResources,
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
  loadTranslations('wallet', { allLanguages: true });

export const loadAllFeatureTranslations = () => 
  loadTranslations('feature', { allLanguages: true });

export const loadAllJoinCtaTranslations = () => 
  loadTranslations('joinCta', { allLanguages: true });

export const loadAllProjectTranslations = () => 
  loadTranslations('project', { allLanguages: true });

export const loadAllFooterTranslations = () => 
  loadTranslations('footer', { allLanguages: true });

export const loadAllBackendTranslations = () => 
  loadTranslations('backend', { allLanguages: true });

// Export public API
export default {
  addTranslations,
  addComponentTranslations,
  loadAllComponentTranslations,
  loadTranslations,
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
