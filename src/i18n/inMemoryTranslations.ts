
import i18n from 'i18next';
import { walletTranslations } from '@/utils/translations/walletTranslations';
import { featureTranslations } from '@/utils/translations/featureTranslations';
import { joinCtaTranslations } from '@/utils/translations/joinCtaTranslations';
import { projectTranslations } from '@/utils/translations/projectTranslations';
import { footerTranslations } from '@/utils/translations/footerTranslations';
import { backendTranslations } from '@/utils/translations/backendTranslations';
import { learnTranslations } from '@/utils/translations/learnTranslations';
import { pricingTranslations } from '@/utils/translations/pricingTranslations';
import { contactSalesTranslations } from '@/utils/translations/contactSalesTranslations';

// Cache successful translations to avoid reprocessing
const successfullyLoadedTranslations = new Set<string>();

/**
 * Safely adds a resource bundle with error handling
 */
const safeAddResourceBundle = (language: string, namespace: string, resources: any, deep: boolean = true) => {
  try {
    if (!resources) {
      console.warn(`[inMemoryTranslations] No resources to add for ${language}:${namespace}`);
      return false;
    }
    
    // Skip adding if already added
    const resourceKey = `${language}:${namespace}`;
    if (successfullyLoadedTranslations.has(resourceKey)) {
      console.log(`[inMemoryTranslations] Resources already loaded for ${resourceKey}`);
      return true;
    }
    
    i18n.addResourceBundle(language, namespace, resources, deep, true);
    successfullyLoadedTranslations.add(resourceKey);
    console.log(`[inMemoryTranslations] Successfully added resources for ${resourceKey}`);
    
    return true;
  } catch (error) {
    console.error(`[inMemoryTranslations] Error adding resources for ${language}:${namespace}`, error);
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
    console.log(`[inMemoryTranslations] Adding translations for ${language}`);
    
    // Add each translation set safely with fallback to English if needed
    safeAddResourceBundle(language, 'common', walletTranslations[language] || walletTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', featureTranslations[language] || featureTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', joinCtaTranslations[language] || joinCtaTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', projectTranslations[language] || projectTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', footerTranslations[language] || footerTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', backendTranslations[language] || backendTranslations[fallbackLang]);
    
    // For learn translations, access the nested learn property
    const learnData = learnTranslations[language]?.learn || learnTranslations[fallbackLang]?.learn;
    if (learnData) {
      safeAddResourceBundle(language, 'common', { learn: learnData });
    }
    
    // For pricing translations, ensure we have them for all languages with fallback
    const pricingData = pricingTranslations[language]?.pricing || pricingTranslations[fallbackLang]?.pricing;
    if (pricingData) {
      console.log(`[inMemoryTranslations] Adding pricing translations for ${language}`);
      safeAddResourceBundle(language, 'common', { pricing: pricingData });
    } else {
      console.warn(`[inMemoryTranslations] No pricing translations found for ${language}, using fallback`);
    }
    
    // For contactSales translations
    const contactSalesData = contactSalesTranslations[language] || contactSalesTranslations[fallbackLang];
    if (contactSalesData) {
      console.log(`[inMemoryTranslations] Adding contactSales translations for ${language}`);
      safeAddResourceBundle(language, 'common', contactSalesData);
    }
    
    // Force reload resources to ensure translations are immediately available
    i18n.reloadResources([language], ['common']).then(() => {
      console.log(`[inMemoryTranslations] Translations reloaded for ${language}`);
      
      // Dispatch a custom event to notify components that translations have been loaded
      document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
        detail: { language }
      }));
    });
  } catch (error) {
    // Fail silently for stability
    console.error('[inMemoryTranslations] Error adding translations:', error);
  }
};
