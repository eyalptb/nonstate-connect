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
    // Add each translation set safely with fallback to English if needed
    safeAddResourceBundle(language, 'common', walletTranslations[language] || walletTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', featureTranslations[language] || featureTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', joinCtaTranslations[language] || joinCtaTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', projectTranslations[language] || projectTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', footerTranslations[language] || footerTranslations[fallbackLang]);
    safeAddResourceBundle(language, 'common', backendTranslations[language] || backendTranslations[fallbackLang]);
    
    // For learn translations, access the nested learn property
    const learnData = learnTranslations[language]?.learn || learnTranslations[fallbackLang]?.learn;
    safeAddResourceBundle(language, 'common', { learn: learnData });
    
    // For pricing translations, access the nested pricing property
    const pricingData = pricingTranslations[language]?.pricing || pricingTranslations[fallbackLang]?.pricing;
    safeAddResourceBundle(language, 'common', { pricing: pricingData });
    
    // For contactSales translations, access the nested contactSales property
    const contactSalesData = contactSalesTranslations[language]?.contactSales || contactSalesTranslations[fallbackLang]?.contactSales;
    safeAddResourceBundle(language, 'common', { contactSales: contactSalesData });
  } catch (error) {
    // Fail silently for stability
  }
};
