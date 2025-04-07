
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
const MAX_PROCESSING_TIME_MS = 3000; // 3 seconds max processing time

/**
 * Safely adds a resource bundle with error handling
 */
const safeAddResourceBundle = (language: string, namespace: string, resources: any, deep: boolean = true) => {
  try {
    if (!resources) {
      console.warn(`[i18n] No resources to add for ${language}/${namespace}`);
      return;
    }
    i18n.addResourceBundle(language, namespace, resources, deep, true);
  } catch (error) {
    console.error(`[i18n] Error adding resource bundle for ${language}/${namespace}:`, error);
  }
};

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
    // English is our fallback language
    const fallbackLang = 'en';
    
    // Add each translation type, with fallbacks to English
    const translationSets = [
      { name: 'wallet', data: walletTranslations[language] || walletTranslations[fallbackLang] },
      { name: 'feature', data: featureTranslations[language] || featureTranslations[fallbackLang] },
      { name: 'joinCta', data: joinCtaTranslations[language] || joinCtaTranslations[fallbackLang] },
      { name: 'project', data: projectTranslations[language] || projectTranslations[fallbackLang] },
      { name: 'footer', data: footerTranslations[language] || footerTranslations[fallbackLang] },
      { name: 'backend', data: backendTranslations[language] || backendTranslations[fallbackLang] },
      { name: 'learn', data: learnTranslations[language] || learnTranslations[fallbackLang] },
      { name: 'pricing', data: pricingTranslations[language] || pricingTranslations[fallbackLang] }
    ];
    
    // Add each translation set safely
    translationSets.forEach(set => {
      if (set.data) {
        safeAddResourceBundle(language, 'common', set.data);
      }
    });
    
    // Allow this language to be processed again after a delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, MAX_PROCESSING_TIME_MS);
    
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
    // Simplified logic - just add the translations directly
    const translations = learnTranslations[language] || learnTranslations['en'];
    if (translations) {
      safeAddResourceBundle(language, 'common', translations);
    }
    
    // Allow processing again after delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, MAX_PROCESSING_TIME_MS);
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
    console.log(`[i18n] Adding pricing translations for ${language}`);
    
    // Simplified logic - just add the translations directly
    const translations = pricingTranslations[language] || pricingTranslations['en'];
    if (translations) {
      safeAddResourceBundle(language, 'common', translations);
    }
    
    // Allow processing again after delay
    setTimeout(() => {
      processedTranslations.delete(key);
    }, MAX_PROCESSING_TIME_MS);
  } catch (error) {
    console.error(`[i18n] Error adding pricing translations:`, error);
    processedTranslations.delete(key);
  }
};
