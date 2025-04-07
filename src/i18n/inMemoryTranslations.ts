
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
const MAX_PROCESSING_TIME_MS = 60000; // 60 seconds max processing time before allowing retry

// Cache successful translations to avoid reprocessing
const successfullyLoadedTranslations = new Set<string>();

/**
 * Safely adds a resource bundle with error handling
 */
const safeAddResourceBundle = (language: string, namespace: string, resources: any, deep: boolean = true) => {
  try {
    if (!resources) {
      console.warn(`[i18n] No resources to add for ${language}/${namespace}`);
      return false;
    }
    
    // Skip adding if already added
    const resourceKey = `${language}:${namespace}:${Object.keys(resources).join(',')}`;
    if (successfullyLoadedTranslations.has(resourceKey)) {
      console.log(`[i18n] Resources for ${language}/${namespace} already added, skipping`);
      return true;
    }
    
    i18n.addResourceBundle(language, namespace, resources, deep, true);
    
    // Verify resources were added
    const addedBundle = i18n.getResourceBundle(language, namespace);
    const success = !!addedBundle;
    
    if (success) {
      // Mark as successfully loaded to avoid duplicate loading
      successfullyLoadedTranslations.add(resourceKey);
    }
    
    return success;
  } catch (error) {
    console.error(`[i18n] Error adding resource bundle for ${language}/${namespace}:`, error);
    return false;
  }
};

/**
 * Adds in-memory translations for the specified language with improved loop prevention
 */
export const addInMemoryTranslations = (language: string) => {
  const key = `inmemory_${language}`;
  
  // Check if we've already processed this language recently to prevent loops
  if (processedTranslations.has(key)) {
    console.log(`[i18n] Already processing in-memory translations for ${language}, skipping to prevent loops`);
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
    
    // Add each translation set safely - wrap in try/catch for each one
    for (const set of translationSets) {
      try {
        if (set.data) {
          safeAddResourceBundle(language, 'common', set.data);
        }
      } catch (innerError) {
        console.error(`[i18n] Error adding ${set.name} translations:`, innerError);
        // Continue with next set instead of failing completely
      }
    }
    
    // Hard timeout to allow retry after a while
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
 * Adds specified translations for a component with improved error handling
 */
const addComponentTranslations = (language: string, componentName: string, translations: any) => {
  const key = `${componentName}_${language}`;
  
  // Check if we're already processing this
  if (processedTranslations.has(key)) {
    console.log(`[i18n] Already processing ${componentName} translations for ${language}, skipping`);
    return false;
  }
  
  // Mark as being processed
  processedTranslations.add(key);
  
  try {
    const success = safeAddResourceBundle(language, 'common', translations);
    
    // Allow retry after timeout
    setTimeout(() => {
      processedTranslations.delete(key);
    }, MAX_PROCESSING_TIME_MS);
    
    return success;
  } catch (error) {
    console.error(`[i18n] Error adding ${componentName} translations:`, error);
    processedTranslations.delete(key);
    return false;
  }
};

/**
 * Adds learn translations with fallback to English if needed
 */
export const addLearnTranslations = (language: string) => {
  const translations = learnTranslations[language] || learnTranslations['en'];
  return addComponentTranslations(language, 'learn', translations);
};

/**
 * Adds pricing translations with fallback to English if needed
 */
export const addPricingTranslations = (language: string) => {
  const translations = pricingTranslations[language] || pricingTranslations['en'];
  return addComponentTranslations(language, 'pricing', translations);
};
