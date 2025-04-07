
import i18n from 'i18next';
import { walletTranslations } from '@/utils/translations/walletTranslations';
import { featureTranslations } from '@/utils/translations/featureTranslations';
import { joinCtaTranslations } from '@/utils/translations/joinCtaTranslations';
import { projectTranslations } from '@/utils/translations/projectTranslations';
import { footerTranslations } from '@/utils/translations/footerTranslations';
import { backendTranslations } from '@/utils/translations/backendTranslations';
import { learnTranslations } from '@/utils/translations/learnTranslations';
import { pricingTranslations } from '@/utils/translations/pricingTranslations';

/**
 * Adds in-memory translations for the specified language
 */
export const addInMemoryTranslations = (language: string) => {
  console.log(`[i18n] Adding in-memory translations for ${language}`);
  
  if (walletTranslations[language]) {
    i18n.addResourceBundle(language, 'common', walletTranslations[language], true, true);
  }
  
  if (featureTranslations[language]) {
    i18n.addResourceBundle(language, 'common', featureTranslations[language], true, true);
  }
  
  if (joinCtaTranslations[language]) {
    i18n.addResourceBundle(language, 'common', joinCtaTranslations[language], true, true);
  }
  
  if (projectTranslations[language]) {
    i18n.addResourceBundle(language, 'common', projectTranslations[language], true, true);
  }
  
  if (footerTranslations[language]) {
    i18n.addResourceBundle(language, 'common', footerTranslations[language], true, true);
  }
  
  if (backendTranslations[language]) {
    i18n.addResourceBundle(language, 'common', backendTranslations[language], true, true);
  }
  
  // Add Pricing translations with extra debugging
  if (pricingTranslations[language]) {
    console.log(`[i18n] Adding pricing translations for ${language}. Keys available:`, 
      Object.keys(pricingTranslations[language]));
    console.log(`[i18n] Pricing structure:`, pricingTranslations[language].pricing);
    
    // Add the entire object
    i18n.addResourceBundle(language, 'common', pricingTranslations[language], true, true);
    
    // Also try adding just the pricing part specifically to ensure it's there
    const pricingOnly = { pricing: pricingTranslations[language].pricing };
    i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[i18n] After adding, pricing translations exist for ${language}:`, 
      bundle && bundle.pricing ? "Yes" : "No");
    
    if (bundle && bundle.pricing) {
      console.log(`[i18n] Loaded pricing keys:`, Object.keys(bundle.pricing));
    }
  } else {
    console.warn(`[i18n] No pricing translations found for ${language}`);
  }
  
  // Add Learn translations directly during initialization
  if (learnTranslations[language]) {
    console.log(`[i18n] Adding learn translations for ${language} during initialization`);
    
    // First add the entire object
    i18n.addResourceBundle(language, 'common', learnTranslations[language], true, true);
    
    // Then add just the learn part specifically to ensure it's there
    if (learnTranslations[language].learn) {
      const learnOnly = { learn: learnTranslations[language].learn };
      i18n.addResourceBundle(language, 'common', learnOnly, true, true);
    }
    
    // Verify the translations were added correctly
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[i18n] After adding, learn translations exist for ${language}:`, 
      bundle && bundle.learn ? "Yes" : "No");
  }
};

/**
 * Adds learn translations with fallback to English if needed
 */
export const addLearnTranslations = (language: string) => {
  if (learnTranslations[language]) {
    console.log(`[i18n] Adding learn translations for ${language} manually`);
    
    // Create an object with just the learn key
    const learnOnly = { learn: learnTranslations[language].learn };
    i18n.addResourceBundle(language, 'common', learnOnly, true, true);
  } else if (learnTranslations['en']) {
    console.log(`[i18n] Adding English learn translations as fallback`);
    
    // Create an object with just the learn key
    const learnOnly = { learn: learnTranslations['en'].learn };
    i18n.addResourceBundle(language, 'common', learnOnly, true, true);
  }
};

/**
 * Adds pricing translations with fallback to English if needed
 */
export const addPricingTranslations = (language: string) => {
  console.log(`[i18n] Explicitly adding pricing translations for ${language}`);
  
  if (pricingTranslations[language]) {
    console.log(`[i18n] Found pricing translations for ${language}, adding them now`);
    
    // Create an object with just the pricing key
    const pricingOnly = { pricing: pricingTranslations[language].pricing };
    console.log(`[i18n] Adding pricing-only structure:`, pricingOnly);
    
    i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
    
    // Verify
    const bundle = i18n.getResourceBundle(language, 'common');
    console.log(`[i18n] After explicit add, pricing exists:`, 
      bundle && bundle.pricing ? "Yes" : "No");
    
    if (bundle && bundle.pricing) {
      console.log(`[i18n] Pricing keys after explicit add:`, Object.keys(bundle.pricing));
    }
  } else if (pricingTranslations['en']) {
    console.log(`[i18n] No pricing translations for ${language}, using English as fallback`);
    
    // Create an object with just the pricing key using English as fallback
    const pricingOnly = { pricing: pricingTranslations['en'].pricing };
    i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
  } else {
    console.error(`[i18n] Could not find pricing translations for ${language} or English fallback`);
  }
};

