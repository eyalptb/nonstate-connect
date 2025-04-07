
import i18n from 'i18next';
import { walletTranslations } from '@/utils/translations/walletTranslations';
import { featureTranslations } from '@/utils/translations/featureTranslations';
import { joinCtaTranslations } from '@/utils/translations/joinCtaTranslations';
import { projectTranslations } from '@/utils/translations/projectTranslations';
import { footerTranslations } from '@/utils/translations/footerTranslations';
import { backendTranslations } from '@/utils/translations/backendTranslations';
import { learnTranslations } from '@/utils/translations/learnTranslations';
import { pricingTranslations } from '@/utils/translations/pricingTranslations';

// Track which translations have already been processed to prevent infinite loops
const processedTranslations = new Set<string>();

/**
 * Adds in-memory translations for the specified language
 */
export const addInMemoryTranslations = (language: string) => {
  const key = `inmemory_${language}`;
  
  // Check if we've already processed this language recently to prevent loops
  if (processedTranslations.has(key)) {
    console.log(`[i18n] Already added in-memory translations for ${language}, skipping to prevent loops`);
    return;
  }
  
  // Mark this language as processed
  processedTranslations.add(key);
  
  console.log(`[i18n] Adding in-memory translations for ${language}`);
  
  try {
    // Add each translation type, with fallbacks to English
    
    if (walletTranslations[language] || walletTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        walletTranslations[language] || walletTranslations.en, 
        true, 
        true
      );
    }
    
    if (featureTranslations[language] || featureTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        featureTranslations[language] || featureTranslations.en, 
        true, 
        true
      );
    }
    
    if (joinCtaTranslations[language] || joinCtaTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        joinCtaTranslations[language] || joinCtaTranslations.en, 
        true, 
        true
      );
    }
    
    if (projectTranslations[language] || projectTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        projectTranslations[language] || projectTranslations.en, 
        true, 
        true
      );
    }
    
    if (footerTranslations[language] || footerTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        footerTranslations[language] || footerTranslations.en, 
        true, 
        true
      );
    }
    
    if (backendTranslations[language] || backendTranslations.en) {
      i18n.addResourceBundle(
        language, 
        'common', 
        backendTranslations[language] || backendTranslations.en, 
        true, 
        true
      );
    }
    
    // Add Pricing translations with fallback
    const pricingTranslationsData = pricingTranslations[language] || pricingTranslations.en;
    if (pricingTranslationsData) {
      console.log(`[i18n] Adding pricing translations for ${language}`);
      i18n.addResourceBundle(language, 'common', pricingTranslationsData, true, true);
      
      // Also add pricing separately to ensure it's there
      if (pricingTranslationsData.pricing) {
        const pricingOnly = { pricing: pricingTranslationsData.pricing };
        i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
      }
    }
    
    // Add Learn translations with fallback
    const learnTranslationsData = learnTranslations[language] || learnTranslations.en;
    if (learnTranslationsData) {
      console.log(`[i18n] Adding learn translations for ${language}`);
      i18n.addResourceBundle(language, 'common', learnTranslationsData, true, true);
      
      // Also add learn separately
      if (learnTranslationsData.learn) {
        const learnOnly = { learn: learnTranslationsData.learn };
        i18n.addResourceBundle(language, 'common', learnOnly, true, true);
      }
    }
    
    // Allow this language to be processed again after a delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, 5000);
    
  } catch (error) {
    console.error(`[i18n] Error adding in-memory translations:`, error);
    // Allow retrying on error
    processedTranslations.delete(key);
  }
};

/**
 * Adds learn translations with fallback to English if needed
 */
export const addLearnTranslations = (language: string) => {
  const key = `learn_${language}`;
  
  // Check if we've already processed this translation
  if (processedTranslations.has(key)) {
    console.log(`[i18n] Already added learn translations for ${language}, skipping to prevent loops`);
    return;
  }
  
  // Mark as processed
  processedTranslations.add(key);
  
  try {
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
    
    // Allow processing again after delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, 5000);
  } catch (error) {
    console.error(`[i18n] Error adding learn translations:`, error);
    processedTranslations.delete(key);
  }
};

/**
 * Adds pricing translations with fallback to English if needed
 */
export const addPricingTranslations = (language: string) => {
  const key = `pricing_${language}`;
  
  // Check if we've already processed this translation
  if (processedTranslations.has(key)) {
    console.log(`[i18n] Already added pricing translations for ${language}, skipping to prevent loops`);
    return;
  }
  
  // Mark as processed
  processedTranslations.add(key);
  
  try {
    console.log(`[i18n] Explicitly adding pricing translations for ${language}`);
    
    if (pricingTranslations[language] && pricingTranslations[language].pricing) {
      console.log(`[i18n] Found pricing translations for ${language}, adding them now`);
      
      // Create an object with just the pricing key
      const pricingOnly = { pricing: pricingTranslations[language].pricing };
      i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
      
      // Verify
      const bundle = i18n.getResourceBundle(language, 'common');
      console.log(`[i18n] After explicit add, pricing exists:`, 
        bundle && bundle.pricing ? "Yes" : "No");
    } else if (pricingTranslations['en'] && pricingTranslations['en'].pricing) {
      console.log(`[i18n] No pricing translations for ${language}, using English as fallback`);
      
      // Create an object with just the pricing key using English as fallback
      const pricingOnly = { pricing: pricingTranslations['en'].pricing };
      i18n.addResourceBundle(language, 'common', pricingOnly, true, true);
    } else {
      console.error(`[i18n] Could not find pricing translations for ${language} or English fallback`);
    }
    
    // Allow processing again after delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, 5000);
  } catch (error) {
    console.error(`[i18n] Error adding pricing translations:`, error);
    processedTranslations.delete(key);
  }
};
