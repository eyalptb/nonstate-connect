
import i18n from '@/i18n';
import { loadTranslations } from './translationCore';
import { addTranslations } from './translationHelpers';
import { walletTranslations } from './walletTranslations';
import { featureTranslations } from './featureTranslations';
import { joinCtaTranslations } from './joinCtaTranslations';
import { projectTranslations } from './projectTranslations';
import { footerTranslations } from './footerTranslations';
import { backendTranslations } from './backendTranslations';
import { featurePageTranslations } from './featurePageTranslations';
import { useCasesTranslations } from './useCasesTranslations';
import { learnTranslations } from './learnTranslations';
import { pricingTranslations } from './pricingTranslations';

// Track which translations have already been attempted to avoid infinite loops
const attemptedTranslations = new Set<string>();
const MAX_ATTEMPT_TIMEOUT = 5000; // 5 second timeout

// Helper function to safely add translations with error handling
const safelyAddTranslations = (language: string, namespace: string, translations: any): boolean => {
  if (!translations) {
    console.warn(`No translations found for ${language}/${namespace}`);
    return false;
  }
  
  try {
    return addTranslations(language, namespace, translations);
  } catch (error) {
    console.error(`Error adding translations for ${language}/${namespace}:`, error);
    return false;
  }
};

// Helper to get translations with fallback
const getTranslationsWithFallback = (
  translationSet: Record<string, any>, 
  language: string,
  fallbackLanguage: string = 'en'
) => {
  return translationSet[language] || translationSet[fallbackLanguage];
};

// Wallet translations
export const addWalletTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(walletTranslations, language));

export const loadAllWalletTranslations = () => loadTranslations('wallet', { allLanguages: true });

// Feature translations
export const addFeatureTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(featureTranslations, language));

export const loadAllFeatureTranslations = () => loadTranslations('feature', { allLanguages: true });

// Join CTA translations
export const addJoinCtaTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(joinCtaTranslations, language));

export const loadAllJoinCtaTranslations = () => loadTranslations('joinCta', { allLanguages: true });

// Project translations
export const addProjectTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(projectTranslations, language));

export const loadAllProjectTranslations = () => loadTranslations('project', { allLanguages: true });

// Footer translations
export const addFooterTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(footerTranslations, language));

export const loadAllFooterTranslations = () => loadTranslations('footer', { allLanguages: true });

// Backend translations
export const addBackendTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(backendTranslations, language));

export const loadAllBackendTranslations = () => loadTranslations('backend', { allLanguages: true });

// Feature page translations
export const addFeaturePageTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(featurePageTranslations, language));

export const loadAllFeaturePageTranslations = () => loadTranslations('featurePage', { allLanguages: true });

// Use cases translations
export const addUseCasesTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(useCasesTranslations, language));

export const loadAllUseCasesTranslations = () => loadTranslations('useCases', { allLanguages: true });

// Learn translations
export const addLearnTranslations = (language = i18n.language) => 
  safelyAddTranslations(language, 'common', getTranslationsWithFallback(learnTranslations, language));

export const loadAllLearnTranslations = () => loadTranslations('learn', { allLanguages: true });

// Pricing translations with loop prevention
export const addPricingTranslations = (language = i18n.language) => {
  // Create a unique key for this translation attempt
  const attemptKey = `pricing_${language}`;
  
  // Check if we've already attempted this translation recently
  if (attemptedTranslations.has(attemptKey)) {
    console.log(`[addPricingTranslations] Already attempted for ${language}, skipping to prevent loops`);
    return false;
  }
  
  // Mark this translation as attempted
  attemptedTranslations.add(attemptKey);
  console.log(`[addPricingTranslations] Called for language: ${language}`);
  
  // Get translations, fallback to English if needed
  const translations = getTranslationsWithFallback(pricingTranslations, language);
  
  if (!translations) {
    console.error(`[addPricingTranslations] No pricing translations found for ${language} or en fallback`);
    // Remove from attempted after a short delay to allow future attempts
    setTimeout(() => attemptedTranslations.delete(attemptKey), MAX_ATTEMPT_TIMEOUT);
    return false;
  }
  
  // Add translations directly to i18n
  const success = safelyAddTranslations(language, 'common', translations);
  
  // Remove from attempted after a short delay to allow future attempts if needed
  setTimeout(() => attemptedTranslations.delete(attemptKey), MAX_ATTEMPT_TIMEOUT);
  
  return success;
};

export const loadAllPricingTranslations = () => {
  // Create a unique key for this operation
  const attemptKey = `loadAllPricing`;
  
  // Check if we've already attempted this recently
  if (attemptedTranslations.has(attemptKey)) {
    console.log(`[loadAllPricingTranslations] Already attempted recently, skipping to prevent loops`);
    return false;
  }
  
  // Mark this operation as attempted
  attemptedTranslations.add(attemptKey);
  
  // Try to load translations
  try {
    const result = loadTranslations('pricing', { allLanguages: true });
    
    // Remove from attempted after a delay
    setTimeout(() => attemptedTranslations.delete(attemptKey), MAX_ATTEMPT_TIMEOUT);
    
    return result;
  } catch (error) {
    console.error('[loadAllPricingTranslations] Error:', error);
    setTimeout(() => attemptedTranslations.delete(attemptKey), MAX_ATTEMPT_TIMEOUT);
    return false;
  }
};
